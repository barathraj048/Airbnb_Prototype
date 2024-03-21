import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Indexpage from "./pages/indexpage";
import Loginpage from "./pages/loginpage"
import Layout from './layout';
import Register from "./pages/regester"
import axios from 'axios';
import { UserContextProvider } from './userContext';
import Accountpage from "./pages/accountpage"
import Accomedationform from './pages/accomedationform';
import Place from './pages/place';
import Bookinghistory from './pages/bookinghistory';
import Search from './searchheader.jsx';
import SearchLayout from './SearchLayout';

axios.defaults.baseURL='http://localhost:4000'
//axios.defaults.withCredentials=true is used to shre the cookies between routes
axios.defaults.withCredentials=true;

function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path='/' element={<Layout/>}>
          <Route index element={<Indexpage />} />
          <Route path="/login" element={<Loginpage/>} />
          <Route path='/regester' element={<Register/>}/>
          <Route path='/account/:subpage?' element={<Accountpage/>}/>
          <Route path='/account/:subpage/:action' element={<Accountpage/>}/>
          <Route path='/account/accomendation/:id' element={<Accomedationform/>}/>
          <Route path='/account/accomendation/places' element={<Accomedationform/>}/>
          <Route path='/place/:id' element={<Place/>}/>
          <Route path='/account/bookings/:id' element={<Bookinghistory/>}/>
          <Route path='/account/bookings' element={<Bookinghistory/>}/>
        </Route>
        <Route path='/' element={<SearchLayout/>}>
          <Route path='/search' element={<Search/>}/>
        </Route>
      </Routes>
    </UserContextProvider>

  );
}

export default App;
