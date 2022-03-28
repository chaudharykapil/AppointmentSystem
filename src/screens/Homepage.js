import { Button, Paper } from '@mui/material'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Header from '../components/Header'
import {FacebookTwoTone,Twitter,Instagram} from '@mui/icons-material'
import CountUp from 'react-countup';
export default class Homepage extends Component {
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
								<p className='text-5xl font-bold text-center text-gray-700'>Where the world<br/>builds software</p>
								<br/>
								<p className='text-gray-600 text-center'>
									Millions of developers and companies build, ship,<br/> 
									and maintain their software on GitHub—the largest and<br/> 
									most advanced development platform in the world.
								</p>
							</div>
							<div className='my-5 py-5'>
								<Link to={"/signup"}>
								<Button variant='contained'>Sign Up</Button>
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
								<span className='font-bold text-5xl text-blue-900 my-2'><CountUp end={100} duration = {2} />+</span>
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

					<div className='bg-gray-800 flex h-60 px-20 py-5 mb-1 mx-1'>
						<div className='flex flex-row'>
							<div className='flex flex-col'>
								<span className='text-white font-bold text-4xl my-3'>Website Name</span>
								<span className='text-gray-300 text-xs'>
									Company Name Private Limited,<br/>
									Buildings Alyssa, Begonia &<br/>
									Clove Embassy Tech Village,<br/>
									Outer Ring Road, Devarabeesanahalli Village,<br/>
									Bengaluru, 560103,<br/>
									Karnataka, India<br/>
									Email: abc123@xyz.com<br/>
									contact: +91 859379786<br/>
								</span>
							</div>
							<div className='flex flex-col'>
								<div className='flex flex-row mt-10 mx-10'>
									<div className='mx-5'>
										<FacebookTwoTone fontSize="large" color="primary"  />
									</div>
									<div className='mx-5'>
										<Twitter fontSize="large" color="primary"  />
									</div>
									
									<div className='mx-5'>
										<Instagram fontSize="large" color="primary"  />
									</div>
									
								</div>
							</div>
						</div>
					</div>

        </div>
      </div>
    )
  }
}
