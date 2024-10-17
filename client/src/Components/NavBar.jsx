// components/NavBar.js
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/images/logo.png";
import { SlMagnifier } from "react-icons/sl";
import { useSelector } from "react-redux";
import CustomLink from "./CustomLink";
import SearchBar from "./SearchBar";

const NavBar = () => {
  const isLogin = useSelector((state) => state.auth.isLogin);
  const userDetails = useSelector((state) => state.auth.userDetails);
  const location = useLocation();

  const showSearchBar =
    location.pathname === "/login" || location.pathname === "/signUp";

  return (
    <nav className="shadow-lg p-4 bg-white  fixed w-full top-0 left-0 z-50 ">
      <ul className="flex  justify-between items-center space-x-6 text-white">
        <li>
          <Link to="/" className="hover:text-gray-300">
            <img src={logo} className="h-8 w-full" alt="Logo" />
          </Link>
        </li>
        <li>
          {showSearchBar ? null : (
            <>
             
              <SearchBar />
            </>
          )}
        </li>
        <li>
          {isLogin ? (
            <Link to="/dashboard">
              <img
                src={userDetails.profilePicture}
                className="rounded-full h-9 w-9"
                alt="profile_picture"
              />
            </Link>
          ) : (
            // <Link to="/login">Login</Link>
            <CustomLink
              title={location.pathname === "/login" ? "SignUp" : "Login"}
              NavigateTo={location.pathname === "/login" ? "/signUp" : "/login"}
            />
          )}
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
