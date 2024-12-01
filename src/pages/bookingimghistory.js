import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

function Bookingimghistory({ placeid }) {
   const [bookedPlace, setbookedPlace] = useState(null);

   useEffect(() => {
      const {data}= axios.get('/image-booked', { params: { placeid } })
         .then(() => {
            setbookedPlace(data);
         })
         .catch((error) => {
            console.error('Error fetching booked place:', error);
         });
   }, [placeid]);
   const redirecttoPlace= ()=>{
      return(
         <Navigate to={'/place/'+ bookedPlace._id}/> 
      )
   } 

   return (
      <div>
         {bookedPlace && (
            <div>
               <img onClick={redirecttoPlace} className='h-32 w-32 ' src={'http://localhost:4000/uplodes/' + bookedPlace.image[0]}/>
            </div>
         )}
      </div>
   );
}

export default Bookingimghistory;
