import React from "react";
import "./Footer.css";
import logo from "../Assets/logo.png";
import insta_icon from "../Assets/instagram_icon.png";
import pinterest_icon from "../Assets/pintester_icon.png";
import whatsapp_icon from "../Assets/whatsapp_icon.png";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="footer">
      <Link to="/">
        <div className="footer-logo">
          <img src={logo} alt="shopping" />
          <p>Shopping</p>
        </div>
      </Link>

      <ul className="footer-links">
        <li>Company</li>
        <li>Products</li>

        <li>Offices</li>

        <li>About</li>

        <li>Contact</li>
      </ul>
      <div className="footer-social-icons">
        <div className="footer-icons-container">
          <img src={insta_icon} alt="Instagram-icon" />
        </div>
        <div className="footer-icons-container">
          <img src={pinterest_icon} alt="pinterest-icon" />
        </div>

        <div className="footer-icons-container">
          <img src={whatsapp_icon} alt="whatsapp-icon" />
        </div>
      </div>
      <div className="footer-copyright">
        <hr />
        <p>Copyright @2025-All Rights Reserved</p>
      </div>
    </div>
  );
};

export default Footer;
