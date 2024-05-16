import React from "react";
import { Link, useNavigate, useNavigation } from "react-router-dom";
import "./style.css";
import { Button, FormGroup, Input } from "reactstrap";
import { useGrooms } from "../../context/groomContext";
import { useAuth } from "../../context/authContext";
const NavBar = () => {
  const {setParams} =useGrooms()
    const navigate = useNavigate();
    const {auth, setAuth}=useAuth()
    console.log("auth", auth)

    const handleLogOut=()=>{
      setAuth({})
      localStorage.removeItem("user")
    }
    
    return (
    <div className="__nav-wrapper">
      <div className="__nav-wrapper-logo">Marriage</div>
      <div className="_nav_wrapper-item">
        <Link to="/" color="primary">Home</Link>
        {
          auth && auth.user? <Link to='' color="primary" className="ms-4" onClick={handleLogOut} >Logout</Link>:        <Link to='/zubair-bhai-website-auth' color="primary" className="ms-4" >Login</Link>

        }

       
      </div>
         <div className="_nav_wrapper-item  ms-auto">
        <Button color="primary" onClick={()=>navigate("/add-new")}>Add new</Button>
      </div>
    </div>
  );
};

export default NavBar;
