import React from 'react'
import product from "../assets/productivity_illustration.png"
import { Link } from 'react-router-dom'

function Landing() {



  return (
    <>
    <div className='landing'>
      <img src={product} alt="" />
      <div className='text'>
        <h1> Turn your chaos into</h1>
      <h1 className='checkmark'>checkmarks</h1> 
      <h1> with Doozy </h1>
      <br />
      <Link to={"/signup"} className='startBtn'>Get Started</Link>
      </div>
    </div>
    </>
  )
}

export default Landing