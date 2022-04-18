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
      sendmail:false,
      redirect:null
    }
  }
  componentDidMount(){
    showMessagge()
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
          loadmsg("SignUp successfull")
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
          <Paper elevation={0} className = "w-1/2">
            <div className='flex flex-row h-96 justify-center'>
              <div className='flex flex-col justify-center items-center h-full'>
                <div className='m-2'>
                  <span className='text-xl font-bold '>SignUp Form</span>
                </div>
                <div className='flex flex-row'>
                  <AccountCircle sx={{ color: 'action.active', mr: 1, my: 2 }} />
                  <TextField onChange={this.handleOrgname} required value={this.state.orgnisationname} label="Organisation Name" variant="outlined" sx={{width:"18rem",margin:"0.5rem"}} />
                </div>
                
                <div className='flex flex-row'>
                  <Email sx={{ color: 'action.active', mr: 1, my: 2 }} />
                  <TextField onChange={this.handleEmail} required label="Email" variant="outlined" sx={{width:"18rem",margin:"0.5rem"}} />
                </div>
                <div className='flex flex-row'>
                  <Lock sx={{ color: 'action.active', mr: 1, my: 2 }} />
                  <TextField type="password" onChange={this.handlePassword} required label="Password" variant="outlined" sx={{width:"18rem",margin:"0.5rem"}} />
                </div>
                <div>
                  <Button variant='outlined' onClick={this.submitform} sx={{color:"#8AA79C",borderColor:"#8AA79C",":hover":{backgroundColor:"#8AA79C",color:"#ffffff",borderColor:"#8AA79C"}}}>Signup</Button>
                </div>
                <div className='m-2'>
                <Link to={"/login"}><span className = "text-sm underline">For Login click here</span></Link>
                </div>
              </div>
            </div>
          </Paper>
          {/* <div className='w-2/3 m-5'>
            {this.state.sendmail?
            <EmailConfirmBanner email = {this.state.email} />:null
            }
          </div> */}
        </div>
        <SmallFooter />
      </div>
    )
  }
}
