import React, { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import VehicleCard from '../components/VehicleCard';
import {
  AutoCheckModal,
  AvailabilityModal,
  FeesDisclosureModal,
} from '../components/VehicleModals';
import { VEHICLES, formatCurrency } from '../data/vehicles';

export default function VehicleDetail() {
  const { stock } = useParams();

  const vehicle = useMemo(() => {
    const target = (stock || '').toUpperCase();
    return VEHICLES.find((v) => v.stockNumber.toUpperCase() === target) || VEHICLES[0];
  }, [stock]);

  const [photoIdx, setPhotoIdx] = useState(0);
  const [modalMode, setModalMode] = useState(null); // 'availability' | 'testdrive'
  const [autoCheckOpen, setAutoCheckOpen] = useState(false);
  const [feesOpen, setFeesOpen] = useState(false);

  // Interactive Loan Calculator state
  const [calcPrice, setCalcPrice] = useState(vehicle.price);
  const [downPayment, setDownPayment] = useState(Math.round(vehicle.price * 0.1));
  const [termMonths, setTermMonths] = useState(72);
  const [apr, setApr] = useState(6.99);

  useEffect(() => {
    setPhotoIdx(0);
    setCalcPrice(vehicle.price);
    setDownPayment(Math.round(vehicle.price * 0.1));
    try {
      localStorage.setItem('sleek_recent_stock', vehicle.stockNumber);
    } catch {
      // ignore storage errors
    }
  }, [vehicle]);

  const monthlyPayment = useMemo(() => {
    const principal = Math.max(0, Number(calcPrice || 0) - Number(downPayment || 0));
    const n = Math.max(1, Number(termMonths || 72));
    const r = Number(apr || 0) / 100 / 12;
    if (principal === 0) return 0;
    if (r === 0) return principal / n;
    return (principal * (r * Math.pow(1 + r, n))) / (Math.pow(1 + r, n) - 1);
  }, [calcPrice, downPayment, termMonths, apr]);

  const similarVehicles = useMemo(() => {
    const sameBody = VEHICLES.filter(
      (v) => v.stockNumber !== vehicle.stockNumber && v.bodyType === vehicle.bodyType
    );
    const others = VEHICLES.filter(
      (v) => v.stockNumber !== vehicle.stockNumber && v.bodyType !== vehicle.bodyType
    );
    return [...sameBody, ...others].slice(0, 4);
  }, [vehicle]);

  const totalImages = vehicle.images.length;

  return (
    <div className="vdp-page">
      <div className="container">
        <Link to="/inventory" className="vdp-back-link">
          <ArrowLeft size={16} />
          Back To Listing
        </Link>

        <div className="vdp-header-row">
          <h1 className="vdp-title">{vehicle.title}</h1>
          <div className="vdp-price-block">
            <div className="vdp-price-main">{formatCurrency(vehicle.price)} *</div>
            <button
              type="button"
              className="vlp-fees-btn"
              style={{ color: '#444' }}
              onClick={() => setFeesOpen(true)}
            >
              *Fees Not Disclosed
            </button>
          </div>
        </div>

        <div className="vdp-main-grid">
          {/* Left Gallery Column */}
          <div>
            <div className="vdp-stage">
              <img
                src={vehicle.images[photoIdx]}
                alt={`${vehicle.title} - Photo ${photoIdx + 1}`}
              />
              {totalImages > 1 && (
                <>
                  <button
                    type="button"
                    className="vdp-stage-arrow vdp-stage-arrow--prev"
                    onClick={() => setPhotoIdx((p) => (p - 1 + totalImages) % totalImages)}
                    aria-label="Previous vehicle image"
                  >
                    <ChevronLeft size={22} />
                  </button>
                  <button
                    type="button"
                    className="vdp-stage-arrow vdp-stage-arrow--next"
                    onClick={() => setPhotoIdx((p) => (p + 1) % totalImages)}
                    aria-label="Next vehicle image"
                  >
                    <ChevronRight size={22} />
                  </button>
                </>
              )}
            </div>

            {totalImages > 1 && (
              <div className="vdp-thumbs">
                {vehicle.images.map((src, idx) => (
                  <button
                    key={src}
                    type="button"
                    className={`vdp-thumb-btn ${photoIdx === idx ? 'is-active' : ''}`}
                    onClick={() => setPhotoIdx(idx)}
                  >
                    <img src={src} alt={`Thumbnail ${idx + 1}`} />
                  </button>
                ))}
              </div>
            )}

            {/* Equipment & Description */}
            <div className="vdp-details-tabs">
              <h2 className="vdp-box-heading">VEHICLE EQUIPMENT</h2>
              <ul className="vdp-equipment-grid">
                {vehicle.equipment.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>

              <h2 className="vdp-box-heading">VEHICLE DESCRIPTION</h2>
              <h3 style={{ fontFamily: 'var(--font-condensed)', fontSize: 22, margin: '10px 0 8px' }}>
                {vehicle.headline}
              </h3>
              <p style={{ fontSize: 14.5, lineHeight: 1.65, color: '#333' }}>
                {vehicle.description}
              </p>
            </div>
          </div>

          {/* Right Specifications + CTA + Loan Calculator Column */}
          <div>
            <div className="vdp-specs-box">
              <h2 className="vdp-box-heading">VEHICLE SPECIFICATIONS</h2>
              <div className="vdp-spec-table">
                <div className="vlp-spec-cell">
                  <span className="vlp-spec-k">VIN</span>
                  <span className="vlp-spec-v">{vehicle.vin}</span>
                </div>
                <div className="vlp-spec-cell">
                  <span className="vlp-spec-k">Stock No.</span>
                  <span className="vlp-spec-v">{vehicle.stockNumber}</span>
                </div>
                <div className="vlp-spec-cell">
                  <span className="vlp-spec-k">Mileage</span>
                  <span className="vlp-spec-v">{vehicle.mileage.toLocaleString('en-US')}</span>
                </div>
                <div className="vlp-spec-cell">
                  <span className="vlp-spec-k">Drivetrain</span>
                  <span className="vlp-spec-v">{vehicle.drivetrain}</span>
                </div>
                <div className="vlp-spec-cell">
                  <span className="vlp-spec-k">Engine</span>
                  <span className="vlp-spec-v">{vehicle.engine}</span>
                </div>
                <div className="vlp-spec-cell">
                  <span className="vlp-spec-k">Transmission</span>
                  <span className="vlp-spec-v">{vehicle.transmission}</span>
                </div>
                <div className="vlp-spec-cell">
                  <span className="vlp-spec-k">MPG</span>
                  <span className="vlp-spec-v">{vehicle.mpgDisplay}</span>
                </div>
                <div className="vlp-spec-cell">
                  <span className="vlp-spec-k">Body Type</span>
                  <span className="vlp-spec-v">{vehicle.bodyType}</span>
                </div>
                <div className="vlp-spec-cell">
                  <span className="vlp-spec-k">Exterior Color</span>
                  <span className="vlp-spec-v">{vehicle.exteriorColor}</span>
                </div>
                <div className="vlp-spec-cell">
                  <span className="vlp-spec-k">Interior Color</span>
                  <span className="vlp-spec-v">{vehicle.interiorColor}</span>
                </div>
                <div className="vlp-spec-cell">
                  <span className="vlp-spec-k">Fuel Type</span>
                  <span className="vlp-spec-v">{vehicle.fuelType}</span>
                </div>
                <div className="vlp-spec-cell">
                  <span className="vlp-spec-k">Trim</span>
                  <span className="vlp-spec-v">{vehicle.trim}</span>
                </div>
              </div>

              <div className="vdp-cta-stack">
                <Link
                  to={`/apply-online?stock=${encodeURIComponent(vehicle.stockNumber)}`}
                  className="vdp-cta-primary vdp-cta-primary--red"
                >
                  APPLY ONLINE
                </Link>
                <button
                  type="button"
                  className="vdp-cta-primary"
                  onClick={() => setModalMode('availability')}
                >
                  CHECK AVAILABILITY
                </button>
                <button
                  type="button"
                  className="vdp-cta-primary"
                  onClick={() => setModalMode('testdrive')}
                >
                  SCHEDULE TEST DRIVE
                </button>
                <button
                  type="button"
                  onClick={() => setAutoCheckOpen(true)}
                  style={{
                    background: '#fff',
                    border: '1px solid #ddd',
                    padding: '8px',
                    cursor: 'pointer',
                    display: 'flex',
                    justifyContent: 'center',
                  }}
                >
                  <img
                    src="/images/autocheck-vlp.png"
                    alt="View AutoCheck Report"
                    style={{ height: 30 }}
                  />
                </button>
              </div>
            </div>

            {/* Interactive Loan Calculator */}
            <div className="vdp-loan-box">
              <h2 className="vdp-box-heading">LOAN CALCULATOR</h2>
              <div className="vdp-calc-grid">
                <div className="vdp-calc-field">
                  <label htmlFor="calc-price">Vehicle Price ($)</label>
                  <input
                    id="calc-price"
                    type="number"
                    min="0"
                    value={calcPrice}
                    onChange={(e) => setCalcPrice(Number(e.target.value))}
                  />
                </div>
                <div className="vdp-calc-field">
                  <label htmlFor="calc-down">Down Payment ($)</label>
                  <input
                    id="calc-down"
                    type="number"
                    min="0"
                    value={downPayment}
                    onChange={(e) => setDownPayment(Number(e.target.value))}
                  />
                </div>
                <div className="vdp-calc-field">
                  <label htmlFor="calc-term">Term</label>
                  <select
                    id="calc-term"
                    value={termMonths}
                    onChange={(e) => setTermMonths(Number(e.target.value))}
                  >
                    <option value={36}>36 Months</option>
                    <option value={48}>48 Months</option>
                    <option value={60}>60 Months</option>
                    <option value={72}>72 Months</option>
                    <option value={84}>84 Months</option>
                  </select>
                </div>
                <div className="vdp-calc-field">
                  <label htmlFor="calc-apr">APR (%)</label>
                  <input
                    id="calc-apr"
                    type="number"
                    step="0.1"
                    min="0"
                    max="30"
                    value={apr}
                    onChange={(e) => setApr(Number(e.target.value))}
                  />
                </div>
              </div>

              <div className="vdp-payment-result">
                <div style={{ fontSize: 12, color: '#555' }}>Your estimated payment is:</div>
                <strong>${Math.round(monthlyPayment).toLocaleString('en-US')}</strong>{' '}
                <span style={{ fontSize: 13 }}>per month*</span>
              </div>
              <p style={{ fontSize: 10.5, color: '#666', lineHeight: 1.45, margin: 0 }}>
                Payment amount is an estimate for illustrative demonstration purposes only. This is
                not an advertisement or offer of credit and excludes taxes, title, registration,
                license fees, and insurance.
              </p>
            </div>
          </div>
        </div>

        {/* Similar Vehicles */}
        <section style={{ marginTop: 48 }}>
          <h2 className="vdp-box-heading">SIMILAR VEHICLES</h2>
          <div className="vdp-similar-grid">
            {similarVehicles.map((sim) => (
              <VehicleCard key={sim.stockNumber} vehicle={sim} variant="featured" />
            ))}
          </div>
        </section>
      </div>

      {modalMode && (
        <AvailabilityModal
          vehicle={vehicle}
          mode={modalMode}
          onClose={() => setModalMode(null)}
        />
      )}
      {autoCheckOpen && (
        <AutoCheckModal vehicle={vehicle} onClose={() => setAutoCheckOpen(false)} />
      )}
      {feesOpen && <FeesDisclosureModal vehicle={vehicle} onClose={() => setFeesOpen(false)} />}
    </div>
  );
}
