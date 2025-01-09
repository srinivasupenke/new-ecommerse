import React from "react";
import "./Navbar.css";
import nav_logo from "../../assets/nav-logo.svg";
import navProfile from "../../assets/nav-profile.svg";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="navbar">
      <Link to="/">
        <img src={nav_logo} alt="" className="nav-logo" />
      </Link>

      <img src={navProfile} alt="" className="nav-profile" />
    </div>
  );
};

export default Navbar;
