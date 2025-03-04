import React, { act } from "react";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../firebase";
import { useDispatch } from "react-redux";
import { authActions } from "../Store/auth-slice";
import { FaGoogle } from "react-icons/fa";
import { useGoogleAuthMutation } from "../Store/auth-api-slice";
import { toast } from "react-toastify";
import Spinner from "./Spinner";

function OAuth() {
  const dispatch = useDispatch();
  const [googleAuth, { isLoading }] = useGoogleAuthMutation();

  const handleGoogleAuth = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);
      const { email, photoURL, displayName } = result.user;
      const user = { email, photoURL, displayName };
      const response = await googleAuth(user).unwrap();
      dispatch(authActions.setUser(response));
      toast.success("Login successful!");
    } catch (err) {
      toast.error(err?.data?.message || "Sign-in failed. Please try again.");
    }
  };

  return (
    <>
      <button
        onClick={handleGoogleAuth}
        class=" mt-3 font-primary flex gap-2 items-center justify-center w-full  font-semibold text-white bg-red-700 border-0 py-2 px-8 focus:outline-none hover:bg-blue-500 rounded text-md"
        type="button"
      >
        {isLoading ? (
          <Spinner />
        ) : (
          <>
            {" "}
            <FaGoogle />  Continue With Google 
          </>
        )}
      </button>
    </>
  );
}

export default OAuth;
