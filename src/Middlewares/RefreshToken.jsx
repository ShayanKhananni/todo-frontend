import { useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';

const RefreshToken = () => {
  const cookieReseter = useRef(null); 
  const resetTime = import.meta.env.VITE_COOKIE_RESET_TIME;
  const {_id} = useSelector((state)=>state.auth.user);

  const resetCookie = async () => {
    const response = await fetch("http://localhost:3000/api/user/refresh-session", {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify({ id: _id }),
      headers: {
        'Content-Type': "application/json"
      }
    });

    const data = await response.json()
    console.log(data);
  };

  useEffect(() => {
    cookieReseter.current = setInterval(resetCookie,resetTime);
    return () => {
      clearInterval(cookieReseter.current);
    };
  }, []); 


  return null; 
};


export default RefreshToken;
