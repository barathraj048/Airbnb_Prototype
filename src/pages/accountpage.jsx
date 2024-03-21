import React, { useContext, useState } from 'react'
import { UserContext } from '../userContext'
import { Link, NavLink, Navigate, useParams } from 'react-router-dom'
import axios from 'axios'
import AccomendationPage from './accomendationpage'
import Accountnav from './accountnav'
 
function Accountpage() {
   const [redirect,setredirect]=useState(null)
   const {subpage}=useParams()
   const {ready,user,setUser}=useContext(UserContext)

   const handileLogout=async ()=> {
      await axios.post('/logout')
      setredirect('/')
      setUser(null)
   }

   if(redirect){
      return(<Navigate to={redirect} />)
   }
   return (
    <div>
      <Accountnav subpage={subpage}/>
      {(subpage===undefined && user) && 
      <div className='text-center my-8 gap-4'>
         User logid in as <br/> User Name: {user.Name}<br/> User Email:({user.email} )<br/>
         <button onClick={handileLogout} className='bg-primary text-white py-2 px-4 rounded-full m-4 max-w-sl'>Logout</button>
      </div>}
      {subpage=== 'accomendation' && 
      <div>
         <AccomendationPage/>
      </div>}
    </div>
  )
}

export default Accountpage