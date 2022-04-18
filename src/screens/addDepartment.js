import { Button, TextField } from '@mui/material'
import React, { Component } from 'react'
import { SmallFooter } from '../components/Footer'
import Header from '../components/Header'
import { Navigate } from 'react-router-dom'
import database from "../database/FirebaseApi"
import { ref, child, get, set, update } from "firebase/database";
import uuid from 'react-uuid';
import { loadmsg, showMessagge } from '../components/message'
export default class AddDepartment extends Component {
  constructor(props){
    super(props)
    this.state = {
      deptname:"",
      userid:null,
      deptname:null,
      redirect:null,
      user:null
    }
  }
  componentDidMount(){
    let usrid = localStorage.getItem("newuser")
    if(!usrid){
      usrid = localStorage.getItem("currorg")  
    }
    this.setState({userid:usrid},this.getUser)
  }
  getUser = ()=>{
    let orgid = this.state.userid
    if(orgid){
      get(child(ref(database),"/organisations")).then(e=>{
        let allorganisations = e.val()
        console.log(allorganisations[orgid])
        this.setState({user:allorganisations[orgid]})
      })
    }
  }
  addDept = ()=>{
    let id  = uuid()
    let data = {
      name:this.state.deptname,
      orgnisation:this.state.userid
    }
    if(data.name == ""){
      loadmsg("Please fill department name")
      showMessagge()
      return
    }
    set(ref(database,"/departments/"+id),data).then(e=>{
      localStorage.removeItem("newuser")
      loadmsg("Depatment added")
      this.setState({redirect:'/dashboard'})
    })
  }
  render() {
    if (this.state.redirect) {
      return <Navigate to={this.state.redirect} />
    }
    return (
      <div>
        <div>
          <Header />
        </div>
        <div>
          <div className='flex flex-col h-24 justify-center p-5'>
            <span className='text-black font-semibold text-3xl'>{this.state.user?this.state.user.orgnisation:""}</span>
            <span className='text-black text-xl'>Add Department</span>
          </div>
          <div className='flex justify-center py-2 min-h-[80vh]'>
            <div className='flex flex-col items-center w-full'>
              <TextField label = "Depatment Name" onChange = {(val)=>this.setState({deptname:val.target.value})} sx={{width:"70%",margin:"0.5rem"}} />
              <Button variant='contained' onClick={this.addDept}>Add</Button>
            </div>
          </div>
        </div>
        <SmallFooter />
      </div>
    )
  }
}
