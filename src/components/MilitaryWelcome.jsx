import React from 'react';

export default function MilitaryWelcome() {
  return (
    <section className="military-section" aria-label="Military Friendly Financing Announcement">
      <img
        src="/images/military-rays-right.jpg"
        alt=""
        aria-hidden="true"
        className="military-bg-right-rays"
      />
      <img
        src="/images/military-flag-left.png"
        alt="American Flag"
        className="military-flag-img"
      />
      <div className="container military-inner">
        <div className="military-copy-box">
          <h2 className="military-heading">WELCOME ALL MILITARY!</h2>
          <p className="military-subtext">
            We are familiar with buying out of state, Navy Federal Credit Union, USAA, and other
            associated military friendly financial institutions!
          </p>
        </div>
      </div>
    </section>
  );
}
