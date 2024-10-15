import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import BlockBurst from '../blockBurst/BlockBurst';
import Home from '../blockBurst/Home';
import { GuestLayout } from '../layouts/GuestLayout';
import IndexHome from '../GuestInterface/IndexHome';


const Router = () => {
  return (

    <Routes>
      <Route path='/' element={<GuestLayout />}>
        <Route index element={<IndexHome />} />
        <Route path='start' element={<BlockBurst />} />

      </Route>
    </Routes>

  );
};

export default Router