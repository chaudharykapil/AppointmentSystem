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
            currorg:null,
            allusers:[],
            userid:null
        }
    }
    componentDidMount(){
        let s = localStorage.getItem("currorg")
        this.setState({currorg:s})
        
        this.getAllusers()
    }
    getAllusers = ()=>{
        get(child(ref(database),"/customers")).then(e=>{
            
            let temp = []
            e.forEach((v)=>{
                temp.push({id:v.key,name:e.val()[v.key].firstname})
            })
            this.setState({allusers:temp})
        })
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
            console.log()
            if((messages[key].sender == this.state.userid && messages[key].reciver == this.state.currorg) || (messages[key].reciver == this.state.userid && messages[key].sender == this.state.currorg)){
                temp.push(messages[key])
            }
        }
        console.log(temp)
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
    setUserId = (id)=>{
        console.log(id)
        this.setState({userid:id},this.getMessages())

    }
    sendMessage = ()=>{
        let message = this.state.message
        if(message == ""){
            return
        }
        let sender = this.state.currorg;
        let reciver = this.state.userid;
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
              <div className = 'w-1/3 h-[40rem] overflow-y-auto overflow-x-hidden bg-slate-200'>
                {
                    this.state.allusers.map((v,idx)=>{
                        return (
                            this.state.userid == v.id ?<div className='h-24 flex flex-row bg-slate-300 mx-2 my-3 items-center px-2' onClick={()=>this.setUserId(v.id)}>
                                <div className=' flex rounded-full h-20 w-20 bg-green-700 justify-center items-center text-4xl font-bold text-white'>{v.name[0]}</div>
                                <div className='text-lg mx-5 text-gray-600'>
                                    {v.name}
                                </div>
                            </div>:
                            <div className='h-24 flex flex-row hover:bg-slate-300 mx-2 my-3 items-center px-2' onClick={()=>this.setUserId(v.id)}>
                                <div className=' flex rounded-full h-20 w-20 bg-green-700 justify-center items-center text-4xl font-bold text-white'>{v.name[0]}</div>
                                <div className='text-lg mx-5 text-gray-600'>
                                {v.name}
                                </div>
                            </div>
                        )
                    })
                }
              </div>
              <div className='w-2/3'>
                <div className = 'h-[30rem] overflow-y-auto overflow-x-hidden'>
                    {
                        this.state.messagelist.map((val,idx)=>{
                            if(val.sender == this.state.currorg){
                                return <SenderMsgComp message = {val.message} />
                            }
                            else if(val.reciver == this.state.currorg){
                                return <RecieverMsgComp message = {val.message} />
                            }
                        })
                    }
                </div>
                <div className='flex flex-row justify-start absolute bottom-0 w-2/3 p-5'>
                    <TextField sx={{width:"50%"}} onChange = {(e)=>{this.setState({message:e.target.value})}} value = {this.state.message} placeholder = "Message" />
                    <Button variant='outlined' onClick = {this.sendMessage} sx={{color:"#8AA79C",borderColor:"#8AA79C",marginX:"0.5rem",":hover":{backgroundColor:"#8AA79C",color:"#ffffff",borderColor:"#8AA79C"}}} >Send</Button>
                </div>
              </div>
          </div>
          <div>
              <SmallFooter />
          </div>
      </div>

    )
  }
}
