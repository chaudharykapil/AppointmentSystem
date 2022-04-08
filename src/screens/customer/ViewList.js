import { Button, MenuItem, TextField } from '@mui/material'
import React, { Component } from 'react'
import { SmallFooter } from '../../components/Footer'
import Header from '../../components/Header'

export default class ViewList extends Component {
  render() {
    return (
      <div>
          <div>
            <Header />
          </div>
          <div className='flex flex-col h-[40rem]'>
            <div className='flex h-24 bg-blue-500 items-center p-5'>
              <span className='text-white font-semibold text-3xl'>Select Organization</span>
            </div>
            <div className='flex flex-col items-center my-5'>
              <div className='flex w-full justify-center'>
                <TextField
                sx={{width:"40%"}}
                  select
                  label="Select"
                  value={1}
                  onChange={(evt)=>{}}
                  helperText="Please select Organization"
                >
                  <MenuItem key={"1"} value={"abc"}>
                    IIUM University
                  </MenuItem>
                </TextField>
              </div>
              <div className='my-2'>
                <Button  variant='outlined'>Go to Dashboard</Button>
              </div>
            </div>
          </div>
          <SmallFooter />
      </div>
    )
  }
}
