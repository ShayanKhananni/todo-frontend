import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom';

const AuthRoutes = () => {

  const {user} = useSelector((state) =>state.auth);
  const session = useSelector((state)=>state.session);

    if(user)
    {
      return <>
      <Navigate to="/"/>; 
      </> 
    }
    else
    {
      return <Outlet/>
    }

}

export default AuthRoutes
