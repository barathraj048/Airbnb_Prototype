import { Outlet } from "react-router-dom"
import Header from "./Header"
export default ()=> {
   return(
      // flex-col min-h-screen to make elements as a fli=ex col
      <div className='py-4 px-8 flex-col min-h-screen '>
         <Header/>
         <Outlet/>
      </div>
   )
}