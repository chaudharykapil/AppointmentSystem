import { Button, Paper } from '@mui/material'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Header from '../components/Header'
import Counter from 'react-number-counter'
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
							src="https://www.youtube.com/embed/Hz0a5SXHuBg">
						</iframe>
						</div>
					</div>
{/*================================================= why us section ============================================*/}
					<div className='my-5'>
					<Paper elevation={3} className = "flex flex-col h-48 rounded-lg mx-2" >
						<p className='font-bold text-4xl text-center text-blue-800'>Why US</p>
						<Counter start={0} end={100} delay={10} />
					</Paper>
					</div>


        </div>
      </div>
    )
  }
}
