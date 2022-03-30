import React, { Component } from 'react'
import FaqQuestion from '../components/FaqQuestion'
import { SmallFooter } from '../components/Footer'
import Header from '../components/Header'

export default class FaqScreen extends Component {
  render() {
    return (
      <div>
          <div>
              <Header />
          </div>
          <div className='flex flex-col min-h-[80vh]'>
              <div className='flex h-24 bg-blue-500 items-center p-5'>
                <span className='text-white font-semibold text-3xl'>Frequently Asked Questions</span>
              </div>
              <div className='flex flex-col h-full py-20 justify-start items-center'>
                {
                    [1,2,3,4,5,6,7,8,9,10].map((val,idx)=><FaqQuestion />)
                }
              </div>
          </div>
          <SmallFooter />
      </div>
    )
  }
}
