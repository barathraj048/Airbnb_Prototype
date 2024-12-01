import React, { useState } from 'react';
import {differenceInCalendarDays} from 'date-fns'
import axios from 'axios';
import { Navigate } from 'react-router-dom';

function Booking({ placeDoc }) {
  const [checkin, setCheckin] = useState('');
  const [checkout, setCheckout] = useState('');
  const [guste, setGuste] = useState('');
  const [name, setname] = useState('');
  const [phone, setphone] = useState('');
  const [bookingID,setbookingID]= useState([])
  const [redirection,setredirection]=useState()

  let noOfDates=0
  if(checkin,checkout){
    noOfDates=differenceInCalendarDays(new Date(checkout),new Date(checkin))
  }
  let place=placeDoc._id;
  let price=(placeDoc.price*noOfDates)

  const handleEvents = (event) => {
    const { value, name } = event.target;

    if (name === 'Check-in') {
      setCheckin(value);
    } else if (name === 'Check-out') {
      setCheckout(value);
    } else if (name === 'guste') {
      setGuste(value);
    }else if (name === 'name') {
      setname(value);
    }else if (name === 'phone') {
      setphone(value);
    }
  };

  const submitHandile = async () => {
  try {
    const response = await axios.post('/bookings', {
      checkin,
      checkout,
      guste,
      name,
      phone,
      place,
      price
    });
    setbookingID((PrevValue) => {
      return [...PrevValue, response.data._id];
    });
    console.log(response.data._id);
    setredirection(true)
  } catch (error) {
    console.error('Error creating booking:', error);
  }
};
  if(redirection){
    return(
      <Navigate to={`/account/bookings/${bookingID}`} />
    )
  }
  return (
    <div>    
      <div className='p-2 rounded-2xl items-center'>
        <div className='bg-white p-2 pb-4 rounded-2xl text-center align-middle '>
          <h1 className='text-xl'>Price Per Night ${placeDoc.price}</h1>
          <div className=''>
            <div className='m-4 p-2 rounded-xl'>
              Check-in <input onChange={handleEvents} name='Check-in' type='date'/> <br/>
            </div>
            <div className='m-4 p-2 rounded-xl -mt-4'>
              Check-out <input onChange={handleEvents} name='Check-out' type='date'/><br/>
            </div>
          </div>
          <div className='m-2 p-2 rounded-xl -mt-4 '>
            <input type='number' name='guste' onChange={handleEvents} className='border border-black' value={guste} placeholder='No of guste'/><br/>
          </div>
          {noOfDates > 0 && (
            <>
            <div className='m-2 p-2 rounded-xl -mt-4'>
            <input type='text' name='name' onChange={handleEvents} className='border border-black' value={name} placeholder='Enter your name'/><br/>
          </div>
          <div className='m-2 p-2 rounded-xl -mt-4'>
            <input type='phone' name='phone' onChange={handleEvents} className='border border-black' value={phone} placeholder='Enter your phone number'/><br/>
          </div>
            </>
          )}
          <button className='bg-primary px-4 py-2 w-full text-white rounded-3xl' onClick={submitHandile}>Book This Place
          {noOfDates > 0 && (<span> For {noOfDates} days($:{noOfDates*placeDoc.price})</span>)}</button>          
        </div>
      </div>
    </div>
  );
}

export default Booking;
