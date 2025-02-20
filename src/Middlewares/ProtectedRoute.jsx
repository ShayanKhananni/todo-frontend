import React from "react";
import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

const ProtectedRoute = () => {
  const { user } = useSelector((state) => state.auth);
  
return user ? (
  <>
    <Outlet />
  </>
) : (
  <Navigate to="/signin" replace />
);


};

export default ProtectedRoute;
