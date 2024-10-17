import React from "react";
import NavBar from "../Components/NavBar";
import { Outlet } from "react-router-dom";
// import Footer from "../Components/Footer";

function RootLayout() {
  return (
    <>

      <NavBar />
      <div className="mt-20 p-10">
        <Outlet />
      </div>
      <div className="relative bottom-0 w-full">{/* <Footer /> */}</div>
    </>
  );
}

export default RootLayout;
