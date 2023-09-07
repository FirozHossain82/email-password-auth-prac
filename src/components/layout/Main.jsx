import React from "react";
import Header from "../Header/Header.jsx";
import { Outlet } from "react-router-dom";

const Main = () => {
  return (
    <div className="">
      <div className="bg-cyan-300">
        <Header></Header>
      </div>
      <Outlet></Outlet>
    </div>
  );
};

export default Main;
