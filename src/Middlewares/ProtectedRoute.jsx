import React from "react";
import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";
import Header from "../Components/Header";

const ProtectedRoute = () => {
  const { user } = useSelector((state) => state.auth);
  
return user ? (
  <>
    <Header/>
    <Outlet/>
  </>
) : (
  <Navigate to="/signin" replace />
);


};

export default ProtectedRoute;
