import React from "react";
import { Link } from "react-router-dom";
import NavBar from "../NavBar/NavBar";

const Layout = ({ children }) => {
  return (
    <div>
      <NavBar />
      <div style={{
        maxWidth:"1200px",
        margin:"0px auto",
        padding:"0px 20px"
      }}>
      {children}
      </div>
   
    </div>
  );
};

export default Layout;
