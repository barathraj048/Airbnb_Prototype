import React, { useEffect } from 'react'
import { Await, Link, Navigate, useParams } from 'react-router-dom'
import Featurs from "./featuresinaddSection"
import Imagesection from './imagesection'
import  { useState } from 'react'
import axios from 'axios'

function Accomedationform({}) {
   const {id}=useParams()
   const [title,settitle]=useState('')
   const [address,setaddress]=useState('')
   const [image,setimage]=useState([])
   const [discription,setdiscription]=useState('')
   const [features,setfeatures]=useState([])
   const [extrainfo,setextrainfo]=useState('')
   const [checkin,setcheckin]=useState('')
   const [checkout,setcheckout]=useState('')
   const [maxguest,setmaxguest]=useState('')
   const [price,setprice]=useState()
   const [redirectTOAccount,setredirectTOAccount]=useState(false)

   useEffect(() => {
    if (id) {
      axios.get(`/places/${id}`)
        .then(({data}) => {
          settitle(data.title)
          setaddress(data.address)
          setfeatures(data.features)
          setdiscription(data.description)
          setextrainfo(data.extrainfo)
          setcheckin(data.checkin)
          setcheckout(data.checkout)
          setmaxguest(data.maxguest)
          setimage(data.image)
          setprice(data.price)
        })
        .catch(error => {
          console.error('Error fetching place:', error);
        });
    }
  }, [id]);

  

   const savePlace = async (event) => {
      event.preventDefault();
      if(id){
        //update
        console.log(id)
        try{
          await axios.put('/places',{
            id,
            title,
            address,
            image,
            discription,
            features,
            maxguest,
            extrainfo,
            checkin,
            checkout,
          price})
          setredirectTOAccount(true)
        }
        catch (error){
          console.log('Error in updating place',error)
        }
      }
      else{
        // add new
        try {
          await axios.post('/places', {
            title,
            address,
            image,
            discription,
            features,
            maxguest,
            extrainfo,
            checkin,
            checkout,
            price
          });
          setredirectTOAccount(true)
      } catch (error) {
          console.error('Error adding new place:', error);
      }
      }
  };
  if(redirectTOAccount){
    return (<Navigate to='/account'/>)
    
  }
  return (
    <div>
    <div className='gap-2 m-2 my-8'>
          <form className='gap-2 ' onSubmit={savePlace}>
            <h1 className='text-2xl mt-2'>Title</h1>
            <p className='text-sm text-gray-500'>Title for your place</p>
            <input type='text' value={title} onChange={(Event)=> {settitle(Event.target.value)}} placeholder='Title eg:My lovely Appartment'/>
            <h1 className='text-2xl mt-2'>Address</h1>
            <p className='text-sm text-gray-500'>Address for your place</p>
            <input type='text' value={address} onChange={(Event)=> {setaddress(Event.target.value)}}  placeholder='Title eg:My lovely Appartment'/>
            <h1 className='text-2xl mt-2'>Photo's</h1>
            <p className='text-sm text-gray-500 mb-2'>More photo=Better</p>
            <Imagesection photos={image} setphotos={setimage}/>
            <div>
            <h1 className='text-2xl mt-2'>Discription</h1>
            <p className='text-sm text-gray-500'>Discription about place</p>
            <textarea className='px-4 py-2 ' value={discription} onChange={(Event)=> {setdiscription(Event.target.value)}} />
            </div>
            <h1 className='text-2xl mt-2'>Features</h1>
            <p className='text-sm text-gray-500'>Features of your place</p>
            <Featurs Selected={features} onChange={setfeatures} />
            <div m-4>
            <h1 className='text-2xl mt-2'>Extra info</h1>
            <p className='text-sm text-gray-500'>Any extra information to guste</p>
            <textarea className='px-4 py-2 ' value={extrainfo} onChange={(Event)=> {setextrainfo(Event.target.value)}} />
            </div>
            <div>
            <h1 className='text-2xl mt-2'>Check-in Check-out & Max-guest</h1>
            <p className='text-sm text-gray-500 mb-4'>Remember you need some time for cleaning the room between the time </p>
            <div className='grid sm:grid-cols-3 gap-2'>
            <div >
              <h2 className='mb-2'>check-in</h2>
              <input type='text' value={checkin} onChange={(Event)=> {setcheckin(Event.target.value)}}  placeholder='14:00'/>
            </div>
            <div >
              <h2 className='mb-2'>check-out</h2>
              <input type='text' value={checkout} onChange={(Event)=> {setcheckout(Event.target.value)}}  placeholder='12:00'/>
            </div>
            <div>
              <h2 className='mb-2'>Max-guest</h2>
              <input type='number' value={maxguest} onChange={(Event)=> {setmaxguest(Event.target.value)}}  placeholder='2'/>
            </div>
            <div>
              <h2 className='mb-2'>Price per night</h2>
              <input type='number' value={price} onChange={(Event)=> {setprice(Event.target.value)}}  placeholder='2000 $'/>
            </div>
            </div>
            </div>
            <div className='flex justify-center mt-6' >
              <button className='bg-primary text-white px-6 py-2 rounded-full'>Submit</button>
            </div>
          </form>
        </div>
    </div>
  )
}

export default Accomedationform