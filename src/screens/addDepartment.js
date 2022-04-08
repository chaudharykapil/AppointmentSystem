import { Button, TextField } from '@mui/material'
import React, { Component } from 'react'
import { SmallFooter } from '../components/Footer'
import Header from '../components/Header'
import WorkingDayComp from '../components/WorkingDayComp'

export default class AddDepartment extends Component {
  render() {
    return (
      <div>
        <div>
          <Header />
        </div>
        <div>
          <div className='flex flex-col h-24 bg-blue-500 justify-center p-5'>
            <span className='text-white font-semibold text-3xl'>IIUM University</span>
            <span className='text-white text-xl'>Add Department</span>
          </div>
          <div className='flex justify-center py-2 min-h-[80vh]'>
            <div className='flex flex-col items-center w-full'>
              <TextField label = "Depatment Name" sx={{width:"70%"}} />
              <span className='text-left text-lg font-semibold'>Add Workind Days</span>
              <WorkingDayComp />
              <Button variant='contained'>Add</Button>
            </div>
          </div>
        </div>
        <SmallFooter />
      </div>
    )
  }
}
