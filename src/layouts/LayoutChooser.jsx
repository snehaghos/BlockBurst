import React from 'react';
import { Outlet } from 'react-router-dom';
import { useAuth } from '../Login/context/AuthProvider';
import { GuestLayout } from './GuestLayout';
import { AuthLayout } from './AuthLayout';

const LayoutChooser = () => {
    const { isAuthenticated } = useAuth(); 
    console.log("isAuthenticated in LayoutChooser:", isAuthenticated); 
    const Layout = isAuthenticated ? AuthLayout : GuestLayout;

    return <Layout><Outlet /></Layout>;
};

export default LayoutChooser;
