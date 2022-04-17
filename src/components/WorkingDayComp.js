import React, { Component } from 'react'
import { Accordion, AccordionDetails, AccordionSummary, Checkbox, TextField } from '@mui/material'
import { ExpandMore } from '@mui/icons-material'
export default class WorkingDayComp extends Component {
  constructor(props){
      super(props)
      this.state = {
          days : [
              "Monday","Tuesday","Wednesday","Thrusday","Friday","Saturday","Sunday"
            ],
          times:[
            "10AM-11AM","11AM-12AM","01PM-02PM","02PM-03PM","03PM-04PM","05PM-06PM"
          ],
          selectedDays:[],
          selectedTime:{}
      }
  }
  handleDays = (evt)=>{
    let tempday = this.state.selectedDays
    if(evt.target.checked){
      tempday.push(evt.target.value)
      this.setState({selectedDays:tempday},()=>this.props.onChange(this.state.selectedDays))
    }
    else{
      tempday = []
      for(let i=0;i<this.state.selectedDays.length;i++){
        if(evt.target.value != this.state.selectedDays[i]){
          tempday.push(this.state.selectedDays[i])
        }
      }
      this.setState({selectedDays:tempday},()=>this.props.onChange({day:this.state.selectedDays,time:this.state.selectedTime}))
      
    }
  }
  handleBeginTime = (evt)=>{
    let temptime = this.state.selectedTime
    let day = evt.nativeEvent.path[5].children[0].children[0].children[0].value
    let time = evt.target.value
    if(!temptime[day]){
      temptime[day] = {}
    }
    temptime[day]["begin"] = time
    
    this.setState({selectedTime:temptime},()=>this.props.onChange({day:this.state.selectedDays,time:this.state.selectedTime}))
  }
  handleEndTime = (evt)=>{
    let temptime = this.state.selectedTime
    
    let day = evt.nativeEvent.path[5].children[0].children[0].children[0].value
    console.log(day)
    let time = evt.target.value
    if(!temptime[day]){
      temptime[day] = {}
    }
    temptime[day]["end"] = time
    
    this.setState({selectedTime:temptime},()=>this.props.onChange({day:this.state.selectedDays,time:this.state.selectedTime}))
  }


  render() {
    return (
        <>
        {this.state.days.map((day,ind)=>(
          <div className='flex justify-center '>
            <div className=' flex justify-start m-2'>
              <div className = "flex items-center mx-2">
                <Checkbox onChange={this.handleDays} value = {day} />
                {day}
              </div>
              <div>
                <div className='grid grid-cols-4 gap-2'>
                  <TextField type = "time" onChange={this.handleBeginTime} />
                  <TextField type = "time" onChange={this.handleEndTime} />        
                </div>
              </div>
            </div>
          </div>
            ))}
        </>
    )
  }
}
