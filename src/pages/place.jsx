import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Booking from './Bookingwiget'

function Place() {
   const {id}=useParams()
   const [placeDoc,setPlaceDoc]=useState(null)
   const[photosonly,setphotosonly]=useState()
   useEffect(()=> {
      if(id){{
         axios.get(`/place/${id}`).then((response)=> {
            setPlaceDoc(response.data)
            console.log(placeDoc)
         })
      }}
   },[])
   if (!placeDoc) {
      return <div>Loading...</div>;
   }
   if(photosonly){
      return (
         <div className='absolute bg-white inset-0 p-8 '>
            <h1 className='text-black text-3xl'>{placeDoc.title}</h1>
            <button onClick={()=> {setphotosonly(false)}} className='fixed right-8 top-12 bg-gray-300 py-1 px-2 rounded-3xl mb-2 flex gap-1 shadow shadow-md shadow-black'>
            Close <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
               <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
            </button>
            {placeDoc.image.map((Place, index) => (
               <div className=' bg-black'>
                  <img className='mb-2 bg-black' key={index} src={'http://localhost:4000/uplodes/' + Place} />
               </div>
            ))}
         </div>
      )
   }
  return (
    <div className='mt-10 bg-gray-100 p-2 rounded-xl -mx-8 px-8 py-4'>
      <div className='high_margen'>
         <h1 className='text-2xl'>{placeDoc.title}</h1>
         <a className='font-semibold my-2 underline flex gap-1' target='_blank' href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(placeDoc.address)}`}>{placeDoc.address}
         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
            <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
         </svg>
         </a>
         {/* grid-col-2[2fr_1fr] this will create an grid with custom size */}
         <div className=' relative '>
            <div className='grid grid-cols-[2fr_1fr] gap-2 rounded-3xl overflow-hidden'>
               <div >
                  <img onClick={()=> {setphotosonly(true)}}  className='aspect-rectangle object-cover mb-2  ' src={'http://localhost:4000/uplodes/' + placeDoc.image[0]}/>
               </div>
               <div className='gap-2 p-1 mb-1'>
                  <img onClick={()=> {setphotosonly(true)}}  className='aspect-rectangle object-cover mb-2  h-56' src={'http://localhost:4000/uplodes/' + placeDoc.image[1]}/>
                  <div className='overflow-hidden'>
                     <img onClick={()=> {setphotosonly(true)}}  className='overflow-hidden aspect-rectangle object-cover h-56' src={'http://localhost:4000/uplodes/' + placeDoc.image[2]} />
                  </div>
               </div>  
            </div>
            <button onClick={()=> {setphotosonly(true)}} className='absolute bottom-2 right-0 bg-gray-100 py-1 px-2 shadow shadow-md shadow-gray rounded-full'>Show more </button>
         </div>

         <div className='mt-8 grid lg:grid-cols-[2fr_1fr] md:grid-cols-[2fr_2fr] gap-8'>
         <div>
            <div className='mt-2'>
               <h2 className='font-bold'>Description</h2>
               <p className='text-gray-700 gap-2 my-2'>{placeDoc.description}</p>
            </div>
            <p className='text-sm mt-2  text-gray-400'>Note time in 24 hrs</p>
            <h1>Check In Time:{placeDoc.checkin}</h1>
            <h1>Check Out Time:{placeDoc.checkout}</h1>
            <h1>Max Guste:{placeDoc.maxguest} Person's</h1>
         </div>
            <Booking placeDoc={placeDoc}/>
         </div>
         <div>
            <h1 className='font-bold mt-8'>Extra info</h1>
            <p className='text-gray-500 text-sm mb-4'>{placeDoc.extrainfo}</p>
         </div>
      </div>

    </div>
  )
}

export default Place