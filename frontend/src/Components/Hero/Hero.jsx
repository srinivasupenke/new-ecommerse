import React from "react";
import hand_icon from "../Assets/hand_icon.png";
import hero_img from "../Assets/hero_image.png";
import arrow_icon from "../Assets/arrow.png";
import "./Hero.css";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="hero-section">
      <div className="hero-section-left">
        <h2>New Arrivals Only</h2>
        <div className="hero-hand-icon">
          <p>New</p>
          <img src={hand_icon} alt="Hero-hand-icon" />
        </div>
        <p>Collections</p>
        <p>for everyone</p>
        <Link to="/new-collection">
          <button className="hero-latest-button">
            <div>Latest Collection</div>
            <img src={arrow_icon} alt="arrow-icon" />
          </button>
        </Link>
      </div>
      <div className="hero-section-right">
        <img src={hero_img} alt="hero-image" />
      </div>
    </div>
  );
};

export default Hero;
