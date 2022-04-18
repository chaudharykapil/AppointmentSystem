import { Button, Paper, TextField } from '@mui/material'
import React, { Component } from 'react'
import { SmallFooter } from '../components/Footer'
import Header from '../components/Header'
import database from "../database/FirebaseApi"
import { ref, child, get, set, update } from "firebase/database";
import {showMessagge, loadmsg} from "../components/message";
import uuid from 'react-uuid';
export default class AddFaqScreen extends Component {
  constructor(props){
    super(props)
    this.state = {
      ques:"",
      userid:null,
      ans:"",
      redirect:null
    }
  }
  componentDidMount(){
    let usrid = localStorage.getItem("currorg")
    this.setState({userid:usrid})
    showMessagge()
  }
  addFAQ = ()=>{
    let id  = uuid()
    let data = {
      ques:this.state.ques,
      ans:this.state.ans,
      orgnisation:this.state.userid
    }
    if(data.ques == "" || data.ans == ""){
      loadmsg("Please Complete the form")
      showMessagge()
      return
    }
    set(ref(database,"/FAQs/"+id),data).then(e=>{
      loadmsg("FAQ added")
      showMessagge()
    })
  }
  render() {
    return (
      <div>
          <div>
              <Header />
          </div>
          <div className='flex h-[39rem] justify-center items-center'>
              <Paper className='flex flex-col items-center justify-start py-5' elevation={1} sx = {{width:"50%",minHeight:"40%"}}>
                  <div className='my-3'>
                      <span className='text-2xl font-bold'>Add FAQs Questions</span>
                  </div>
                    <TextField variant='outlined' required onChange={(evt)=>this.setState({ques:evt.target.value})} label = "Your Question" sx={{width:"80%",marginY:"0.2rem"}} />
                    <TextField variant='outlined' required onChange={(evt)=>this.setState({ans:evt.target.value})} multiline minRows={4} label = "Your Answer" sx={{width:"80%",marginY:"0.2rem"}} />
                    <div className='flex flex-row-reverse items-end  w-4/5'>
                        <Button onClick = {this.addFAQ} variant='contained'>Post</Button>
                    </div>
              </Paper>
          </div>
          <div>
              <SmallFooter />
          </div>
      </div>
    )
  }
}
