import React from 'react'

function featuresinaddSection({onChange,Selected}) {
  const handileClick = (event) => {
    const { checked, value } = event.target;

    if (checked) {
      onChange([...Selected, value]);
    } else {
      onChange(Selected.filter((selectedFeature) => selectedFeature !== value));
    }
  }
  return (
    <div>
       <div className='gap-2 grid grid-cols-2 md:grid-cols- lg:grid-cols-4'>
            <label className='flex border gap-1 items-center py-2 pl-4 gap-2 rounded-xl'>
              <input type='checkbox' checked={Selected.includes('wifi')} value={'wifi'} onChange={handileClick}/>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path strokeLinecap="round" stroke-linejoin="round" d="M8.288 15.038a5.25 5.25 0 0 1 7.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 0 1 1.06 0Z" />
              </svg>
              <span>Wifi</span>
            </label>
            <label className='flex border gap-1 items-center py-2 pl-4 gap-2 rounded-xl'>
              <input type='checkbox' checked={Selected.includes('Parking')} value={'Parking'} onChange={handileClick}/>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path strokeLinecap="round" stroke-linejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
              </svg>
              <span>Parking</span>
            </label>
            <label className='flex border gap-1 items-center py-2 pl-4 gap-2 rounded-xl'>
              <input type='checkbox' checked={Selected.includes('Hotel')} value={'Hotel'} onChange={handileClick}/>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path strokeLinecap="round" stroke-linejoin="round" d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205 3 1m1.5.5-1.5-.5M6.75 7.364V3h-3v18m3-13.636 10.5-3.819" />
              </svg>
              <span>Hotel</span>
            </label>
            <label className='flex border gap-1 items-center py-2 pl-4 gap-2 rounded-xl'>
              <input type='checkbox' checked={Selected.includes('Tv')} value={'Tv'} onChange={handileClick}/>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path strokeLinecap="round" stroke-linejoin="round" d="M6 20.25h12m-7.5-3v3m3-3v3m-10.125-3h17.25c.621 0 1.125-.504 1.125-1.125V4.875c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125Z" />
              </svg>
              <span>Tv</span>
            </label>
            <label className='flex border gap-1 items-center py-2 pl-4 gap-2 rounded-xl'>
              <input type='checkbox' checked={Selected.includes('Pets')} value={'Pets'} onChange={handileClick}/>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path strokeLinecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
              </svg>
              <span>Pets</span>
            </label>
            <label className='flex border gap-1 items-center py-2 pl-4 gap-2 rounded-xl'>
              <input type='checkbox' checked={Selected.includes('Guide')} value={'Guide'} onChange={handileClick}/>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path strokeLinecap="round" stroke-linejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
              </svg>
              <span>Guide</span>
            </label>
            </div>
    </div>
  )
}

export default featuresinaddSection