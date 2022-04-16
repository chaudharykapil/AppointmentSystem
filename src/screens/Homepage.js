import { Button, Paper } from '@mui/material'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Header from '../components/Header'
import {FullFooter} from "../components/Footer"
import CountUp from 'react-countup';
import database from "../database/FirebaseApi"
import { ref, child, get, set } from "firebase/database";
import { showMessagge } from '../components/message'
export default class Homepage extends Component {
	componentDidMount(){
		showMessagge()
	}
  render() {
    return (
    <div>
        <div>
        	<Header />
        </div>
        <div>
{/*================================================= Banner ============================================*/}
			<div className='flex flex-row bg-home-main-bg w-full h-96'>
				<div className='flex flex-1 flex-col backdrop-blur-md justify-center px-10'>
					<div>
						<p className='text-5xl font-bold text-center text-gray-700'>Book Your Appointment<br/>Hassle free...</p>
						<br/>
						<p className='text-gray-600 text-center'>
						To build an appointment system that allows the owner of the<br/> 
						office to schedule appointments, customer service section where <br/> 
						the customer can ask questions and a FAQ section
						</p>
					</div>
					<div className='my-5 py-5'>
						<Link to={"/signup"} className = "mx-2">
						<Button variant='contained'>Sign Up as Owner</Button>
						</Link>
						<Link to={"/user/signup"}  className = "mx-2">
						<Button variant='contained'>Sign Up as User</Button>
						</Link>
					</div>
				</div>
				<div className='flex flex-1 backdrop-blur-md justify-center items-center'>
				<iframe width="500" height="300"
					src="https://drive.google.com/file/d/1gaeG2N-HlNuadmgmuTTPmGOzClFtL34F/preview">
				</iframe>
				</div>
			</div>
{/*================================================= why us section ============================================*/}
			<div className='my-5'>
			<Paper elevation={3} className = "flex flex-col h-60 rounded-lg mx-2" >
				<p className='font-bold text-4xl text-center mt-5 text-blue-800'>Why US</p>
				<div className='flex flex-row justify-between px-10 items-center my-10'>
					<div className='flex flex-col items-center'>
						<span className='font-bold text-5xl text-blue-900 my-2'>24X7</span>
						<span>Technical Support</span>
					</div>
					<div className='flex flex-col items-center'>
						<span className='font-bold text-5xl text-blue-900 my-2'><CountUp end={500} duration = {2} />+</span>
						<span>Organization Registered</span>
					</div>
					<div className='flex flex-col items-center'>
						<span className='font-bold text-5xl text-blue-900 my-2'>Presonal</span>
						<span>Dashboard for differnt departments</span>
					</div>
				</div>
			</Paper>
			</div>
{/*================================================= Footer section ============================================*/}
        	<FullFooter />
        </div>
    </div>
    )
  }
}
