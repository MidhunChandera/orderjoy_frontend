import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Hero() {

  const navigate = useNavigate();
const checktoken=()=>{
  const token = localStorage.getItem('token');
  if(!token){
    toast.info('please login')
navigate('/login')
  }
  else{
    navigate('/menu')
  }
}

  
  return (
    <>
<div id='hero-section' className="hero-container container-fluid p-5  ">
  <div className="row mt-5">
    <div className="col-md-6 mt-5">
    <h1>Order <span className='greentxt'>Delicious Food</span> from Our Website, Anytime, Anywhere!</h1>
<p className='mt-4'>Browse our wide variety of dishes and enjoy fast, reliable delivery straight to your door. It’s easy, quick, and guaranteed to satisfy your cravings!</p>
<button onClick={checktoken} className='headerbtn mt-3'>Order Now</button>
    </div>
    <div className="col-md-6"></div>
  </div>
</div>

    </>
  )
}

export default Hero
