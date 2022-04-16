import React, { Component } from 'react'
import Header from '../components/Header'
import DashboardCard from "../components/DasboardCard"
import { SmallFooter } from '../components/Footer'
import database from "../database/FirebaseApi"
import {Navigate} from "react-router-dom";
import { ref, child, get, set } from "firebase/database";
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
          <div className='flex flex-col h-24 bg-blue-500 justify-center p-5'>
            <span className='text-white font-semibold text-3xl'>{this.state.user?this.state.user.orgnisation:""}</span>
            <span className='text-white text-xl'>Dashboard</span>
          </div>
          <div className=''>
            <div className='flex flex-col justify-center items-center'>
              <div className='flex flex-row'>
                <DashboardCard title = "Show Appointment" description = "Here You will find all your appointmens and schedules"
                  link = "#"  />
                <DashboardCard title = "Manage Setting" description = "Manage your personal account setting , scheduling and working hours"
                  link = "#" />
              </div>
              <div className='flex flex-row'>
                <DashboardCard title = "Show FAQs" description = "Show all your FAQs to you and your customers"
                  link = "/faqs" />
                <DashboardCard title = "Add FAQs" description = "Add more solution to make it easy for your customer"
                  link = "/addfaq" />
              </div>
              <div className='flex flex-row'>
                <DashboardCard title = "Manage Departments" description = "Manage your department and their dashboard"
                  link = "/faqs" />
                
              </div>
            </div>
          </div>
        </div>
				<SmallFooter />
      </div>
    )
  }
}