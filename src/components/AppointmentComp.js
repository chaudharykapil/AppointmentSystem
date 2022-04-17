import { Paper } from '@mui/material'
import React, { Component } from 'react'
import database from "../database/FirebaseApi"
import { ref, child, get, set } from "firebase/database";
export default class AppointmentComp extends Component {
    constructor(props){
        super(props)
        this.state = {
            name:""
        }
    }
    componentDidMount(){
        this.getusername()
    }
    getusername = ()=>{
        get(child(ref(database),"/customers")).then(e=>{
            let u = e.val()[this.props.userid]
            this.setState({name:u.firstname+" "+u.lastname})
            console.log(e.val()[this.props.userid])
        })
    }
  render() {
    return (
      <Paper elevation={0} sx = {{margin:"0.6rem"}}>
          <div className='flex px-3 py-2 min-h-[5rem] items-center'>
              <div className='w-10 text-lg'>{this.props.index}</div>
              <div className='w-48 text-lg'>{this.state.name}</div>
              <div className='w-32 text-lg'>{this.props.dept}</div>
              <div className='w-80 text-lg'>{this.props.reason}</div>
              <div className='w-32 text-lg'>{this.props.start}-{this.props.end}</div>
              <div className='w-28 text-lg'>{this.props.date}</div>
          </div>
      </Paper>
    )
  }
}
