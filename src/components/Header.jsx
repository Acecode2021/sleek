import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import Navigation from './Navigation';
import { DEALERSHIP_INFO } from '../data/vehicles';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [quickQuery, setQuickQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleQuickSearch = (e) => {
    e.preventDefault();
    const q = quickQuery.trim();
    setSearchOpen(false);
    navigate(q ? `/inventory?q=${encodeURIComponent(q)}` : '/inventory');
  };

  return (
    <header className={`site-header-wrapper ${scrolled ? 'is-scrolled' : ''}`}>
      {/* Top Utility Bar (#ECECEC) */}
      <div className="top-contact-bar">
        <div className="container top-contact-inner">
          <div className="top-contact-item top-contact-item--left">
            <span className="top-text-prefix">TEXT:</span>
            <a href={DEALERSHIP_INFO.textHref} className="top-phone-link">
              {DEALERSHIP_INFO.textDisplay}
            </a>
          </div>

          <div className="top-contact-item">
            <svg
              className="top-icon-svg"
              width="19"
              height="19"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24c1.12.37 2.33.57 3.58.57a1 1 0 011 1V20a1 1 0 01-1 1C10.61 21 3 13.39 3 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.46.57 3.58a1 1 0 01-.25 1.01l-2.2 2.2z" />
            </svg>
            <a href={DEALERSHIP_INFO.phoneHref} className="top-phone-link">
              {DEALERSHIP_INFO.phoneDisplay}
            </a>
          </div>

        </div>
      </div>

      {/* Main White Navigation Bar */}
      <div className="main-nav-bar">
        <div className="container main-nav-inner">
          <Link to="/" className="header-logo-link" aria-label="Sleek Auto Sales Inc. Home">
            <img
              src="/images/logo.png"
              alt="Sleek Auto Sales Inc. Wilmington NC"
              className="header-logo-img"
            />
          </Link>

          <Navigation onToggleSearch={() => setSearchOpen((prev) => !prev)} />

          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <button
              type="button"
              className="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle mobile navigation menu"
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {searchOpen && (
          <div className="header-search-popover">
            <div className="container">
              <form className="header-search-form" onSubmit={handleQuickSearch}>
                <input
                  type="text"
                  className="header-search-input"
                  placeholder="Search by Year, Make, Model, Trim, Stock #, or VIN..."
                  value={quickQuery}
                  onChange={(e) => setQuickQuery(e.target.value)}
                  autoFocus
                />
                <button type="submit" className="header-search-submit">
                  Search
                </button>
              </form>
            </div>
          </div>
        )}
      </div>

      <Navigation mobileOpen={mobileMenuOpen} onCloseMobile={() => setMobileMenuOpen(false)} />
    </header>
  );
}
