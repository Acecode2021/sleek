import React from 'react';
import { Link } from 'react-router-dom';
import { DEALERSHIP_INFO } from '../data/vehicles';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-main">
        <div className="container">
          <div className="footer-columns">
            {/* Column 1: Logo */}
            <div>
              <Link to="/" aria-label="Sleek Auto Sales Inc. Home">
                <img
                  src="/images/logo.png"
                  alt="Sleek Auto Sales Inc. Wilmington NC"
                  className="footer-logo-img"
                />
              </Link>
            </div>

            {/* Column 2: Contact Us */}
            <div>
              <h3 className="footer-col-heading">CONTACT US</h3>
              <div className="footer-contact-row">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  style={{ marginTop: 3, flexShrink: 0 }}
                  aria-hidden="true"
                >
                  <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24c1.12.37 2.33.57 3.58.57a1 1 0 011 1V20a1 1 0 01-1 1C10.61 21 3 13.39 3 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.46.57 3.58a1 1 0 01-.25 1.01l-2.2 2.2z" />
                </svg>
                <div>
                  <div>
                    PHONE:{' '}
                    <a href={DEALERSHIP_INFO.phoneHref}>{DEALERSHIP_INFO.phoneDisplay}</a>
                  </div>
                  <div>
                    TEXT:{' '}
                    <a href={DEALERSHIP_INFO.textHref}>{DEALERSHIP_INFO.textDisplay}</a>
                  </div>
                </div>
              </div>
            </div>

            {/* Column 3: Store Hours */}
            <div>
              <h3 className="footer-col-heading">STORE HOURS</h3>
              <ul className="footer-hours-list">
                {DEALERSHIP_INFO.hoursSummary.map((row) => (
                  <li key={row.days} className="footer-hours-item">
                    <span className="footer-hours-days">{row.days}</span>
                    <span>{row.time}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 4: Follow Us (Facebook + Google Storefront Profile Icon matching Reference) */}
            <div>
              <h3 className="footer-col-heading">FOLLOW US</h3>
              <div className="footer-social-row">
                <a
                  href="#facebook"
                  onClick={(e) => {
                    e.preventDefault();
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="footer-social-circle"
                  aria-label="Sleek Auto Sales on Facebook"
                  title="Facebook"
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M14 13.5h2.5l1-4H14v-2c0-1.03 0-2 2-2h1.5V2.14c-.326-.043-1.557-.14-2.857-.14C11.928 2 10 3.657 10 6.7v2.8H7v4h3V22h4v-8.5z" />
                  </svg>
                </a>
                <a
                  href="#google-business"
                  onClick={(e) => {
                    e.preventDefault();
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="footer-social-circle"
                  aria-label="Sleek Auto Sales Storefront Profile"
                  title="Google Business Profile"
                >
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M3 9l1.5-5h15L21 9" />
                    <path d="M3 9a3 3 0 0 0 6 0 3 3 0 0 0 6 0 3 3 0 0 0 6 0" />
                    <path d="M5 12v8h14v-8" />
                    <path d="M14 20v-4h3v4" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Horizontal Footer Navigation Links */}
          <ul className="footer-bottom-links">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/inventory">Inventory</Link>
            </li>
            <li>
              <Link to="/car-finder">Car Finder</Link>
            </li>
            <li>
              <Link to="/apply-online">Apply Online</Link>
            </li>
            <li>
              <Link to="/about-us">About Us</Link>
            </li>
            <li>
              <Link to="/contact-us">Contact Us</Link>
            </li>
            <li>
              <Link to="/privacy-policy">Privacy Policy</Link>
            </li>
            <li>
              <Link to="/sitemap">Sitemap</Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Copyright Bar (#999999) */}
      <div className="footer-copyright-bar">
        <div className="footer-copyright-inner">
          <div>
            © 2026 Sleek Auto Sales Inc. | Website by <strong>DealerCenter</strong>
          </div>
          <div className="footer-legal-links">
            <Link to="/privacy-policy">Privacy Policy</Link>
            <span>|</span>
            <Link to="/terms-of-use">Terms of Use</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
