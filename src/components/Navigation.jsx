import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search } from 'lucide-react';

export const NAV_ITEMS = [
  { label: 'HOME', to: '/' },
  { label: 'INVENTORY', to: '/inventory' },
  { label: 'CAR FINDER', to: '/car-finder' },
  { label: 'APPLY ONLINE', to: '/apply-online' },
  { label: 'ABOUT US', to: '/about-us' },
  { label: 'CONTACT US', to: '/contact-us' },
];

export function isRouteActive(pathname, itemTo) {
  if (itemTo === '/') return pathname === '/';
  if (itemTo === '/inventory') {
    return pathname.startsWith('/inventory') || pathname.startsWith('/vehicle-special');
  }
  return pathname === itemTo || pathname.startsWith(`${itemTo}/`);
}

export default function Navigation({ onToggleSearch, mobileOpen, onCloseMobile }) {
  const { pathname } = useLocation();

  if (mobileOpen !== undefined) {
    if (!mobileOpen) return null;
    return (
      <nav className="mobile-drawer" aria-label="Mobile Navigation">
        <ul className="mobile-drawer-list">
          {NAV_ITEMS.map((item) => (
            <li key={item.to}>
              <Link
                to={item.to}
                className={`mobile-drawer-link ${isRouteActive(pathname, item.to) ? 'is-active' : ''}`}
                onClick={onCloseMobile}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    );
  }

  return (
    <nav className="desktop-nav" aria-label="Primary Navigation">
      <ul className="desktop-nav-list">
        {NAV_ITEMS.map((item) => (
          <li key={item.to}>
            <Link
              to={item.to}
              className={`desktop-nav-link ${isRouteActive(pathname, item.to) ? 'is-active' : ''}`}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
      <button
        type="button"
        className="header-search-btn"
        onClick={onToggleSearch}
        aria-label="Open keyword search"
        title="Search Inventory"
      >
        <Search size={15} strokeWidth={2.5} />
      </button>
    </nav>
  );
}
