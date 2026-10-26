import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { X } from 'lucide-react';
import { formatCurrency, getVehicleUrl } from '../data/vehicles';

export function AvailabilityModal({ vehicle, mode = 'availability', onClose }) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    preferredDate: '',
    comments: `Hi, I am interested in checking availability on the ${vehicle?.title || ''} (Stock #${vehicle?.stockNumber || ''}).`,
  });
  const [submitted, setSubmitted] = useState(false);

  if (!vehicle) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
        <div className="modal-header">
          <h3>
            {mode === 'testdrive' ? 'Schedule Demonstration Test Drive' : 'Confirm Vehicle Availability'}
          </h3>
          <button type="button" className="modal-close" onClick={onClose} aria-label="Close modal">
            <X size={20} />
          </button>
        </div>
        <div className="modal-body">
          <div style={{ display: 'flex', gap: 14, marginBottom: 16, alignItems: 'center' }}>
            <img
              src={vehicle.images[0]}
              alt={vehicle.title}
              style={{ width: 110, height: 82, objectFit: 'cover' }}
            />
            <div>
              <strong style={{ fontFamily: 'var(--font-condensed)', fontSize: 17 }}>
                {vehicle.title}
              </strong>
              <div style={{ fontSize: 12.5, color: '#555' }}>
                Stock #{vehicle.stockNumber} | VIN: {vehicle.vin}
              </div>
              <div style={{ fontWeight: 700, fontSize: 16, marginTop: 2 }}>
                {formatCurrency(vehicle.price)} *
              </div>
            </div>
          </div>

          {submitted ? (
            <div className="demo-submission-banner">
              <strong>Local Demonstration Confirmation Only</strong>
              Your inquiry preview for <strong>{vehicle.title}</strong> (Stock #{vehicle.stockNumber}) was validated locally in your browser. Because this is an educational frontend recreation, <strong>no personal data was transmitted to Sleek Auto Sales Inc.</strong>
              <div style={{ marginTop: 12 }}>
                <button type="button" className="pill-dark-btn" onClick={onClose}>
                  Done
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="form-grid-2">
                <input
                  type="text"
                  className="cf-input"
                  placeholder="First Name *"
                  required
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                />
                <input
                  type="text"
                  className="cf-input"
                  placeholder="Last Name *"
                  required
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                />
              </div>
              <div className="form-grid-2">
                <input
                  type="tel"
                  className="cf-input"
                  placeholder="Phone Number *"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
                <input
                  type="email"
                  className="cf-input"
                  placeholder="Email *"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
              {mode === 'testdrive' && (
                <div className="form-row-full">
                  <input
                    type="date"
                    className="cf-input"
                    required
                    value={formData.preferredDate}
                    onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                  />
                </div>
              )}
              <div className="form-row-full">
                <textarea
                  className="cf-textarea"
                  rows={3}
                  value={formData.comments}
                  onChange={(e) => setFormData({ ...formData, comments: e.target.value })}
                />
              </div>
              <div className="center-submit-row" style={{ marginTop: 12 }}>
                <button type="submit" className="form-submit-pill">
                  Submit Request
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export function AutoCheckModal({ vehicle, onClose }) {
  if (!vehicle) return null;
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
        <div className="modal-header">
          <h3>Experian AutoCheck Vehicle History Notice</h3>
          <button type="button" className="modal-close" onClick={onClose} aria-label="Close modal">
            <X size={20} />
          </button>
        </div>
        <div className="modal-body">
          <img
            src="/images/autocheck-vlp.png"
            alt="AutoCheck"
            style={{ height: 34, marginBottom: 12 }}
          />
          <p style={{ margin: '0 0 10px', fontSize: 14 }}>
            <strong>Vehicle:</strong> {vehicle.title} ({vehicle.trim})
          </p>
          <p style={{ margin: '0 0 10px', fontSize: 14 }}>
            <strong>VIN:</strong> {vehicle.vin} &nbsp;|&nbsp; <strong>Stock #:</strong>{' '}
            {vehicle.stockNumber}
          </p>
          <div className="demo-submission-banner" style={{ marginTop: 12 }}>
            <strong>External Platform Note (DealerCenter / Experian AutoCheck)</strong>
            On the reference website, clicking the AutoCheck badge launches DealerCenter’s authenticated Experian report viewer endpoint (<code>/view-autocheck-report?vin={vehicle.vin}</code>). Live Experian history records require an active dealership subscriber feed and are intentionally not fabricated in this demonstration clone.
          </div>
          <div style={{ marginTop: 16, display: 'flex', justifyContent: 'flex-end' }}>
            <button type="button" className="pill-dark-btn" onClick={onClose}>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function FeesDisclosureModal({ vehicle, onClose }) {
  if (!vehicle) return null;
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
        <div className="modal-header">
          <h3>Price &amp; Fees Disclosure (*Fees Not Disclosed)</h3>
          <button type="button" className="modal-close" onClick={onClose} aria-label="Close modal">
            <X size={20} />
          </button>
        </div>
        <div className="modal-body">
          <p style={{ fontSize: 13.5, lineHeight: 1.6, margin: 0 }}>
            Listed demonstration price of <strong>{formatCurrency(vehicle.price)}</strong> for{' '}
            <strong>{vehicle.title}</strong> excludes tax, tag, title, registration, and dealer
            documentary/administrative fees. Contact the dealership directly to confirm current
            pricing, availability, and applicable fees.
          </p>
          <div style={{ marginTop: 16, display: 'flex', justifyContent: 'flex-end' }}>
            <button type="button" className="pill-dark-btn" onClick={onClose}>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function CompareModal({ vehicles, onClose }) {
  if (!vehicles || vehicles.length === 0) return null;
  const rows = [
    { label: 'Price', render: (v) => `${formatCurrency(v.price)} *` },
    { label: 'Stock #', render: (v) => v.stockNumber },
    { label: 'VIN', render: (v) => v.vin },
    { label: 'Mileage', render: (v) => `${v.mileage.toLocaleString('en-US')} mi` },
    { label: 'Engine', render: (v) => v.engine },
    { label: 'Transmission', render: (v) => v.transmissionDetail },
    { label: 'Drivetrain', render: (v) => v.drivetrain },
    { label: 'Body Type', render: (v) => v.bodyType },
    { label: 'Fuel Type', render: (v) => v.fuelType },
    { label: 'Exterior Color', render: (v) => v.exteriorColor },
    { label: 'MPG (City/Hwy)', render: (v) => v.mpgDisplay },
  ];

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="modal-card modal-card--wide"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <div className="modal-header">
          <h3>Side-by-Side Vehicle Comparison ({vehicles.length})</h3>
          <button type="button" className="modal-close" onClick={onClose} aria-label="Close modal">
            <X size={20} />
          </button>
        </div>
        <div className="modal-body" style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr>
                <th style={{ textAlign: 'left', padding: 8, borderBottom: '2px solid #222' }}>
                  Specification
                </th>
                {vehicles.map((v) => (
                  <th
                    key={v.stockNumber}
                    style={{ textAlign: 'left', padding: 8, borderBottom: '2px solid #222' }}
                  >
                    <img
                      src={v.images[0]}
                      alt={v.title}
                      style={{ width: 150, height: 112, objectFit: 'cover', marginBottom: 6 }}
                    />
                    <Link to={getVehicleUrl(v)} onClick={onClose} style={{ textDecoration: 'underline' }}>
                      {v.title}
                    </Link>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.label}>
                  <td
                    style={{
                      padding: '8px',
                      borderBottom: '1px solid #e5e5e5',
                      fontWeight: 700,
                      color: '#333',
                    }}
                  >
                    {r.label}
                  </td>
                  {vehicles.map((v) => (
                    <td
                      key={v.stockNumber}
                      style={{ padding: '8px', borderBottom: '1px solid #e5e5e5' }}
                    >
                      {r.render(v)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
