import React, { Component } from 'react'
import { Accordion, AccordionDetails, AccordionSummary, Checkbox } from '@mui/material'
import { ExpandMore } from '@mui/icons-material'
export default class WorkingDayComp extends Component {
    constructor(props){
        super(props)
        this.state = {
            days : [
                "Monday","Tuesday","Wednesday","Thrusday","Friday","Saturday","Sunday"
              ]
        }
    }
  render() {
    return (
        <>
        {this.state.days.map((day,ind)=>(
            <Accordion sx = {{width:"70%",margin:"0.5rem"}}>
              <AccordionSummary
              expandIcon={<ExpandMore />}
              className = "flex justify-center"
              >
                <Checkbox />
                {day}
              </AccordionSummary>
              <AccordionDetails>
                <div className='grid grid-cols-4 gap-2'>
                  <span className='rounded-full px-3 py-2 border-2 bg-blue-300 mx-5'>10AM-11AM</span>
                  <span className='rounded-full px-3 py-2 border-2 bg-slate-100 mx-5'>11AM-12AM</span>
                  <span className='rounded-full px-3 py-2 border-2 bg-slate-100 mx-5'>01PM-02PM</span>
                  <span className='rounded-full px-3 py-2 border-2 bg-slate-100 mx-5'>02PM-03PM</span>
                  <span className='rounded-full px-3 py-2 border-2 bg-slate-100 mx-5'>03PM-04PM</span>
                  <span className='rounded-full px-3 py-2 border-2 bg-slate-100 mx-5'>05PM-06PM</span>
                </div>
              </AccordionDetails>
            </Accordion>
            ))}
        </>
    )
  }
}
