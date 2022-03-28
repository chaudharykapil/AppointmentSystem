import React from 'react'
export default function Header() {
  return (
    <div className='flex flex-row w-full px-5 py-3 font-bold bg-slate-800 text-white'>
        <div className='flex-initial w-3/6 hover:underline'>Logo</div>
        <div className='flex-1 hover:underline'>Home</div>
        <div className='flex-1 hover:underline'>about us</div>
        <div className='flex-1 hover:underline'>view list</div>
        <div className='flex-1 hover:underline'>sign up</div>
    </div>
  )
}
