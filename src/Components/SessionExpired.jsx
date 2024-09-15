import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { authActions } from '../Store/auth-slice';


const SessionExpired = () => {

  const dispatch = useDispatch();
  const [counter, setCounter] = useState(5);

  useEffect(() => {
    const interval = setInterval(() => {
      setCounter(prevCounter => {
        if (prevCounter > 0) {
          return prevCounter - 1;
        } else {
          dispatch(authActions.signOut());
          clearInterval(interval); 
          return prevCounter;
        }
      });
    }, 1000);

    return () => clearInterval(interval); 
  }, [dispatch]);


  return (
    <>
    <div className='text-center my-60 text-white w-100 h-100  bg-red-600'>

    <h1 className='text-center text-5xl my-4 font-bold' >Session Expired!! Go To Login Page,</h1>

    <h1 className='text-3xl' >Navigating to Login Page in {counter} </h1>

    </div>
    </>
    
  )
}

export default SessionExpired
