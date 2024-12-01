import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Accomedationform from './accomedationform';
import axios from 'axios';

function Accomendation() {
  const { action } = useParams();
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    axios.get('/places')
      .then(response => {
        setPlaces(response.data);
        console.log(response.data);
      })
      .catch(error => {
        console.error('Error fetching places:', error);
      });
  }, []);

  return (
    <div>
      <div>
        <div>
          {places && places.map((place) => (
            <div className='bg-gray-300 m-4 rounded-2xl p-2 flex' key={place._id}>
              <div className='flex w-32 h-32 bg-gray-500 rounded-3xl mr-2 shrink-0'>
                <img className='object-cover' src={`http://localhost:4000/uplodes/${place.image[0]}`}  />
              </div>
              <Link to={`/account/accomendation/${place._id}`} className='grow-0 shrink'>
                <h2 className='text-xl'>{place.title}</h2>
                <p className='text-sm'>{place.description}</p>
              </Link>
            </div>
          ))}
        </div>
      </div>

      {!action && (
        <div className='text-center'>
          <Link to={'/account/accomendation/places'} className='bg-primary px-6 py-2 mt-4 text-white rounded-full inline-flex gap-1 '>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
            Add New place
          </Link>
        </div>
      )}

      {action === 'places' && <Accomedationform />}
    </div>
  );
}

export default Accomendation;
