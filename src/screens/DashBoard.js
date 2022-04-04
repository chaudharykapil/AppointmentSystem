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
									<DashboardCard title = "Show Appointment" description = "Lorem Ipsum is simply dummy text of the printing 
                  and typesetting industry. Lorem Ipsum has been the industry's"
                   link = "#"  />
									<DashboardCard title = "Manage Setting" description = "Lorem Ipsum is simply dummy text of the printing 
                  and typesetting industry. Lorem Ipsum has been the industry's"
                   link = "#" />
								</div>
								<div className='flex flex-row'>
									<DashboardCard title = "Show FAQs" description = "Lorem Ipsum is simply dummy text of the printing 
                  and typesetting industry. Lorem Ipsum has been the industry's"
                   link = "/faqs" />
									<DashboardCard title = "Add FAQs" description = "Lorem Ipsum is simply dummy text of the printing 
                  and typesetting industry. Lorem Ipsum has been the industry's"
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
