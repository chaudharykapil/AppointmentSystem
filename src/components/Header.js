import React, { useState, useEffect } from 'react'
import { Link, Navigate } from 'react-router-dom'
export default function Header() {
  const [logout,setLogout] = useState(false)
  const [usr,setUsr] = useState(null)
  useEffect(()=>{
    let u = localStorage.getItem("currorg")
    if(!u){
      u = localStorage.getItem("curruser")
    }
    setUsr(u)
  },[])
  
  return (
    <div className='flex flex-row w-full px-5 py-3 font-bold bg-[#8AA79C] text-white'>
        <div className='flex-initial w-2/6'>
          <div className='flex w-32 h-32 rounded-full justify-center items-center bg-[#748C83]'>Logo</div>
        </div>
        <div className='flex-1 flex-col'>
          <div className='m-2 mb-7'>
            <span className='text-2xl font-bold text-black'>Office Appointment Booking System</span>
          </div>
          <div className='flex items-between'>
            <div className='flex-1 hover:underline'><Link to={"/"}>Home</Link></div>
            <div className='flex-1 hover:underline'><Link to={"/#about"}> About us</Link></div>
            <div className='flex-1 hover:underline'><Link to = {"/viewlist"}>View list</Link></div>
            {localStorage.getItem("currorg")?<div className='flex-1 hover:underline'><Link to = {"/org/chat"}>Message</Link></div>:null}
            {usr?<div className='flex-1 hover:underline' onClick={()=>{setLogout(true)}}>LogOut</div>:null}
            {logout?<Logout />:null}
          </div>
        </div>
    </div>
  )
}

export function Logout() {
  function logout(){
    localStorage.removeItem("currorg")
    localStorage.removeItem("curruser")
  }
  useEffect(()=>{
    logout()
  },[])
  return (
    <Navigate to={"/"} />
  )
}
