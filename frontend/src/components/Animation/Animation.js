// Animation.js
import React from 'react';
import './style.css';
import groom from '../../assets/images/groom.jpg'; // Path to your groom cartoon SVG

const Animation = () => {
  return (
    <div className="banner-container">
    <div className="banner-content">
      <img src={groom} alt="Groom Cartoon" className="groom-cartoon" />
      <div className="text-content">
        <h1>Find Your Perfect Match!</h1>
        <p>Join our marriage bureau today.</p>
      </div>
    </div>
  </div>
  );
};

export default Animation;
