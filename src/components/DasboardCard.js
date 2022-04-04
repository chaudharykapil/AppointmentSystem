import { Paper } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
export default function DasboardCard(props) {
  console.log(props)
  return (
    <div className='card'>
			<a href={props.link}>
				<Paper elevation={3} className="card1">
					<span className='font-bold text-2xl'>{props.title}</span>
					<p className="small text-sm w-60">{props.description}</p>
					<div className="go-corner"></div>
				</Paper>
			</a>
		</div>
  )
}
