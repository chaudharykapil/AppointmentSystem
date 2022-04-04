import { Paper } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
export default function DasboardCard(props) {
	console.log(props)
  return (
    <div className='card'>
			<a href={props.link}>
				<Paper elevation={3} className="card1" >
					<h3>{props.title}</h3>
					<p className="small">{props.description}</p>
					<div className="go-corner">
					</div>
				</Paper>
			</a>
		</div>
  )
}
