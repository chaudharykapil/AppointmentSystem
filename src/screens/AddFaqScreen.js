import { Button, Paper, TextField } from '@mui/material'
import React, { Component } from 'react'
import { SmallFooter } from '../components/Footer'
import Header from '../components/Header'

export default class AddFaqScreen extends Component {
  render() {
    return (
      <div>
          <div>
              <Header />
          </div>
          <div className='flex h-[39rem] justify-center items-center'>
              <Paper className='flex flex-col items-center justify-start py-5' elevation={1} sx = {{width:"50%",minHeight:"40%"}}>
                  <div className='my-3'>
                      <span className='text-2xl font-bold'>Add FAQs Questions</span>
                  </div>
                    <TextField variant='outlined' label = "Your Question" sx={{width:"80%",marginY:"0.2rem"}} />
                    <TextField variant='outlined' multiline minRows={4} label = "Your Answer" sx={{width:"80%",marginY:"0.2rem"}} />
                    <div className='flex flex-row-reverse items-end  w-4/5'>
                        <Button variant='contained'>Post</Button>
                    </div>
              </Paper>
          </div>
          <div>
              <SmallFooter />
          </div>
      </div>
    )
  }
}
