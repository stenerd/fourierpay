import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
    const token = window.localStorage.getItem('bearer_token');
  return (
    !token ? <Outlet/> : <Navigate to="/dashboard"/>
  )
}

export default ProtectedRoute