import React from 'react';
import { Link } from 'react-router-dom';

export default function SpecialOffers() {
  return (
    <section className="split-cta-bar" aria-label="Inventory Quick Links">
      <Link to="/inventory" className="split-cta-panel split-cta-panel--left">
        <strong>USED</strong>
        <span>INVENTORY</span>
      </Link>
      <Link to="/vehicle-special" className="split-cta-panel split-cta-panel--right">
        <strong>SPECIAL</strong>
        <span>OFFER</span>
      </Link>
    </section>
  );
}
