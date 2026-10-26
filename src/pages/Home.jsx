import React from 'react';
import Hero from '../components/Hero';
import SpecialOffers from '../components/SpecialOffers';
import InventorySearch from '../components/InventorySearch';
import MilitaryWelcome from '../components/MilitaryWelcome';
import DealershipIntroduction from '../components/DealershipIntroduction';
import FeaturedInventory from '../components/FeaturedInventory';

export default function Home() {
  return (
    <>
      <Hero />
      <SpecialOffers />
      <InventorySearch />
      <MilitaryWelcome />
      <DealershipIntroduction />
      <FeaturedInventory />
    </>
  );
}
