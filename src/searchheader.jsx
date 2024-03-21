import { useContext, useEffect, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { UserContext } from './userContext';
import axios from 'axios';
import Search from './pages/search';

export default () => {
  const { user } = useContext(UserContext);
  const [search, setSearch] = useState('');
  const [data, setData] = useState([]);
  
  useEffect(() => {
    if (search.trim() !== '') {
      axios.get(`/search?search=${search}`).then((response) => {
        setData(response.data);
      }).catch((error) => {
        console.error('Error fetching searched member:', error);
      });
    }
  }, [search]);
  return (
  <>
        <header className='flex justify-between'>
      <Link to={"/"} className='flex items-center gap-1'>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 -rotate-90">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
        </svg>
        <span className='font-bold text-xl p-1 '>airbnb</span>
      </Link>
      <div className='flex border rounded-full shadow-md'>
        <input
          type='text'
          placeholder="Loki's Small house"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
      </div>
      <Link to={user ? '/account' : '/login'} className='flex items-center border border-gray-300 rounded-full px-2 py-2 gap-2 shadow-md shadow-gray-100  border-gray-300 overflow-hidden'>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 margin-right: 6px">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
        </svg>
        <div className='text-white bg-gray-500 rounded-full ' >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 relative top-1 ">
            <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z" clipRule="evenodd" />
          </svg>
        </div>
        {(!!user) && (
          <>
            {user.Name}
          </>
        )}
      </Link>
    </header>
    <Search data={data}/>
  </>
  )
}
