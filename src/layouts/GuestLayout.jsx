import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../GuestInterface/components/Navbar'
// import Navbar from '../components/Frontend/Navbar'





export const GuestLayout = () => {
  return (
    <>
          <Navbar/>
            <Outlet/>
          

    </>
  )
}
