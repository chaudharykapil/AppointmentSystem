import { Paper, Button } from '@mui/material'
import React, { Component } from 'react'
import Header from '../../components/Header'
import TextField from '@mui/material/TextField';
import {Email,Lock} from '@mui/icons-material';
import { SmallFooter } from '../../components/Footer';
import { Link, Navigate} from 'react-router-dom';
import database from "../../database/FirebaseApi"
import { ref, child, get, set } from "firebase/database";
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
    get(child(ref(database),"/customers")).then(e=>{
      let allusers = e.val()
      console.log(allusers)
      for(let key in allusers){
        if(allusers[key].email == data.email && allusers[key].password == data.password){
          localStorage.setItem("curruser",key)
          this.setState({redirect:"/viewlist"})
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
          <Paper elevation={3} className = "w-1/2">
            <div className='flex flex-row h-96'>
              <div className='h-full w-2/5 bg-gradient-to-r from-violet-500 to-fuchsia-500 flex flex-col items-start px-10 py-10'>
                <span className='font-bold text-4xl text-gray-100'>LogIn</span>
                <span className='text-sm '>If Already have account</span>
                <div className='mt-20'>
                <Button variant="contained"><Link to = {"/signup"}>SignUp</Link></Button>
                <br/>
                <span className='text-xs text-white'>For new Account</span>
                </div>
              </div>
              <div className='flex flex-col justify-center items-center w-3/5 h-full'>
                <div className='flex flex-row'>
                  <Email sx={{ color: 'action.active', mr: 1, my: 2 }} />
                  <TextField label="Email" onChange={this.handleEmail} variant="standard" sx={{width:"18rem"}} />
                </div>
                <div className='flex flex-row'>
                  <Lock sx={{ color: 'action.active', mr: 1, my: 2 }} />
                  <TextField label="Password"  onChange={this.handlePassword} type="password" variant="standard" sx={{width:"18rem"}} />
                </div>
                <div>
                  <Button onClick={this.submitform} variant='outlined' sx={{":hover":{backgroundColor:"#0073e6",color:"#ffffff"}}}>LogIn</Button>
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
