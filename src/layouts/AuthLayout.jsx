import React from 'react'
import { Outlet } from 'react-router-dom'
// import Nav from '../components/Backend/Nav'


// import {Navbar} from '../comps/backend/Navbar'



export const AuthLayout = () => {
  
  return (
    <>
  
          {/* <Nav/> */}
            <div className=''>
            

            <Outlet/>
            </div>
           
          
    </>
  )
}

