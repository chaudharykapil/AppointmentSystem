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
export default class UserSignUpScreen extends Component {
  constructor(props){
    super(props)
    this.state = {
      firstname:"",
      lastname:"",
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
    get(child(ref(database),"/customers")).then(e=>{
      if (this.checkduplicacy(e.val())){
        let id  = uuid()
        set(ref(database,"/customers/"+id),data).then(e=>{
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
          <Paper elevation={3} className = "w-1/2">
            <div className='flex flex-row h-96'>
              <div className='h-full w-2/5 bg-gradient-to-r from-violet-500 to-fuchsia-500 flex flex-col items-start px-10 py-10'>
                <span className='font-bold text-4xl text-gray-100'>SignUP</span>
                <span className='text-sm '>For new Account</span>
                <div className='mt-20'>
                <Button variant="contained"><Link to={"/user/login"}> LogIN</Link></Button>
                <br/>
                <span className='text-xs text-white'>If Already have Account</span>
                </div>
              </div>
              <div className='flex flex-col justify-center items-center w-3/5 h-full'>
                
                <div className='flex flex-row'>
                  <AccountCircle sx={{ color: 'action.active', mr: 1, my: 2 }} />
                  <TextField label="First Name" onChange={this.handleFirstname} variant="standard" sx={{width:"18rem"}} />
                </div>
                <div className='flex flex-row'>
                  <AccountCircle sx={{ color: 'action.active', mr: 1, my: 2 }} />
                  <TextField label="Last Name" onChange={this.handleLastname} variant="standard" sx={{width:"18rem"}} />
                </div>
                <div className='flex flex-row'>
                  <Email sx={{ color: 'action.active', mr: 1, my: 2 }} />
                  <TextField label="Email" onChange={this.handleEmail} variant="standard" sx={{width:"18rem"}} />
                </div>
                <div className='flex flex-row'>
                  <Lock sx={{ color: 'action.active', mr: 1, my: 2 }} />
                  <TextField label="Password" type="password" onChange={this.handlePassword} variant="standard" sx={{width:"18rem"}} />
                </div>
                <div>
                  
                  <Button variant='outlined' onClick={this.submitform} sx={{":hover":{backgroundColor:"#0073e6",color:"#ffffff"}}}>Signup</Button>
                  
                </div>
              </div>
            </div>
          </Paper>
          <div className='w-2/3 m-5'>
            <EmailConfirmBanner />
          </div>
        </div>
        <SmallFooter />
      </div>
    )
  }
}
