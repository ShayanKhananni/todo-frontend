import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { initError } from "../utils/utils";
import logo from '../assets/Logo.png';
import { authActions } from "../Store/auth-slice";

const Header = () => {
  
const {user} = useSelector((state) => state.auth);
const dispatch = useDispatch();
const {photoURL} = user

const url = import.meta.env.VITE_BASE_URL;


const logout = async () => {
  try {
    const response = await fetch(`${url}/user/logout`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errData = response.json();
      initError(errData.message, errData.statusCode);
    }
    dispatch(authActions.signOut());
  } catch (err) {
    console.log(err);
  }
  const data = await response.json();
  console.log(data);
  dispatch(userActions.signOut());
};



  return (
    <>
      <nav class="bg-white shadow-customPositive py-2">
        <div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-5 lg-py-20 ">
          <div class="relative flex  items-center ">
            <div class="flex flex-1 items-center  justify-between lg:justify-between ">

              <div class="flex flex-shrink-0 items-center">
                <img
                  class="h-10 w-35"
                  src={logo}
                  alt="Your Company"
                />
              </div>

              <div class="hidden sm:ml-6 lg:block sm:hidden">
                <div class="flex space-x-4 ">
                  
                  <Link
                    to="/profile"
                    class="rounded-md px-3 py-2 text-lg font-medium text-white hover:bg-gray-700 hover:text-white"
                  >
                    {" "}
                    Profile
                  </Link>
                </div>
              </div>

              <div className="flex space-x-2"  >
                <img src={photoURL} alt="" className="w-10 h-10 rounded-full" />
                <button
                  onClick={() =>{logout()}}
                  className="border-0 outline-0 text-black text-lg"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile menu, show/hide based on menu state.  */}

      </nav>
    </>
  );
};

export default Header;
