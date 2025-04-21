import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import useAuth from '../hooks/AuthHook';

const PrivateRoute = () => {
  const { isLoggedIn, checkStatus } = useAuth();

  if (checkStatus) return <div>Loading...</div>;

  return isLoggedIn ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
