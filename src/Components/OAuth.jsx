import React from "react";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../firebase";
import { useDispatch } from "react-redux";
import { initError } from "../utils/utils";
import { useNavigate } from "react-router-dom";
import { authActions } from "../Store/auth-slice";
import { sessionActions } from "../Store/session-slice";
import { FaGoogle } from "react-icons/fa";

function OAuth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const url = import.meta.env.VITE_BASE_URL;
  const handleGoogleAuth = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);
      const { email, photoURL, displayName } = result.user;
      const user = { email, photoURL, displayName };
      console.log(user);

      const response = await fetch(`${url}/auth/google/signin`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      if (!response.ok) {
        const errData = await response.json();
        initError(errData.message, errData.statusCode);
      }

      const data = await response.json();
      console.log(data);
      console.log("Hello Wolrd");
      dispatch(sessionActions.sessionActive());
      dispatch(authActions.signUser(data));
      navigate("/");
    } catch (err) {
      console.log(err);
      dispatch(authActions.signingFailure({ message: err.message }));
    }
  };

  return (
    <>
      <button
        onClick={handleGoogleAuth}
        class=" mt-3 font-primary flex gap-2 items-center justify-center w-full  font-semibold text-white bg-red-700 border-0 py-2 px-8 focus:outline-none hover:bg-blue-500 rounded text-md"
        type="button"
      >
        <FaGoogle />
        Continue With Google
      </button>
    </>
  );
}

export default OAuth;
