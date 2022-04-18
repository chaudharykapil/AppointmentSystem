import React, { Component } from 'react'
import FaqQuestion from '../components/FaqQuestion'
import { SmallFooter } from '../components/Footer'
import Header from '../components/Header'
import database from "../database/FirebaseApi"
import { ref, child, get, set } from "firebase/database";
export default class FaqScreen extends Component {
  constructor(props){
    super(props)
    this.state = {
      orgid:null,
      faqs:[]
    }
  }
  componentDidMount(){
    this.getorgid()
  }
  getorgid = ()=>{
    let id = localStorage.getItem("selectorg")
    if(!id){
      id = localStorage.getItem("currorg")
    }
    if(!id){}
    else{
      this.setState({orgid:id})
    }
    this.getFAQS()
  }

  getFAQS = ()=>{
    get(child(ref(database),"/FAQs")).then(e=>{
      console.log(this.state.orgid)
      let temp = []
      for(let key in e.val()){
        if(e.val()[key].orgnisation == this.state.orgid){
          temp.push(e.val()[key])
        }
      }
      this.setState({faqs:temp})
    })
  }

  render() {
    return (
      <div>
          <div>
              <Header />
          </div>
          <div className='flex flex-col min-h-[80vh]'>
              <div className='flex h-24 items-center p-5'>
                <span className='text-black font-semibold text-3xl'>Frequently Asked Questions</span>
              </div>
              <div className='flex flex-col h-full py-20 justify-start items-center'>
                {
                    this.state.faqs.map((val,idx)=><FaqQuestion ques = {val.ques} index = {idx+1} ans = {val.ans} />)
                }
              </div>
          </div>
          <SmallFooter />
      </div>
    )
  }
}
