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
    <div className='flex flex-row w-full px-5 py-3 font-bold bg-slate-800 text-white'>
        <div className='flex-initial w-3/6'>Logo</div>
        <div className='flex-1 hover:underline'><Link to={"/"}>Home</Link></div>
        <div className='flex-1 hover:underline'><Link to={"#"}> About us</Link></div>
        <div className='flex-1 hover:underline'><Link to = {"#"}>View list</Link></div>
        {usr?<div className='flex-1 hover:underline' onClick={()=>{setLogout(true)}}>LogOut</div>:null}
        {logout?<Logout />:null}
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
