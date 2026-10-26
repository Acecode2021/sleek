import React from 'react';
import { Link } from 'react-router-dom';

export default function Hero() {
  return (
    <section className="hero-banner" aria-label="Featured Dealership Banner">
      <img
        src="/images/hero-truck.jpg"
        alt="Sleek Auto Sales Lifted Black GMC Pickup Truck"
        className="hero-bg-image"
      />
      <div className="hero-overlay-layer">
        <div className="hero-text-box">
          <h1 className="hero-headline">
            <span className="hero-headline-red">TRUST IN US,</span>
            <span className="hero-headline-white">DRIVE IN STYLE!</span>
          </h1>
          <p className="hero-subtitle">
            Your Sure Road to Your Vehicle Needs! We are rewarded
            <br />
            with Lifelong Clients every day.
          </p>
          <div className="hero-cta-wrap">
            <Link to="/inventory" className="hero-cta-btn">
              BROWSE INVENTORY
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
