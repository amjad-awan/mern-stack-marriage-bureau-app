import React from "react";
import { Link, useNavigate, useNavigation } from "react-router-dom";
import "./style.css";
import { Button, FormGroup, Input } from "reactstrap";
import { useGrooms } from "../../context/groomContext";
const NavBar = () => {
  const {setParams} =useGrooms()
    const navigate = useNavigate();
    
    return (
    <div className="__nav-wrapper">
      <div className="__nav-wrapper-logo">Marriage</div>
      <div className="_nav_wrapper-item">
        <Button color="primary" onClick={()=>navigate("/")}>Home</Button>
      </div>
         <div className="_nav_wrapper-item  ms-auto">
        <Button color="primary" onClick={()=>navigate("/add-new")}>Add new</Button>
      </div>
    </div>
  );
};

export default NavBar;
