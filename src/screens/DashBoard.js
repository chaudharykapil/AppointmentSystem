import React, { Component } from 'react'
import Header from '../components/Header'
import DashboardCard from "../components/DasboardCard"
import { SmallFooter } from '../components/Footer'
import database from "../database/FirebaseApi"
import {Navigate} from "react-router-dom";
import { ref, child, get, set } from "firebase/database";
import { showMessagge } from '../components/message'
export default class DashBoard extends Component {
  constructor(props){
    super(props)
    this.state = {
      user:null,
      redirect:null,
    }
  }
  componentDidMount(){
    this.getUser()
    showMessagge()
  }
  getUser = ()=>{
    let orgid = localStorage.getItem("currorg")
    if(orgid){
      get(child(ref(database),"/organisations")).then(e=>{
        let allorganisations = e.val()
        console.log(allorganisations[orgid])
        this.setState({user:allorganisations[orgid]})
      })
    }
  }
  render() {
    
    return (
      <div>
        <div>
            <Header/>
        </div>
        <div className='flex flex-col'>
          <div className='flex flex-col h-24 justify-center p-5'>
            <span className='text-black font-semibold text-3xl'>{this.state.user?this.state.user.orgnisation:""}</span>
            <span className='text-black text-xl'>Dashboard</span>
          </div>
          <div className=''>
            <div className='flex flex-col justify-center items-center'>
              <div className='flex flex-row'>
                <DashboardCard title = "Show Appointment" description = "Here You will find all your appointmens and schedules"
                  link = "/showappointment"  />
                <DashboardCard title = "Add Departments" description = "Manage your department and their dashboard"
                  link = "/add-department" />
              </div>
              <div className='flex flex-row'>
                <DashboardCard title = "Show FAQs" description = "Show all your FAQs to you and your customers"
                  link = "/faqs" />
                <DashboardCard title = "Add FAQs" description = "Add more solution to make it easy for your customer"
                  link = "/addfaq" />
              </div>
            </div>
          </div>
        </div>
				<SmallFooter />
      </div>
    )
  }
}