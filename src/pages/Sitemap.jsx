import React from 'react';
import { Link } from 'react-router-dom';

export default function Sitemap() {
  return (
    <div>
      <div className="page-title-band">
        <div className="container">
          <h1 className="page-main-heading">SITEMAP</h1>
        </div>
      </div>

      <section className="legal-page-section">
        <div className="container legal-content">
          <p>
            <Link to="/" style={{ fontWeight: 700, fontSize: 16, textDecoration: 'underline' }}>
              Home
            </Link>
          </p>
          <ul>
            <li>
              <Link to="/inventory" style={{ textDecoration: 'underline' }}>
                Inventory
              </Link>
            </li>
            <li>
              <Link to="/vehicle-special" style={{ textDecoration: 'underline' }}>
                Special Offer
              </Link>
            </li>
            <li>
              <Link to="/car-finder" style={{ textDecoration: 'underline' }}>
                Car Finder
              </Link>
            </li>
            <li>
              <Link to="/apply-online" style={{ textDecoration: 'underline' }}>
                Apply Online
              </Link>
            </li>
            <li>
              <Link to="/about-us" style={{ textDecoration: 'underline' }}>
                About Us
              </Link>
            </li>
            <li>
              <Link to="/contact-us" style={{ textDecoration: 'underline' }}>
                Contact Us
              </Link>
            </li>
            <li>
              <Link to="/privacy-policy" style={{ textDecoration: 'underline' }}>
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link to="/terms-of-use" style={{ textDecoration: 'underline' }}>
                Terms of Use
              </Link>
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}
