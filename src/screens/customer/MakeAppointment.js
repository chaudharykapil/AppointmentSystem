import { Button, TextField } from '@mui/material'
import React, { Component } from 'react'
import database from "../../database/FirebaseApi"
import { ref, child, get, set } from "firebase/database";
import uuid from 'react-uuid';
export default class MakeAppointment extends Component {
  constructor(props){
    super(props)
    this.state = {
      reason:"",
      start:"",
      end:"",
      userid:null,
      orgid:null
    }
  }
  componentDidMount(){
    this.getuserid()
    this.getOrgid()
  }
  getuserid = ()=>{
    let u = localStorage.getItem("curruser")
    this.setState({userid:u})
  }
  getOrgid = ()=>{
    let u = localStorage.getItem("selectorg")
    this.setState({orgid:u})
  }
  submit = ()=>{
    let id  = uuid()
    let data = {
      userid:this.state.userid,
      orgid:this.state.orgid,
      reason:this.state.reason,
      start:this.state.start,
      end:this.state.end
    }
    console.log(data)
    set(ref(database,"/appointments/"+id),data).then(e=>{
      this.props.callback()
    })
  }
  render() {
    return (
      <div className='flex flex-col items-center'>
        <div>
          <span className='font-semibold text-lg'>Make Appointment</span>
        </div>
        <div className='flex flex-col items-center'>
          <TextField type="text" sx={{width:"30rem",margin:"2rem"}} onChange = {(evt)=>{this.setState({reason:evt.target.value})}}  label = "Reason of Appointment" />
          <div>
            <TextField type="time" onChange={(evt)=>this.setState({start:evt.target.value})} />
            <TextField type="time" onChange={(evt)=>this.setState({end:evt.target.value})} />
          </div>
          <div className='m-2'>
            <Button variant='contained' onClick={this.submit} >Make an Appointment</Button>
          </div>
        </div>
      </div>
    )
  }
}
