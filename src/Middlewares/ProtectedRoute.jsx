import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import Header from "../Components/Header";
import { useDispatch, useSelector } from "react-redux";
import RefreshToken from "./RefreshToken";
import { useEffect } from "react";
import { initError } from "../utils/utils";
import { sessionActions } from "../Store/session-slice";
import SessionExpired from "../Components/SessionExpired";
import Container from "../Components/Container";

const ProtectedRoute = () => {
  const { user } = useSelector((state) => state.auth);
  const session = useSelector((state) => state.session);
  const dispatch = useDispatch();

  const url = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await fetch(`${url}/user/check-session`, {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          const errData = await response.json();
          initError(errData.message, errData.statusCode);
        }

        const data = await response.json();
        console.log(data);
      } catch (err) {
        if (
          err.message === "Access Denied no token Provided" &&
          err.code === 404
        ) {
          dispatch(sessionActions.sessionExpired());
        } else {
          console.log(err.message);
        }
      }
    };

    checkSession();

    return () => {};
  }, []);

  if (!session && user) {
    return <SessionExpired />;
    // console.log('check cookie');
  } else if (user && session) {
    return (
      <>
        <Container>
          <Header />
          <Outlet />
          {/* <RefreshToken /> */}
        </Container>
      </>
    );
  } else {
    return <Navigate to="/signup" />;
  }
};

export default ProtectedRoute;
