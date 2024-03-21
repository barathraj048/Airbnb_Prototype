import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from "axios"

function Regester() {
 const [Name,setname]=useState('')
 const [password,setpasswors]=useState('')
 const [email,setemail]=useState('')
 const regesteruser = async (event) => {
  event.preventDefault();
  try {
    const response = await axios.post('/register', {
      Name,
      email,
      password
    });

    alert('Registration successful.Go to login');
  } catch (error) {
    alert('Registration failed,Retry later');
  }
};

 
  return (
    <div>
      <div className='m-6 grow flex justify-around'>
    <div className='mt-32'>
    <h1 className='text-4xl text-center mb-6'>Register</h1>
      {/* mx-auto is used to centerr a element */}
      <form className='max-w-md mx-auto ' onSubmit={regesteruser}>
        <input type='text' placeholder='Barath Raj' value={Name} onChange={(Event)=> {setname(Event.target.value)}}/>
        <input type='email' placeholder='Enter Email Id'  value={email} onChange={(Event)=> {setemail(Event.target.value)}}/>
        <input type='password' placeholder='Enter a Password'  value={password} onChange={(Event)=> {setpasswors(Event.target.value)}}/>
        <button className='login'>Regester</button>
      </form>
      <div className='text-center text-gray-500 py-2'>
        I already have a account?  <Link to={"/login"} className='underline'>Login</Link>
      </div>
    </div>
    </div>
    </div>
  )
}

export default Regester