import { Button, MenuItem, TextField } from '@mui/material'
import React, { Component } from 'react'
import database from "../../database/FirebaseApi"
import { ref, child, get, set } from "firebase/database";
import uuid from 'react-uuid';
import { loadmsg, showMessagge } from '../../components/message';
export default class MakeAppointment extends Component {
  constructor(props){
    super(props)
    this.state = {
      reason:"",
      start:"",
      end:"",
      date:"",
      alldept:[],
      userid:null,
      orgid:null,
      dept:null
    }
  }
  componentDidMount(){
    this.getuserid()
    this.getOrgid()
    this.getDepts()
  }
  getuserid = ()=>{
    let u = localStorage.getItem("curruser")
    this.setState({userid:u})
  }
  getOrgid = ()=>{
    let u = localStorage.getItem("selectorg")
    this.setState({orgid:u})
  }
  getDepts = ()=>{
    get(child(ref(database),"/departments")).then(e=>{
      let temp = []
      for(let key in e.val()){
        temp.push(e.val()[key].name)
      }
      console.log(temp)
      this.setState({alldept:temp})
    })
  }
  submit = ()=>{
    let id  = uuid()
    let data = {
      userid:this.state.userid,
      orgid:this.state.orgid,
      reason:this.state.reason,
      dept:this.state.dept,
      start:this.state.start,
      end:this.state.end,
      date:this.state.date
    }
    console.log(data)
    set(ref(database,"/appointments/"+id),data).then(e=>{
      this.props.callback()
      loadmsg("Appointment fixed")
      showMessagge()
    })
  }
  handleInput = (evt)=>{
    this.setState({dept:evt.target.value})
  }
  render() {
    return (
      <div className='flex flex-col items-center'>
        <div>
          <span className='font-semibold text-lg'>Make Appointment</span>
        </div>
        <div className='flex flex-col items-center'>
        <TextField
        sx = {{marginTop:"2rem"}}
          select
          label="Select"
          value={this.state.dept}
          onChange={this.handleInput}
          helperText="Please select Organization"
        >
          {this.state.alldept.map((v,i)=>
          <MenuItem key={i} value={v}>
            {v}
          </MenuItem>
          )}
          </TextField>
          <TextField type="text" sx={{width:"30rem",margin:"2rem"}} onChange = {(evt)=>{this.setState({reason:evt.target.value})}}  label = "Reason of Appointment" />
          <div className='flex flex-row'>
            <div>
              <TextField type="date" sx = {{margin:"0.5rem"}} onChange={(evt)=>this.setState({date:evt.target.value})} />
            </div>
            <div>
              <TextField type="time" sx = {{margin:"0.5rem"}} onChange={(evt)=>this.setState({start:evt.target.value})} />
              <TextField type="time" sx = {{margin:"0.5rem"}} onChange={(evt)=>this.setState({end:evt.target.value})} />
            </div>
          </div>
          <div className='m-2'>
            <Button variant='outlined' sx = {{color:"#8AA79C",borderColor:"#8AA79C",":hover":{backgroundColor:"#8AA79C",color:"#ffffff",borderColor:"#8AA79C"}}} onClick={this.submit} >Make an Appointment</Button>
          </div>
        </div>
      </div>
    )
  }
}
