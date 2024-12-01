import axios from 'axios'
import React, { useContext, useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { UserContext } from '../userContext'

function Loginpage() {
  const [email,setemail]=useState('')
  const [password,setpassword]=useState('')
  const [reditect,setredirect]=useState(false)
  //grabing setUser from userconntext.jsx 
  const {setUser}=useContext(UserContext)
  const handileLogin = async (event)=> {
    event.preventDefault();
    try{
      //{data}=userdoc.data
      const {data}=await axios.post('/login',{email,password})
      setUser(data)
      alert('login Sucesfully Done')
      setredirect(true)
    }
    catch (error){
      console.log(error);
      alert('login failed.try again later')
    }
  }
  if (reditect){
    return <Navigate to={'/'}/>
  }
  return (
    <div className='m-6 grow flex justify-around'>
    <div className='mt-32'>
    <h1 className='text-4xl text-center mb-6'>Login</h1>
      {/* mx-auto is used to centerr a element */}
      <form className='max-w-md mx-auto ' onSubmit={handileLogin}>
      <input
        type='email'
        placeholder='Enter Email Id'
        value={email}
        onChange={(event) => setemail(event.target.value)}
      />
      <input
        type='password'
        placeholder='Enter a Password'
        value={password}
        onChange={(event) => setpassword(event.target.value)}
      />
        <button className='login'>Login</button>
      </form>
      <div className='text-center text-gray-500 py-2'>
        I Don't have a account?  <Link to={"/regester"} className='underline'>Regester Now</Link>
      </div>
    </div>
    </div>
  )
}

export default Loginpage