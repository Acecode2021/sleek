import React, { useEffect } from 'react';
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Inventory from './pages/Inventory';
import VehicleDetail from './pages/VehicleDetail';
import CarFinder from './pages/CarFinder';
import ApplyOnline from './pages/ApplyOnline';
import AboutUs from './pages/AboutUs';
import ContactUs from './pages/ContactUs';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfUse from './pages/TermsOfUse';
import Sitemap from './pages/Sitemap';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="site-shell">
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/inventory" element={<Inventory />} />
            <Route path="/inventory/page-2" element={<Inventory />} />
            <Route path="/inventory/:makeSlug/:modelSlug/:stock" element={<VehicleDetail />} />
            <Route path="/inventory/vehicle/:stock" element={<VehicleDetail />} />
            <Route path="/inventory/:makeSlug" element={<Inventory />} />
            <Route path="/vehicle-special" element={<Inventory specialOnly />} />
            <Route path="/car-finder" element={<CarFinder />} />
            <Route path="/apply-online" element={<ApplyOnline />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/contact-us" element={<ContactUs />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-of-use" element={<TermsOfUse />} />
            <Route path="/sitemap" element={<Sitemap />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
