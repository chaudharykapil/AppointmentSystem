import { Button, MenuItem, TextField } from '@mui/material'
import React, { Component } from 'react'
import { SmallFooter } from '../../components/Footer'
import Header from '../../components/Header'
import database from "../../database/FirebaseApi"
import { ref, child, get, set } from "firebase/database";
import { Link } from 'react-router-dom'
import MakeAppointment from './MakeAppointment'
export default class ViewList extends Component {
  constructor(props){
    super(props)
    this.state = {
      allorgs:[],
      orgid:null,
      showappointment:false
    }
  }
  componentDidMount(){
    this.getAllOrganisation()
  }
  getAllOrganisation = ()=>{
    let temp = []
    get(child(ref(database),"/organisations")).then(e=>{
      for(let key in e.val()){
        temp.push({name:e.val()[key].orgnisation,id:key})
      }
      this.setState({allorgs:temp})
    })
  }
  handleInput = (evt)=>{
    console.log(evt)
    localStorage.setItem("selectorg",evt.target.value)
    this.setState({orgid:evt.target.value})
  }
  callback = ()=>{
    this.setState({showappointment:false})
  }
  render() {
    return (
      <div>
          <div>
            <Header />
          </div>
          <div className='flex flex-col h-[40rem]'>
            <div className='flex h-24  items-center p-5'>
              <span className='text-black font-semibold text-3xl'>Select Organization</span>
            </div>
            <div className='flex flex-col items-center my-5'>
              <div className='flex w-full justify-center'>
                <TextField
                  sx={{width:"40%"}}
                  select
                  label="Select"
                  value={this.state.orgid}
                  onChange={this.handleInput}
                  helperText="Please select Organization"
                >
                  {this.state.allorgs.map((v,i)=>
                  <MenuItem key={i} value={v.id}>
                    {v.name}
                  </MenuItem>
                  )}
                </TextField>
              </div>
              <div className='my-2'>
                <Link to={"/faqs"}><Button  variant='outlined' sx = {{color:"#8AA79C",borderColor:"#8AA79C",":hover":{backgroundColor:"#8AA79C",color:"#ffffff",borderColor:"#8AA79C"},margin:"0.5rem"}}>Show FAQs</Button></Link>
                <Button  variant='outlined' onClick={()=>this.setState({showappointment:true})} sx = {{color:"#8AA79C",borderColor:"#8AA79C",":hover":{backgroundColor:"#8AA79C",color:"#ffffff",borderColor:"#8AA79C"},margin:"0.5rem"}}>Make an Appointment</Button>
              </div>
            </div>
            <div className='flex w-full justify-center'>
              {this.state.showappointment?
              <MakeAppointment callback = {this.callback} />:null
              }
            </div>
          </div>
          <SmallFooter />
      </div>
    )
  }
}
