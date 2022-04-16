import { Accordion, AccordionDetails, AccordionSummary, Button, Checkbox } from '@mui/material'
import React, { Component } from 'react'
import { ExpandMore } from '@mui/icons-material'
import Header from "../components/Header"
import { SmallFooter } from '../components/Footer'
import { Navigate } from 'react-router-dom'
import WorkingDayComp from '../components/WorkingDayComp'
import database from "../database/FirebaseApi"
import { ref, child, get, set, update } from "firebase/database";
export default class WorkingDays extends Component {
  constructor(props){
    super(props)
    this.state = {
      usrid:null,
      days:null,
      time:null,
      userdata:{},
      redirect:null
    }
  }
  componentDidMount(){
    let usrid = localStorage.getItem("newuser")
    get(child(ref(database),"/organisations")).then(e=>{
      this.setState({userdata:e.val()[usrid]})
    })
    this.setState({usrid:usrid})
  }
  onChangeDays = (data)=>{
		console.log(data)
    this.setState({days:data["day"]})
    this.setState({time:data["time"]})
	}
  savedays = ()=>{
    let updatedata  = {}
    let tempdata = this.state.userdata
    tempdata["days"] = this.state.days
    tempdata["time"] = this.state.time
    updatedata["/organisations/"+this.state.usrid] = tempdata
    update(ref(database),updatedata).then(e=>{
      this.setState({redirect:"/add-department"})
    })

  }
  render() {
    if (this.state.redirect) {
      return <Navigate to={this.state.redirect} />
    }
    return (
      <div className=''>
        <div>
          <Header />
        </div>
        <div>
          <div className='flex flex-col h-24 bg-blue-500 justify-center p-5'>
            <span className='text-white font-semibold text-3xl'>IIUM University</span>
            <span className='text-white text-xl'>Add Working Days</span>
          </div>
          <div className='flex flex-col my-5 w-full items-center'>
            <div className='flex flex-col w-2/3'>
              <span className='text-center font-bold text-2xl'>Select Working Days and Time slots</span>
              <div className='flex items-center flex-col'>
                <WorkingDayComp onChange = {this.onChangeDays} />
              </div>
            </div>
            <div>
              <Button variant='contained' onClick={this.savedays}>Next</Button>
            </div>
          </div>
        </div>
        <SmallFooter />
      </div>
    )
  }
}
