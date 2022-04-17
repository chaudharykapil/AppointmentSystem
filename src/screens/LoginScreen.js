import { Paper, Button } from '@mui/material'
import React, { Component } from 'react'
import Header from '../components/Header'
import TextField from '@mui/material/TextField';
import {Email,Lock} from '@mui/icons-material';
import { SmallFooter } from '../components/Footer';
import { Link, Navigate } from 'react-router-dom';
import database from "../database/FirebaseApi"
import { ref, child, get, set } from "firebase/database";
export default class LoginScreen extends Component {
  constructor(props){
    super(props)
    this.state = {
      email:"",
      password:"",
      redirect:null
    }
  }
  componentDidMount(){
    let orgid = localStorage.getItem("currorg")
    if(orgid){
      this.setState({redirect:"/dashboard"})
    }
  }
  handleEmail = (evt)=>{
    this.setState({email:evt.target.value})
  }
  handlePassword = (evt)=>{
    this.setState({password:evt.target.value})
  }
  submitform=(evt)=>{
    let data = {
      email:this.state.email,
      password:this.state.password
    }
    get(child(ref(database),"/organisations")).then(e=>{
      let allorganisations = e.val()
      for(let key in allorganisations){
        if(allorganisations[key].email == data.email && allorganisations[key].password == data.password){
          localStorage.setItem("currorg",key)
          this.setState({redirect:"/dashboard"})
          return
        }
      }
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
        <div className='flex flex-1 justify-center items-center h-[40rem] flex-col'>
          <Paper elevation={0} className = "w-1/2">
            <div className='flex flex-row h-96 justify-center'>
              <div className='flex flex-col justify-center items-center w-3/5 h-full'>
              <div className='m-2'>
                  <span className='text-xl font-bold '>Login In Form</span>
                </div>
                <div className='flex flex-row'>
                  <Email sx={{ color: 'action.active', mr: 1, my: 2 }} />
                  <TextField onChange={this.handleEmail} label="Email" variant="outlined" sx={{width:"18rem",margin:"0.5rem"}} />
                </div>
                <div className='flex flex-row'>
                  <Lock sx={{ color: 'action.active', mr: 1, my: 2 }} />
                  <TextField onChange={this.handlePassword} type = "password" label="Password" variant="outlined" sx={{width:"18rem",margin:"0.5rem"}} />
                </div>
                <div>
                  <Button variant='outlined' onClick={this.submitform} sx={{color:"#8AA79C",borderColor:"#8AA79C",":hover":{backgroundColor:"#8AA79C",color:"#ffffff",borderColor:"#8AA79C"}}}>LogIn</Button>
                </div>
                <div className='m-2'>
                  <span className = "text-sm underline">For SignUp click <Link to={"/signup"}>here</Link></span>
                </div>
              </div>
            </div>
          </Paper>
        </div>
        <SmallFooter />
      </div>
    )
  }
}
