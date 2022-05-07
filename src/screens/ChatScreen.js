import { Button, TextField } from '@mui/material'
import React, { Component } from 'react'
import { SmallFooter } from '../components/Footer'
import Header from '../components/Header'
import { RecieverMsgComp, SenderMsgComp } from '../components/messagcomp'
import database from "../database/FirebaseApi"
import { ref, child, get, set, onValue } from "firebase/database";
import { loadmsg, showMessagge } from '../components/message';
import uuid from 'react-uuid';
export default class AdminChatScreen extends Component {
    constructor(props){
        super(props)
        this.state = {
            message:"",
            messagelist:[],
            selectorg:null,
            userid:null
        }
    }
    componentDidMount(){
        let s = localStorage.getItem("selectorg")
        let u = localStorage.getItem("curruser")
        this.setState({selectorg:s})
        this.setState({userid:u})
        this.getMessages()
    }
    getMessages = ()=>{
        onValue(ref(database,"/messages"),(snap)=>{
            console.log(snap.val())
            this.setState({messagelist:this.filtermessages(snap.val())})
        })   
    }

    filtermessages = (messages)=>{
        let temp = []
        for (const key in messages) {
            if((messages[key].sender == this.state.userid && messages[key].reciver == this.state.selectorg) || (messages[key].reciver == this.state.userid && messages[key].sender == this.state.selectorg)){
                temp.push(messages[key])
            }
        }
        return this.insertionSort(temp)
    }
    insertionSort = (inputArr)=> {
        let n = inputArr.length;
            for (let i = 1; i < n; i++) {
                // Choosing the first element in our unsorted subarray
                let current = inputArr[i];
                // The last element of our sorted subarray
                let j = i-1; 
                while ((j > -1) && (current.timeint < inputArr[j].timeint)) {
                    inputArr[j+1] = inputArr[j];
                    j--;
                }
                inputArr[j+1] = current;
            }
        return inputArr;
    }
    sendMessage = ()=>{
        let message = this.state.message
        if(message == ""){
            return
        }
        let sender = this.state.userid;
        let reciver = this.state.selectorg;
        let date  = new Date()
        let dateint = date.getTime()
        set(ref(database,"/messages/"+uuid()),{
            message:message,
            sender:sender,
            reciver:reciver,
            timeint:dateint,
            time:date.toISOString()
        }).then(e=>this.setState({message:""}))
    }
  render() {
    return (
      <div>
          <Header />
          <div className='h-[40rem] flex flex-row'>
              <div className = 'w-1/3'>

              </div>
              <div className = 'h-[30rem] w-2/3 overflow-y-auto overflow-x-hidden'>
                  {
                      this.state.messagelist.map((val,idx)=>{
                          if(val.sender == this.state.userid){
                              return <SenderMsgComp message = {val.message} />
                          }
                          else if(val.reciver == this.state.userid){
                              return <RecieverMsgComp message = {val.message} />
                          }
                      })
                  }
              </div>
              <div className='flex flex-row justify-center absolute bottom-0 w-full m-5'>
                <TextField sx={{width:"90%"}} onChange = {(e)=>{this.setState({message:e.target.value})}} value = {this.state.message} placeholder = "Message" />
                <Button variant='outlined' onClick = {this.sendMessage} sx={{color:"#8AA79C",borderColor:"#8AA79C",marginX:"0.5rem",":hover":{backgroundColor:"#8AA79C",color:"#ffffff",borderColor:"#8AA79C"}}} >Send</Button>
              </div>
          </div>
          <div>
              <SmallFooter />
          </div>
      </div>

    )
  }
}
