import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import logo from "../assets/Logo.png";
import { FaCaretDown } from "react-icons/fa";
import DropDown from "./Todo-Comps/DropDown";


const Header = () => {
  const { user } = useSelector((state) => state.auth);
  const { photoURL } = user;
  const [dropDownState, setDropDown] = useState(false);


  return (
    <>
      <nav class="bg-white shadow-customPositive py-2">
        <div class="mx-auto max-w-7xl px-7 sm:px-16 lg:px-20 lg-py-22 ">
          <div class="relative flex  items-center ">
            <div class="flex flex-1 items-center  justify-between lg:justify-between ">
              <div class="flex flex-shrink-0 items-center">
                <Link to='/' >
                <img class="h-10 w-35" src={logo} alt="Your Company" />
                </Link>
              </div>

              <div className="flex space-x-2">
                <Link to="/profile">
                  <img
                    src={photoURL}
                    alt=""
                    className="w-10 h-10 rounded-full"
                  />
                </Link>

                <button
                  onClick={() => {
                    setDropDown(!dropDownState);
                  }}
                >
                  <FaCaretDown className="mt-2 cursor-pointer" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {dropDownState ? <DropDown  /> : null}

      </nav>
    </>
  );
};

export default Header;
