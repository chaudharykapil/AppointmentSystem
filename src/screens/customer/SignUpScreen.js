import { Paper, Button } from '@mui/material'
import React, { Component } from 'react'
import Header from '../../components/Header'
import TextField from '@mui/material/TextField';
import {AccountCircle,Email,Lock} from '@mui/icons-material';
import EmailConfirmBanner from '../../components/EmailConfirmBanner';
import { SmallFooter } from '../../components/Footer';
import { Link, Navigate } from 'react-router-dom';
import database from "../../database/FirebaseApi"
import { ref, child, get, set } from "firebase/database";
import uuid from 'react-uuid';
import { loadmsg, showMessagge } from '../../components/message';
export default class UserSignUpScreen extends Component {
  constructor(props){
    super(props)
    this.state = {
      firstname:"",
      lastname:"",
      email:"",
      password:"",
      redirect:null,
      sendmail:false
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
  handleFirstname = (evt)=>{
    this.setState({firstname:evt.target.value})
  }
  handleLastname = (evt)=>{
    this.setState({lastname:evt.target.value})
  }
  handleEmail = (evt)=>{
    this.setState({email:evt.target.value})
  }
  handlePassword = (evt)=>{
    this.setState({password:evt.target.value})
  }
  submitform=(evt)=>{
    let data = {
      firstname:this.state.firstname,
      lastname:this.state.lastname,
      email:this.state.email,
      password:this.state.password
    }
    if(data.firstname == "" || data.lastname == "" || data.email == "" || data.password == ""){
      loadmsg("Please complete form")
      showMessagge()
      return
    }
    get(child(ref(database),"/customers")).then(e=>{
      if (this.checkduplicacy(e.val())){
        let id  = uuid()
        set(ref(database,"/customers/"+id),data).then(e=>{
          loadmsg("Signup Successfull")
          showMessagge()
          
        })
      }
    })
  }
  render() {
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
                  <span className='text-xl font-bold '>SignUp Form</span>
                </div>
                <div className='flex flex-row'>
                  <AccountCircle sx={{ color: 'action.active', mr: 1, my: 2 }} />
                  <TextField label="First Name" onChange={this.handleFirstname} required variant="outlined" sx={{width:"18rem",margin:"0.5rem"}} />
                </div>
                <div className='flex flex-row'>
                  <AccountCircle sx={{ color: 'action.active', mr: 1, my: 2 }} />
                  <TextField label="Last Name" onChange={this.handleLastname} required variant="outlined" sx={{width:"18rem",margin:"0.5rem"}} />
                </div>
                <div className='flex flex-row'>
                  <Email sx={{ color: 'action.active', mr: 1, my: 2 }} />
                  <TextField label="Email" onChange={this.handleEmail} variant="outlined" required sx={{width:"18rem",margin:"0.5rem"}} />
                </div>
                <div className='flex flex-row'>
                  <Lock sx={{ color: 'action.active', mr: 1, my: 2 }} />
                  <TextField label="Password" type="password" onChange={this.handlePassword} required variant="outlined" sx={{width:"18rem",margin:"0.5rem"}} />
                </div>
                <div>
                  <Button variant='outlined' onClick={this.submitform} sx={{color:"#8AA79C",borderColor:"#8AA79C",":hover":{backgroundColor:"#8AA79C",color:"#ffffff",borderColor:"#8AA79C"}}}>Signup</Button>
                </div>
                <div className='m-2'>
                <Link to={"/user/login"}><span className = "text-sm underline">For Login click here</span></Link>
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
