import React, { Component } from 'react'
import AppointmentComp from '../components/AppointmentComp'
import { SmallFooter } from '../components/Footer'
import Header from '../components/Header'
import database from "../database/FirebaseApi"
import { ref, child, get, set } from "firebase/database";
export default class ShowAppoitment extends Component {
    constructor(props){
        super(props)
        this.state = {
            allapointment:[]
        }
    }
    componentDidMount(){
        let id = localStorage.getItem("currorg")
        get(child(ref(database),"/appointments")).then(e=>{
            console.log(e.val())
            let temp = []
            for(let key in e.val()){
                if(e.val()[key].orgid == id){
                    temp.push(e.val()[key])
                }
            }
            console.log(temp)
            this.setState({allapointment:temp})
        })
    }
  render() {
    return (
      <div>
          <div>
              <Header />
          </div>
          <div className='min-h-[35rem]'>
          <div className='flex h-24 items-center p-5'>
                <span className='text-black font-semibold text-3xl'>All Appointments</span>
            </div>
            
            <div className='flex flex-col justify-start items-center my-5'>
                <div className='flex px-3 py-2 min-h-[5rem] bg-slate-500 items-center'>
                    <div className='w-10 text-lg'>#</div>
                    <div className='w-48 text-lg'>Name</div>
                    <div className='w-32 text-lg'>Department</div>
                    <div className='w-80 text-lg'>Reason</div>
                    <div className='w-32 text-lg'>Time</div>
                    <div className='w-28 text-lg'>Date</div>
                </div>
                {
                    this.state.allapointment.map((val,idx)=><AppointmentComp index = {idx+1} date = {val.date} userid = {val.userid} dept = {val.dept} end = {val.end} start = {val.start} reason = {val.reason} />)
                }
            </div>
          </div>
          <div>
              <SmallFooter />
          </div>
      </div>
    )
  }
}
