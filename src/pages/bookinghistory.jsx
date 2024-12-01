import React, { useEffect, useState } from 'react';
import Accountnav from './accountnav';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Bookingimghistory from './bookingimghistory';

function Bookinghistory() {
   const { id } = useParams();
   const [placeDoc, setPlaces] = useState([]);

   useEffect(() => {
    if (id) {
      axios.get(`/bookingsdata/${id}`)
        .then(response => {
          console.log('Data received from server:', response.data);
          setPlaces(response.data);
        })
        .catch(error => {
          console.error('Error fetching data from server:', error);
        });
    } else {
      axios.get(`/bookingsdata`)
        .then(response => {
          console.log('Data received from server:', response.data);
          setPlaces(response.data);
        })
        .catch(error => {
          console.error('Error fetching data from server:', error);
        });
    }
  }, [id]); // Only re-run the effect if `id` changes
  
  return (
    <div>
      <Accountnav subpage={'bookings'}/>
      <h1 className='text-2xl text-center mt-4 text-gray-800'>Places Booked by you </h1>
      <div >
        {placeDoc.length > 0 && (
          <div >
            {placeDoc.map((place, index) => { 
                const dateWithoutTime = place.checkout.split('T')[0];
                const dateWithinTime = place.checkin.split('T')[0];
                const Places=place.place
                return (
                  <div key={index} className='w-full flex bg-gray-300 gap-4 p-4 mt-4 rounded-2xl'>
                    <div>
                      <Bookingimghistory placeid={Places}/>
                    </div>
                    <div>
                      <h2>Booked name : {place.name}</h2>
                      <h2>Booked Dates : {dateWithinTime} to {dateWithoutTime}</h2>
                      <h2>Booked Price : ${place.price}</h2>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
      </div>
    </div>
  );
}

export default Bookinghistory;
