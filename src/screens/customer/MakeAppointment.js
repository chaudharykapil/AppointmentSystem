import { Button, MenuItem, TextField } from '@mui/material'
import React, { Component } from 'react'
import database from "../../database/FirebaseApi"
import { ref, child, get, set } from "firebase/database";
import uuid from 'react-uuid';
import { SmallFooter } from '../../components/Footer'
import { loadmsg, showMessagge } from '../../components/message';
import Header from '../../components/Header';
import { Calendar, MuiPickersUtilsProvider } from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
export default class MakeAppointment extends Component {
  constructor(props){
    super(props)
    this.state = {
      start:"",
      end:"",
      date:new Date(),
      alldept:[],
      datetimings:{},
      starttime:[],
      appoint:{},
      endtime:[],
      userid:null,
      orgid:null,
      dept:null,
    }
  }
  days = {0:"Sunday",1:"Monday",2:"Tuesday",3:"Wednesday",4:"Thrusday",5:"Friday",6:"Saturday"}
  componentDidMount(){
    this.getuserid()
    this.getOrgid()
    this.getDepts()
    this.getTimings()
    this.getAppointment()
  }
  getTimings = ()=>{
    get(ref(database,"/organisations/")).then(e=>{
      let org = e.val()[this.state.orgid]
      let c = {}
      for(let idx in org["days"]){
        let day = org["days"][idx]
        c[day] = org["time"][day]
      }

      this.setState({datetimings:c})
      
    })
  }
  getAppointment = () =>{
    get(ref(database,"/appointments")).then(e=>{
      console.log(e.val())
      this.setState({appoint:e.val()})
    })
  }
  getuserid = ()=>{
    let u = localStorage.getItem("curruser")
    this.setState({userid:u})
  }
  getOrgid = ()=>{
    let u = localStorage.getItem("selectorg")
    this.setState({orgid:u})
  }
  getDepts = ()=>{
    get(child(ref(database),"/departments")).then(e=>{
      let temp = {}
      for(let key in e.val()){
        if(e.val()[key].orgnisation == this.state.orgid){
          temp.push(e.val()[key].name)
        }
      }
      this.setState({alldept:temp})
    })
  }
  getDateFromHours = (time)=>{
    time = time.split(':');
    let now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), now.getDate(), ...time);
    }
  ondateChange = (date,isfinish)=>{
    this.setState({date:date},this.getcurrtiming(date.toDateString()))
  }
  check_appoint_date_time = (val,date)=>{
    
    for(let key in this.state.appoint){
      if( this.state.appoint[key].orgid == this.state.orgid && this.state.appoint[key].date == date && this.state.appoint[key].start.split(":")[0] == val){
        return false;
      }
    }
    return true
  }
  getcurrtiming = (date)=>{
    console.log(date)
    let day = this.state.date.getDay()
    let timerange = this.state.datetimings[this.days[day]]
    let begin = timerange["begin"]
    let end = timerange["end"]
    let temp1 = []
    let temp2 = []
    let b_h = parseInt(begin.split(":")[0])
    let b_m = parseInt(begin.split(":")[1])
    let e_h = parseInt(end.split(":")[0])
    let e_m = parseInt(end.split(":")[1])
    
    for(let x=0;x<e_h-b_h;x++){
      console.log(this.state.appoint)
      let t = b_h +x;
      let p = b_m + 30
      t =  t+ Math.floor(p/60);
      let m = p%60;
      if(b_m <10 && this.check_appoint_date_time(b_h +x,date)){
        let f = String(b_h+x) + ":0" + b_m.toString()
        temp1.push(f)
      }
      else if(b_m >=10  && this.check_appoint_date_time(b_h +x,date)){
        let f = String(b_h+x) + ":" + b_m.toString()
        temp1.push(f)
      }
      if(m < 10  && this.check_appoint_date_time(b_h +x,date)){
        let g = t.toString() + ":0" + m.toString()
        temp2.push(g)
      }
      else if(m >= 10  && this.check_appoint_date_time(b_h +x,date)){
        let g = t.toString() + ":" + m.toString()
        temp2.push(g)        
      }
    }
    console.log(temp1,temp2)
    this.setState({starttime:temp1})
    this.setState({endtime:temp2})
  }
  submit = ()=>{
    let id  = uuid()
    let data = {
      userid:this.state.userid,
      orgid:this.state.orgid,
      start:this.state.start,
      end:this.state.end,
      date:this.state.date.toDateString()
    }
    console.log(data)
    set(ref(database,"/appointments/"+id),data).then(e=>{
      loadmsg("Appointment fixed")
      showMessagge()
    })
  }
  handleInput = (evt)=>{
    this.setState({dept:evt.target.value})
  }
  render() {
    return (
      <div>
        <Header />
        <div className='flex flex-row h-[40rem]'>
          <div className = 'w-1/2 h-full'>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <Calendar date = {this.state.date}  onChange = {this.ondateChange} />
            </MuiPickersUtilsProvider>
          </div>
          <div className = 'w-1/2 flex flex-row justify-around mt-10'>
            {this.state.starttime.length?
            <>
              <ToggleButtonGroup
                        color="primary"
                        value={this.state.start}
                        onChange = {(e,v)=>this.setState({start:v})}
                        orientation="vertical"
                        exclusive
              >
                {
                  this.state.starttime.map((v,i)=>{
                    return(
                      
                        <ToggleButton sx={{width:"10rem",height:"4rem"}} value={v}>{v}</ToggleButton>
                    )
                  })
                }
                </ToggleButtonGroup>

                <ToggleButtonGroup
                        color="primary"
                        value={this.state.end}
                        onChange = {(e,v)=>this.setState({end:v})}
                        orientation="vertical"
                        exclusive          
              >
                {
                  this.state.endtime.map((v,i)=>{
                    return(
                        <ToggleButton sx={{width:"10rem",height:"4rem"}} value={v}>{v}</ToggleButton>
                    )
                  })
                }
              </ToggleButtonGroup>
              </>
              :
              <>
                <div className='flex justify-center items-center'>
                  No time slot is available for current date or please reselect the date.
                </div>
              </>
            }
          </div>
          
        </div>
        <div className='flex m-4 justify-center items-center'>
            <Button variant='outlined' onClick={this.submit} sx={{color:"#8AA79C",borderColor:"#8AA79C",marginX:"0.5rem",":hover":{backgroundColor:"#8AA79C",color:"#ffffff",borderColor:"#8AA79C"}}}>Make appointment</Button> 
        </div>
        <SmallFooter />
    </div>
    )
  }
}
