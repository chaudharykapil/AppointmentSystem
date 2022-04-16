import { Paper, Button } from '@mui/material'
import React, { Component } from 'react'
import Header from '../components/Header'
import TextField from '@mui/material/TextField';
import {AccountCircle,Email,Lock} from '@mui/icons-material';
import EmailConfirmBanner from '../components/EmailConfirmBanner';
import { SmallFooter } from '../components/Footer';
import { Link, Navigate } from 'react-router-dom';
import database from "../database/FirebaseApi"
import { ref, child, get, set } from "firebase/database";
import uuid from 'react-uuid';
import { loadmsg, showMessagge } from '../components/message';
export default class SignUpScreen extends Component {
  constructor(props){
    super(props)
    this.state = {
      orgnisationname:"",
      
      email:"",
      password:"",
      redirect:null
    }
  }
  componentDidMount(){
    
  }
  checkduplicacy = (data,email)=>{
    for(let key in data){
      if(data[key].email == email){
        return false
      }
    }
    return true
  }
  handleOrgname = (evt)=>{
    this.setState({orgnisationname:evt.target.value})
  }
  
  handleEmail = (evt)=>{
    this.setState({email:evt.target.value})
  }
  handlePassword = (evt)=>{
    this.setState({password:evt.target.value})
  }
  submitform=(evt)=>{
    let data = {
      orgnisation:this.state.orgnisationname,
      email:this.state.email,
      password:this.state.password
    }
    if(data.orgnisation == "" || data.email == "" || data.password == ""){
      loadmsg("Please complete form")
      showMessagge()
      return
    }
    get(child(ref(database),"/organisations")).then(e=>{
      if (this.checkduplicacy(e.val())){
        let id  = uuid()
        set(ref(database,"/organisations/"+id),data).then(e=>{
          localStorage.setItem("newuser",id)
          this.setState({redirect:"/addworking"})
          
        })
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
          <Paper elevation={3} className = "w-1/2">
            <div className='flex flex-row h-96'>
              <div className='h-full w-2/5 bg-gradient-to-r from-cyan-500 to-blue-500 flex flex-col items-start px-10 py-10'>
                <span className='font-bold text-4xl text-gray-100'>SignUP</span>
                <span className='text-sm '>For new Account</span>
                <div className='mt-20'>
                <Button variant="contained"><Link to={"/login"}> LogIN</Link></Button>
                <br/>
                <span className='text-xs text-white'>If Already have Account</span>
                </div>
              </div>
              <div className='flex flex-col justify-center items-center w-3/5 h-full'>
                
                <div className='flex flex-row'>
                  <AccountCircle sx={{ color: 'action.active', mr: 1, my: 2 }} />
                  <TextField onChange={this.handleOrgname} value={this.state.orgnisationname} label="Organisation Name" variant="standard" sx={{width:"18rem"}} />
                </div>
                
                <div className='flex flex-row'>
                  <Email sx={{ color: 'action.active', mr: 1, my: 2 }} />
                  <TextField onChange={this.handleEmail} label="Email" variant="standard" sx={{width:"18rem"}} />
                </div>
                <div className='flex flex-row'>
                  <Lock sx={{ color: 'action.active', mr: 1, my: 2 }} />
                  <TextField type="password" onChange={this.handlePassword} label="Password" variant="standard" sx={{width:"18rem"}} />
                </div>
                <div>
                  <Button variant='outlined' onClick={this.submitform} sx={{":hover":{backgroundColor:"#0073e6",color:"#ffffff"}}}>Signup</Button>
                </div>
              </div>
            </div>
          </Paper>
          <div className='w-2/3 m-5'>
            <EmailConfirmBanner email = {this.state.email} />
          </div>
        </div>
        <SmallFooter />
      </div>
    )
  }
}
