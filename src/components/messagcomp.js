import React from 'react'

export function SenderMsgComp(props) {
    return (
        <div className='flex w-full flex-row-reverse items-center px-10 my-3 '>
            <div className='px-5 py-3 border-2 border-[#8AA79C] rounded-3xl text-white bg-[#8AA79C]'>{props.message}</div>
        </div>
  )
}

export function RecieverMsgComp(props) {
    return (
        <div className='flex flex-row w-full px-10 my-3'>
            <div className='px-5 py-3 border-2 border-[#8AA79C] rounded-3xl text- text-[#8AA79C]'>{props.message}</div>
        </div>
    )
  }