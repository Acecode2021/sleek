import React from 'react';
import { Link } from 'react-router-dom';
import { BRAND_LOGOS } from '../data/vehicles';

export default function DealershipIntroduction() {
  return (
    <>
      {/* WELCOME TO SLEEK AUTO (#F0F0F0) */}
      <section className="welcome-section" aria-label="Welcome to Sleek Auto">
        <div className="container welcome-grid">
          <div>
            <h2 className="welcome-heading">WELCOME TO SLEEK AUTO</h2>
            <p className="welcome-body">
              We strive to do all we can to get you the car that you’re looking for. As your
              trusted used car dealership in your area, we pride ourselves on being a cut above the
              rest with our unrelenting commitment to customer service. Our dealership is founded on
              trust, integrity, and respect. We are proud to offer these values in our sales and
              business practices , so our customers keep coming back. Our sales team can help you
              get acquainted with our wide range of inventory, and help you narrow down your choices
              to find your perfect RIDE!
            </p>
          </div>
          <div className="welcome-truck-wrap">
            <img
              src="/images/welcome-truck.png"
              alt="Black GMC Sierra Denali HD Dually Pickup Truck"
              className="welcome-truck-img"
            />
          </div>
        </div>
      </section>

      {/* BRANDS WE CARRY */}
      <section className="brands-section" aria-label="Brands We Carry">
        <div className="container">
          <h2 className="brands-heading">BRANDS WE CARRY</h2>
          <div className="brands-grid">
            {BRAND_LOGOS.map((brand) => (
              <Link
                key={brand.name}
                to={`/inventory?make=${encodeURIComponent(brand.name)}`}
                className="brand-tile"
                title={`Browse ${brand.name} vehicles`}
              >
                <img
                  src={brand.image}
                  alt={brand.name}
                  style={{ maxHeight: `${brand.maxHeight}px` }}
                />
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
