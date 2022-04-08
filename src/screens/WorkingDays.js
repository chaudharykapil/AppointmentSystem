import { Accordion, AccordionDetails, AccordionSummary, Button, Checkbox } from '@mui/material'
import React, { Component } from 'react'
import { ExpandMore } from '@mui/icons-material'
import Header from "../components/Header"
import { SmallFooter } from '../components/Footer'
import { Link } from 'react-router-dom'
import WorkingDayComp from '../components/WorkingDayComp'
export default class WorkingDays extends Component {
  constructor(props){
    super(props)
    this.state = {
      
    }
  }
  render() {
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
                <WorkingDayComp />
              </div>
            </div>
            <div>
              <Link to = {"/add-department"}>
                <Button variant='contained'>Next</Button>
              </Link>
            </div>
          </div>
        </div>
        <SmallFooter />
      </div>
    )
  }
}
