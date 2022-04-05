import React, { Component } from 'react'
import Header from '../components/Header'
import DashboardCard from "../components/DasboardCard"
import { SmallFooter } from '../components/Footer'
export default class DashBoard extends Component {
  render() {
    return (
      <div>
          <div>
              <Header/>
          </div>
          <div className='flex flex-col'>
            <div className='flex flex-col h-24 bg-blue-500 justify-center p-5'>
              <span className='text-white font-semibold text-3xl'>IIUM University</span>
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
