import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import useAuth from '../hooks/AuthHook';

const AdminRoute = () => {
  const { isLoggedIn, checkStatus, user } = useAuth();

  if (checkStatus) return <div>Loading...</div>;

  
  return isLoggedIn && user?.isAdmin ? <Outlet /> : <Navigate to="/" />;
};

export default AdminRoute;
