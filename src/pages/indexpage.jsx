import React, { useState, useEffect } from 'react';
import layout from '../layout';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Indexpage = () => {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    axios.get('/places-home').then((response) => {
      setPlaces(response.data);
    });
  }, []);

  return (
    <div className="grid my-8  grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-8">
      {places.length > 0 && places.map((place)=> (
        <Link to={`/place/${place._id}`} className='bg-gray-200 p-4 rounded-2xl aspect-square  '>
          <div className='w-54 h-34'>
            <img src={'http://localhost:4000/uplodes/'+ place.image[0]} className='rounded-2xl  '></img>
          </div>
          <h2 className='text-bold mt-1'>{place.address}</h2>
          <h3 className='text-sm text-gray-600 mt-1'>{place.title}</h3>
          <h4 className='mt-2'>${place.price} Per Night</h4>
        </Link>
      ))}
    </div>
  );
};

export default Indexpage;
