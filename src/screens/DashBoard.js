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
            <div className='flex h-24 bg-blue-500 items-center p-5'>
              <span className='text-white font-semibold text-3xl'>Comapany/Departmant Name</span>
            </div>
            <div className=''>
							<div className='flex flex-col justify-center items-center'>
								<div className='flex flex-row'>
									<DashboardCard title = "Show Appointment" description = "" link = "#"  />
									<DashboardCard title = "Manage Setting" description = "" link = "#" />
								</div>
								<div className='flex flex-row'>
									<DashboardCard title = "Show FAQs" description = "" link = "/faqs" />
									<DashboardCard title = "Add FAQs" description = "" link = "/addfaq" />
								</div>
							</div>
            </div>
          </div>
					<SmallFooter />
      </div>
    )
  }
}
