import React, { useEffect, useMemo, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import VehicleCard from './VehicleCard';
import { FEATURED_STOCK_ORDER, VEHICLES } from '../data/vehicles';

function getItemsPerView(width) {
  if (width >= 1260) return 6;
  if (width >= 860) return 4;
  if (width >= 540) return 2;
  return 1;
}

export default function FeaturedInventory() {
  const orderedVehicles = useMemo(() => {
    const map = new Map(VEHICLES.map((v) => [v.stockNumber, v]));
    return FEATURED_STOCK_ORDER.map((stock) => map.get(stock)).filter(Boolean);
  }, []);

  const [itemsPerView, setItemsPerView] = useState(() =>
    typeof window !== 'undefined' ? getItemsPerView(window.innerWidth) : 6
  );
  const [startIdx, setStartIdx] = useState(0);

  useEffect(() => {
    const onResize = () => setItemsPerView(getItemsPerView(window.innerWidth));
    window.addEventListener('resize', onResize, { passive: true });
    onResize();
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const visibleItems = useMemo(() => {
    const total = orderedVehicles.length;
    return Array.from(
      { length: itemsPerView },
      (_, idx) => orderedVehicles[(startIdx + idx) % total]
    );
  }, [orderedVehicles, startIdx, itemsPerView]);

  const handlePrev = () => {
    setStartIdx((prev) => (prev - 1 + orderedVehicles.length) % orderedVehicles.length);
  };

  const handleNext = () => {
    setStartIdx((prev) => (prev + 1) % orderedVehicles.length);
  };

  return (
    <section className="featured-section" aria-label="Featured Special Inventory">
      <div className="container">
        <h2 className="featured-heading">FEATURED SPECIAL</h2>
        <div className="featured-carousel-wrap">
          <button
            type="button"
            className="featured-nav-btn featured-nav-btn--prev"
            onClick={handlePrev}
            aria-label="Previous featured vehicle"
          >
            <ChevronLeft size={16} strokeWidth={2.6} />
          </button>

          <div
            className="featured-cards-grid"
            style={{ gridTemplateColumns: `repeat(${itemsPerView}, minmax(0, 1fr))` }}
          >
            {visibleItems.map((vehicle) => (
              <VehicleCard key={vehicle.stockNumber} vehicle={vehicle} variant="featured" />
            ))}
          </div>

          <button
            type="button"
            className="featured-nav-btn featured-nav-btn--next"
            onClick={handleNext}
            aria-label="Next featured vehicle"
          >
            <ChevronRight size={16} strokeWidth={2.6} />
          </button>
        </div>
      </div>
    </section>
  );
}
