import React, { useContext } from "react";
import { AuthContext } from "../../context/authContext";
import "./Navbar.css";
function Navbar() {
  const {user}=useContext(AuthContext)
  return (
    <div className="navbar">
    <div className="navContainer">
    <a href="/" style={{color:"inherit",textDecoration:"none"}}>
    <span className="logo">lamabooking</span>
    </a>
     {user ?(user.username): (<div className="navItems">
        <button className="navButton">Register</button>
        <button className="navButton">Login</button>
      </div>)}
    </div>
    </div>
  );
}

export default Navbar;
