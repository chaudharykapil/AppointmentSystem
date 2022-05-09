import { Paper, Button } from '@mui/material'
import React, { Component } from 'react'
import Header from '../../components/Header'
import TextField from '@mui/material/TextField';
import {Email,Lock} from '@mui/icons-material';
import { SmallFooter } from '../../components/Footer';
import { Link, Navigate} from 'react-router-dom';
import database from "../../database/FirebaseApi"
import { ref, child, get, set } from "firebase/database";
import { loadmsg, showMessagge } from '../../components/message';
export default class UserLoginScreen extends Component {
  constructor(props){
    super(props)
    this.state = {
      email:"",
      password:"",
      redirect:null
    }
  }
  componentDidMount(){
    let userid = localStorage.getItem("curruser")
    if(userid){
      this.setState({redirect:"/viewlist"})
    }
    showMessagge()
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
    console.log(data)
    if(data.email == "" || data.password == ""){
      loadmsg("Please Fill form completely")
      showMessagge()
      return
    }
    get(child(ref(database),"/customers")).then(e=>{
      let allusers = e.val()
      console.log(allusers)
      for(let key in allusers){
        if(allusers[key].email == data.email){
          if(allusers[key].password == data.password){
            localStorage.setItem("curruser",key)
            this.setState({redirect:"/viewlist"})
            loadmsg("Login Successfull")
            return
          }
          else{
            loadmsg("Password is wronge")
            showMessagge()
            return
          }
        }
        
      }
      loadmsg("Please Signup First")
      showMessagge()
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
                  <span className='text-xl font-bold '>LogIn Form</span>
                </div>
              <div className='flex flex-col justify-center items-center w-3/5 h-full'>
                <div className='flex flex-row'>
                  <Email sx={{ color: 'action.active', mr: 1, my: 2 }} />
                  <TextField label="Email" onChange={this.handleEmail} required variant="outlined" sx={{width:"18rem",margin:"0.5rem"}} />
                </div>
                <div className='flex flex-row'>
                  <Lock sx={{ color: 'action.active', mr: 1, my: 2 }} />
                  <TextField label="Password" required  onChange={this.handlePassword} type="password" variant="outlined" sx={{width:"18rem",margin:"0.5rem"}} />
                </div>
                <div>
                  <Button onClick={this.submitform} variant='outlined' sx={{color:"#8AA79C",borderColor:"#8AA79C",":hover":{backgroundColor:"#8AA79C",color:"#ffffff",borderColor:"#8AA79C"}}}>LogIn</Button>
                </div>
                <div className='m-2'>
                <Link to={"/user/signup"}><span className = "text-sm underline">For SignUp click here</span></Link>
                </div>
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
