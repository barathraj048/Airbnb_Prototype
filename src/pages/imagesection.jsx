import { useState } from "react";
import React from 'react';
import axios from "axios";

function Imagesection({photos,setphotos}) {
   const [existingphoto,setexistingphoto]=useState('');

   const addPhotoByLink = async (event) => {
    const { data: filename } = await axios.post('/add-photos-by-link', { link: existingphoto });
    setphotos((prev) => [...prev, filename.filename]); // Add only the filename to the array
    setexistingphoto('');
  };
  
  const uploadHandile = async (event) => {
    const photos = event.target.files;
    const data = new FormData();
    for (let i = 0; i < photos.length; i++) {
      data.append('photos', photos[i]);
      try {
        const { data: files } = await axios.post('/upload', data, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        console.log(data);
        setphotos((prev) => [...prev, files]); // Ensure that only the filename (string) is added to the array
        console.log('Upload successful', { data }); // Log success message if the upload is successful
      } catch (error) {
        console.error('Error uploading file:', error); // Log any errors that occur during the upload process
      }
    }
  };
  const deletefun=(filename)=> {
    setphotos([photos.filter(photo=> photo !==filename)])
  }
  
  return (
    <div>
      <div className=''>
              <input className='border p-2 rounded-2xl mb-2 max-w-4xl' value={existingphoto} onChange={(Event)=> {setexistingphoto(Event.target.value)}} placeholder='Add using link ......jpg'/>
              <button onClick={addPhotoByLink} className='bg-primary text-white mx-4 px-6 py-2 rounded-2xl'>Add photo</button>
            </div>

            <div className='grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3'>
              {photos.length > 0 && (
                photos.map((link) => (
                  <div className='gap-3 h-32 flex relative' key={link}>
                    {console.log(link)}
                    <img src={`http://localhost:4000/uplodes/${link}`} className='rounded-2xl w-full'></img>
                    <div className="absolute bottom-1 right-1 bg-black text-white bg-opacity-50 py-1 px-2 flex -pb-1 rounded-2xl" onClick={()=>deletefun(link)}>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 items-center align-middle right-1" >
                        <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                      </svg>
                    </div>
                  </div>
                )) 
              )}
              <label className='flex justify-middle border p-14 rounded-2xl text-2xl'>
              <input type='file' multiple className='hidden' onChange={uploadHandile}/>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8">
                <path strokeLinecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
              </svg>
             Upload</label>
            </div>
    </div>
  );
}

export default Imagesection;
