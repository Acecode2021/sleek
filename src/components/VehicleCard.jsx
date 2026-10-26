import React from 'react';
import { Link } from 'react-router-dom';
import { Image as ImageIcon, PlaySquare } from 'lucide-react';
import { formatCurrency, formatMileageShort, getVehicleUrl } from '../data/vehicles';

export default function VehicleCard({
  vehicle,
  variant = 'list',
  isCompared = false,
  onToggleCompare,
  onConfirmAvailability,
  onOpenAutoCheck,
  onOpenFeesInfo,
}) {
  const detailUrl = getVehicleUrl(vehicle);
  // In reference inventory rows, stock #123396 shows gallery icon only; rows from #609236 onward show gallery + video walkaround badge
  const showVideoBadge = vehicle.stockNumber !== '123396';

  if (variant === 'featured') {
    return (
      <Link
        to={detailUrl}
        className="featured-card"
        title={`View details of ${vehicle.title}`}
      >
        <div className="featured-card-img-wrap">
          <img
            src={vehicle.images[0]}
            alt={vehicle.title}
            className="featured-card-img"
            loading="eager"
          />
        </div>
        <div className="featured-card-body">
          <h3 className="featured-card-title">{vehicle.title}</h3>
          <div className="featured-card-specs">
            <div className="featured-spec-col">
              <span className="featured-spec-label">Stock #</span>
              <span className="featured-spec-val">{vehicle.stockNumber}</span>
            </div>
            <div className="featured-spec-col">
              <span className="featured-spec-label">Mileage</span>
              <span className="featured-spec-val">{formatMileageShort(vehicle.mileage)}</span>
            </div>
            <div className="featured-spec-col">
              <span className="featured-spec-label">
                Exterior
                <br />
                Color
              </span>
              <span className="featured-spec-val">{vehicle.exteriorColor}</span>
            </div>
          </div>
        </div>
        <div className="featured-card-price-bar">
          <span className="featured-price-num">{formatCurrency(vehicle.price)} *</span>
          <span className="featured-fees-note">*Fees Not Disclosed</span>
        </div>
      </Link>
    );
  }

  if (variant === 'grid') {
    return (
      <article className="vlp-grid-card">
        <Link to={detailUrl} className="vlp-photo-link">
          <img src={vehicle.images[0]} alt={vehicle.title} loading="eager" />
          <div className="vlp-media-badges">
            <span className="vlp-media-badge" title={`${vehicle.photoCount} Photos`}>
              <ImageIcon size={12} />
            </span>
            {showVideoBadge && (
              <span className="vlp-media-badge" title="Walkaround Overview">
                <PlaySquare size={12} />
              </span>
            )}
          </div>
        </Link>
        <div className="vlp-grid-body">
          <Link to={detailUrl} className="vlp-title-link">
            {vehicle.title}
          </Link>
          <div style={{ fontSize: 12, color: '#555' }}>
            <div>
              <strong>VIN:</strong> {vehicle.vin}
            </div>
            <div>
              <strong>Mileage:</strong> {vehicle.mileage.toLocaleString('en-US')}
            </div>
            <div>
              <strong>Stock #:</strong> {vehicle.stockNumber}
            </div>
          </div>
          <div className="vlp-price-box" style={{ marginTop: 'auto' }}>
            <span className="vlp-price-amount">{formatCurrency(vehicle.price)} *</span>
            <button
              type="button"
              className="vlp-fees-btn"
              onClick={() => onOpenFeesInfo && onOpenFeesInfo(vehicle)}
            >
              *Fees Not Disclosed
            </button>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <label className="vlp-compare-label" style={{ marginTop: 0 }}>
              <input
                type="checkbox"
                checked={isCompared}
                onChange={() => onToggleCompare && onToggleCompare(vehicle)}
              />
              Compare
            </label>
            <button
              type="button"
              className="vlp-autocheck-btn"
              onClick={() => onOpenAutoCheck && onOpenAutoCheck(vehicle)}
            >
              <img src="/images/autocheck-vlp.png" alt="AutoCheck Vehicle History" />
            </button>
          </div>
          <div className="vlp-actions-row">
            <Link
              to={`/apply-online?stock=${encodeURIComponent(vehicle.stockNumber)}`}
              className="vlp-action-btn"
            >
              APPLY CREDIT
            </Link>
            <Link to={detailUrl} className="vlp-action-btn">
              VIEW DETAILS
            </Link>
          </div>
        </div>
      </article>
    );
  }

  // Default: Horizontal DealerCenter Inventory Row (Exact Natural Flex-Wrap Spec Layout)
  return (
    <article className="vlp-item">
      <div className="vlp-item-main">
        {/* Left Photo + Compare */}
        <div className="vlp-media-col">
          <Link to={detailUrl} className="vlp-photo-link">
            <img src={vehicle.images[0]} alt={vehicle.title} loading="eager" />
            <div className="vlp-media-badges">
              <span className="vlp-media-badge" title={`${vehicle.photoCount} Photos`}>
                <ImageIcon size={13} />
              </span>
              {showVideoBadge && (
                <span className="vlp-media-badge" title="Walkaround Overview">
                  <PlaySquare size={13} />
                </span>
              )}
            </div>
          </Link>
          <label className="vlp-compare-label">
            <input
              type="checkbox"
              checked={isCompared}
              onChange={() => onToggleCompare && onToggleCompare(vehicle)}
            />
            Compare
          </label>
        </div>

        {/* Center Title & Continuous Multi-Field Flex-Wrap Spec Grid */}
        <div>
          <Link to={detailUrl} className="vlp-title-link">
            {vehicle.title}
          </Link>

          <div className="vlp-spec-flow">
            <div className="vlp-spec-cell">
              <span className="vlp-spec-k">Drivetrain</span>
              <span className="vlp-spec-v">{vehicle.drivetrain}</span>
            </div>
            <div className="vlp-spec-cell">
              <span className="vlp-spec-k">Transmission</span>
              <span className="vlp-spec-v">{vehicle.transmission}</span>
            </div>
            <div className="vlp-spec-cell">
              <span className="vlp-spec-k">Engine</span>
              <span className="vlp-spec-v">{vehicle.engine}</span>
            </div>
            <div className="vlp-spec-cell">
              <span className="vlp-spec-k">Mileage</span>
              <span className="vlp-spec-v">{vehicle.mileage.toLocaleString('en-US')}</span>
            </div>
            <div className="vlp-spec-cell">
              <span className="vlp-spec-k">Doors</span>
              <span className="vlp-spec-v">{vehicle.doors}</span>
            </div>
            <div className="vlp-spec-cell">
              <span className="vlp-spec-k">VIN</span>
              <span className="vlp-spec-v">{vehicle.vin}</span>
            </div>
            <div className="vlp-spec-cell">
              <span className="vlp-spec-k">Stock Number</span>
              <span className="vlp-spec-v">{vehicle.stockNumber}</span>
            </div>
            <div className="vlp-spec-cell">
              <span className="vlp-spec-k">Transmission Detail</span>
              <span className="vlp-spec-v">{vehicle.transmissionDetail}</span>
            </div>
            <div className="vlp-spec-cell">
              <span className="vlp-spec-k">MPG (city/hwy)</span>
              <span className="vlp-spec-v">{vehicle.mpgDisplay}</span>
            </div>
            <div className="vlp-spec-cell">
              <span className="vlp-spec-k">Body Type</span>
              <span className="vlp-spec-v">{vehicle.bodyType}</span>
            </div>
            <div className="vlp-spec-cell">
              <span className="vlp-spec-k">Trim</span>
              <span className="vlp-spec-v">{vehicle.trim}</span>
            </div>
            <div className="vlp-spec-cell">
              <span className="vlp-spec-k">Fuel Type</span>
              <span className="vlp-spec-v">{vehicle.fuelType}</span>
            </div>
          </div>
        </div>

        {/* Right Price Box + AutoCheck Logo */}
        <div className="vlp-price-col">
          <div className="vlp-price-box">
            <span className="vlp-price-amount">{formatCurrency(vehicle.price)} *</span>
            <button
              type="button"
              className="vlp-fees-btn"
              onClick={() => onOpenFeesInfo && onOpenFeesInfo(vehicle)}
            >
              *Fees Not Disclosed
            </button>
          </div>
          <button
            type="button"
            className="vlp-autocheck-btn"
            onClick={() => onOpenAutoCheck && onOpenAutoCheck(vehicle)}
            title={`View demonstration AutoCheck summary for ${vehicle.vin}`}
          >
            <img src="/images/autocheck-vlp.png" alt="AutoCheck - A part of Experian" />
          </button>
        </div>
      </div>

      {/* Action Buttons Row */}
      <div className="vlp-actions-row">
        <button
          type="button"
          className="vlp-action-btn"
          onClick={() => onConfirmAvailability && onConfirmAvailability(vehicle)}
        >
          CONFIRM AVAILABILITY
        </button>
        <Link
          to={`/apply-online?stock=${encodeURIComponent(vehicle.stockNumber)}`}
          className="vlp-action-btn"
        >
          APPLY CREDIT
        </Link>
        <Link to={detailUrl} className="vlp-action-btn">
          VIEW DETAILS
        </Link>
      </div>
    </article>
  );
}
