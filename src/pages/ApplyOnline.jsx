import React, { useEffect, useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Calendar, PhoneCall, Search, Smartphone } from 'lucide-react';
import { VEHICLES } from '../data/vehicles';
import emailjs from '@emailjs/browser'; 
  

const US_STATES = [
  'NC', 'SC', 'VA', 'GA', 'FL', 'TN', 'MD', 'TX', 'CA', 'NY', 'IL', 'PA', 'OH', 'MI',
];

export default function ApplyOnline() {
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState('buyer');
  const [addPrevAddress, setAddPrevAddress] = useState(false);
  const [addPrevEmployment, setAddPrevEmployment] = useState(false);
  const [addTradeIn, setAddTradeIn] = useState(false);
  const [ssnFocusedNotice, setSsnFocusedNotice] = useState(false);
  const [vehicleQuery, setVehicleQuery] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    cellPhone: '',
    homePhone: '',
    dob: '',
    ssnMask: '',
    dlNumber: '',
    dlState: '',
    dlIssueDate: '',
    dlExpiryDate: '',
    coFirstName: '',
    coLastName: '',
    coEmail: '',
    coPhone: '',
    streetAddress: '',
    city: '',
    state: '',
    zipCode: '',
    housingType: '',
    monthlyRent: '',
    yearsAtAddress: '',
    monthsAtAddress: '',
    prevAddress: '',
    employerName: '',
    titlePosition: '',
    employerPhone: '',
    monthlyIncome: '',
    yearsAtJob: '',
    monthsAtJob: '',
    prevEmployer: '',
    stockNumber: '',
    year: '',
    make: '',
    model: '',
    vehiclePrice: '',
    downPayment: '',
    paymentMethod: '', // ADDED: Down payment method
    exteriorColor: '',
    interiorColor: '',
    tradeInSummary: '',
    smsMarketing: false,
    smsNonMarketing: false,
  });

  useEffect(() => {
    const stockParam = searchParams.get('stock') || searchParams.get('stock_number');
    if (stockParam) {
      const match = VEHICLES.find(
        (v) => v.stockNumber.toUpperCase() === stockParam.toUpperCase()
      );
      if (match) {
        setVehicleQuery(match.title);
        setForm((prev) => ({
          ...prev,
          stockNumber: match.stockNumber,
          year: String(match.year),
          make: match.make,
          model: match.model,
          vehiclePrice: `$${match.price.toLocaleString('en-US')}`,
          exteriorColor: match.exteriorColor,
          interiorColor: match.interiorColor,
        }));
      }
    }
  }, [searchParams]);

  const matchingVehicles = useMemo(() => {
    const q = vehicleQuery.trim().toLowerCase();
    if (!q) return [];
    return VEHICLES.filter(
      (v) =>
        v.title.toLowerCase().includes(q) || v.stockNumber.toLowerCase().includes(q)
    ).slice(0, 5);
  }, [vehicleQuery]);

  const selectInventoryVehicle = (v) => {
    setVehicleQuery(v.title);
    setForm((prev) => ({
      ...prev,
      stockNumber: v.stockNumber,
      year: String(v.year),
      make: v.make,
      model: v.model,
      vehiclePrice: `$${v.price.toLocaleString('en-US')}`,
      exteriorColor: v.exteriorColor,
      interiorColor: v.interiorColor,
    }));
  };

  const update = (key) => (e) => {
    const val = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setForm((prev) => ({ ...prev, [key]: val }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_APPLY_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
    if (!serviceId || !templateId || !publicKey) {
      setSubmitError('Email delivery is not configured. Check the EmailJS service ID, Apply Online template ID, and public key.');
      return;
    }

    setIsSubmitting(true);
    setSubmitted(false);
    setSubmitError('');
    setForm((prev) => ({ ...prev, ssnMask: '' }));

    const formWithoutSsn = Object.fromEntries(
      Object.entries(form).filter(([key]) => key !== 'ssnMask')
    );
    const templateParams = {
      ...formWithoutSsn,
      addressState: form.state,        
      jobTitle: form.titlePosition,    
      grossIncome: form.monthlyIncome, 
      vehicleYear: form.year, 
      vehicleMake: form.make,          // <-- ADD THIS
      vehicleModel: form.model,        // <-- ADD THIS         
      downPaymentMethod: form.paymentMethod, // Map to EmailJS variable {{downPaymentMethod}}
    };

    try {
      await emailjs.send(
        serviceId,
        templateId,
        templateParams,
        publicKey
      );

      setSubmitted(true);
    } catch (error) {
      const detail = error?.text || error?.message;
      console.error('EmailJS Error:', { status: error?.status, detail });
      setSubmitError(
        detail
          ? `Email delivery failed: ${detail}`
          : 'Email delivery failed. Check the EmailJS service/template pairing and try again.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="apply-page">
      <div className="page-title-band">
        <div className="container">
          <h1 className="page-main-heading">APPLY ONLINE</h1>
        </div>
      </div>

      <div className="container">
        {/* Buyer / Co-Buyer Tabs */}
        <div className="apply-tabs-bar">
          <button
            type="button"
            className={`apply-tab-btn ${activeTab === 'buyer' ? 'is-active' : ''}`}
            onClick={() => setActiveTab('buyer')}
          >
            Buyer
          </button>
          <button
            type="button"
            className={`apply-tab-btn ${activeTab === 'cobuyer' ? 'is-active' : ''}`}
            onClick={() => setActiveTab('cobuyer')}
          >
            Co-Buyer
          </button>
        </div>

        <p className="required-note">All fields marked with an asterisk (*) are required</p>

        <form className="apply-form-narrow" onSubmit={handleSubmit}>
          {activeTab === 'cobuyer' && (
            <div
              style={{
                marginBottom: 24,
                padding: 14,
                background: '#f7f7f7',
                border: '1px solid #e2e2e2',
              }}
            >
              <div className="apply-section-title" style={{ marginTop: 0 }}>
                Co-Buyer Information
              </div>
              <div className="form-grid-2">
                <div className="ap-field">
                  <label>Co-Buyer First Name</label>
                  <input
                    type="text"
                    className="ap-input"
                    value={form.coFirstName}
                    onChange={update('coFirstName')}
                  />
                </div>
                <div className="ap-field">
                  <label>Co-Buyer Last Name</label>
                  <input
                    type="text"
                    className="ap-input"
                    value={form.coLastName}
                    onChange={update('coLastName')}
                  />
                </div>
                <div className="ap-field">
                  <label>Co-Buyer Email</label>
                  <input
                    type="email"
                    className="ap-input"
                    value={form.coEmail}
                    onChange={update('coEmail')}
                  />
                </div>
                <div className="ap-field">
                  <label>Co-Buyer Cell Phone</label>
                  <input
                    type="tel"
                    className="ap-input"
                    value={form.coPhone}
                    onChange={update('coPhone')}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Personal Information */}
          <h2 className="apply-section-title">Personal Information</h2>
          <div className="form-grid-2">
            <div className="ap-field">
              <label htmlFor="ap-fname">First Name *</label>
              <input
                id="ap-fname"
                type="text"
                className="ap-input"
                required
                value={form.firstName}
                onChange={update('firstName')}
              />
            </div>
            <div className="ap-field">
              <label htmlFor="ap-lname">Last Name *</label>
              <input
                id="ap-lname"
                type="text"
                className="ap-input"
                required
                value={form.lastName}
                onChange={update('lastName')}
              />
            </div>
          </div>

          <div className="form-grid-3">
            <div className="ap-field">
              <label htmlFor="ap-email">Email *</label>
              <input
                id="ap-email"
                type="email"
                className="ap-input"
                required
                value={form.email}
                onChange={update('email')}
              />
            </div>
            <div className="ap-field">
              <label htmlFor="ap-cell">Cell Phone *</label>
              <div className="ap-input-wrap">
                <input
                  id="ap-cell"
                  type="tel"
                  className="ap-input ap-input--has-right"
                  required
                  value={form.cellPhone}
                  onChange={update('cellPhone')}
                />
                <span className="ap-input-icon-right" aria-hidden="true">
                  <Smartphone size={14} />
                </span>
              </div>
            </div>
            <div className="ap-field">
              <label htmlFor="ap-home">Home Phone (Optional)</label>
              <div className="ap-input-wrap">
                <input
                  id="ap-home"
                  type="tel"
                  className="ap-input ap-input--has-right"
                  value={form.homePhone}
                  onChange={update('homePhone')}
                />
                <span className="ap-input-icon-right" aria-hidden="true">
                  <PhoneCall size={14} />
                </span>
              </div>
            </div>
          </div>

          <div className="form-grid-2">
            <div className="ap-field">
              <label htmlFor="ap-dob">Date of Birth *</label>
              <div className="ap-input-wrap">
                <input
                  id="ap-dob"
                  type="text"
                  placeholder="mm/dd/yyyy"
                  className="ap-input ap-input--has-right"
                  required
                  value={form.dob}
                  onChange={update('dob')}
                />
                <span className="ap-input-icon-right" aria-hidden="true">
                  <Calendar size={14} />
                </span>
              </div>
            </div>
            <div className="ap-field">
              <label htmlFor="ap-ssn">SSN *</label>
              <input
                id="ap-ssn"
                type="password"
                autoComplete="off"
                placeholder="___-__-____"
                className="ap-input"
                value={form.ssnMask}
                onFocus={() => setSsnFocusedNotice(true)}
                onChange={update('ssnMask')}
              />
              {ssnFocusedNotice && (
                <div style={{ fontSize: 10.5, color: '#666', marginTop: 3 }}>
                  Demonstration UI field only — do not enter a real SSN (never stored or sent).
                </div>
              )}
            </div>
          </div>

          <div className="form-grid-2">
            <div className="ap-field">
              <label htmlFor="ap-dln">Driver&apos;s License Number</label>
              <input
                id="ap-dln"
                type="text"
                className="ap-input"
                value={form.dlNumber}
                onChange={update('dlNumber')}
              />
            </div>
            <div className="ap-field">
              <label htmlFor="ap-dls">Driver&apos;s License State</label>
              <select
                id="ap-dls"
                className="ap-select"
                value={form.dlState}
                onChange={update('dlState')}
              >
                <option value="">State</option>
                {US_STATES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-grid-2">
            <div className="ap-field">
              <label htmlFor="ap-dlissue">Driver&apos;s License Issue Date</label>
              <div className="ap-input-wrap">
                <input
                  id="ap-dlissue"
                  type="text"
                  placeholder="mm/dd/yyyy"
                  className="ap-input ap-input--has-right"
                  value={form.dlIssueDate}
                  onChange={update('dlIssueDate')}
                />
                <span className="ap-input-icon-right" aria-hidden="true">
                  <Calendar size={14} />
                </span>
              </div>
            </div>
            <div className="ap-field">
              <label htmlFor="ap-dlexp">Driver&apos;s License Expiry Date</label>
              <div className="ap-input-wrap">
                <input
                  id="ap-dlexp"
                  type="text"
                  placeholder="mm/dd/yyyy"
                  className="ap-input ap-input--has-right"
                  value={form.dlExpiryDate}
                  onChange={update('dlExpiryDate')}
                />
                <span className="ap-input-icon-right" aria-hidden="true">
                  <Calendar size={14} />
                </span>
              </div>
            </div>
          </div>

          {/* Residential Information */}
          <h2 className="apply-section-title">Residential Information</h2>
          <div className="form-row-full ap-field">
            <label htmlFor="ap-street">Street Address *</label>
            <input
              id="ap-street"
              type="text"
              className="ap-input"
              required
              value={form.streetAddress}
              onChange={update('streetAddress')}
            />
          </div>

          <div className="form-grid-3">
            <div className="ap-field">
              <label htmlFor="ap-city">City *</label>
              <input
                id="ap-city"
                type="text"
                className="ap-input"
                required
                value={form.city}
                onChange={update('city')}
              />
            </div>
            <div className="ap-field">
              <label htmlFor="ap-state">State *</label>
              <select
                id="ap-state"
                className="ap-select"
                required
                value={form.state}
                onChange={update('state')}
              >
                <option value="">State</option>
                {US_STATES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
            <div className="ap-field">
              <label htmlFor="ap-zip">Zip Code *</label>
              <input
                id="ap-zip"
                type="text"
                className="ap-input"
                required
                value={form.zipCode}
                onChange={update('zipCode')}
              />
            </div>
          </div>

          <div className="form-grid-3">
            <div className="ap-field">
              <label htmlFor="ap-housing">Housing Type *</label>
              <select
                id="ap-housing"
                className="ap-select"
                required
                value={form.housingType}
                onChange={update('housingType')}
              >
                <option value="">Housing Type</option>
                <option value="Rent">Rent</option>
                <option value="Own / Buying">Own / Buying</option>
                <option value="Military Housing">Military Housing</option>
                <option value="Living with Family">Living with Family</option>
              </select>
            </div>
            <div className="ap-field">
              <label htmlFor="ap-rent">Monthly Rent/Mortgage Amount *</label>
              <input
                id="ap-rent"
                type="text"
                className="ap-input"
                required
                value={form.monthlyRent}
                onChange={update('monthlyRent')}
              />
            </div>
            <div className="ap-field">
              <label>Years at Address *</label>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                <select
                  className="ap-select"
                  value={form.yearsAtAddress}
                  onChange={update('yearsAtAddress')}
                >
                  <option value="">Years</option>
                  {[0, 1, 2, 3, 4, 5, '6+'].map((y) => (
                    <option key={y} value={y}>
                      {y} yrs
                    </option>
                  ))}
                </select>
                <select
                  className="ap-select"
                  value={form.monthsAtAddress}
                  onChange={update('monthsAtAddress')}
                >
                  <option value="">Months</option>
                  {[0, 3, 6, 9, 11].map((m) => (
                    <option key={m} value={m}>
                      {m} mos
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <label className="ap-inline-check">
            <input
              type="checkbox"
              checked={addPrevAddress}
              onChange={(e) => setAddPrevAddress(e.target.checked)}
            />
            <span>Add Previous Address</span>
          </label>
          {addPrevAddress && (
            <div className="form-row-full ap-field" style={{ marginTop: 10 }}>
              <label>Previous Full Address</label>
              <input
                type="text"
                className="ap-input"
                placeholder="Street, City, State, ZIP"
                value={form.prevAddress}
                onChange={update('prevAddress')}
              />
            </div>
          )}

          {/* Employment Information */}
          <h2 className="apply-section-title">Employment Information</h2>
          <div className="form-grid-3">
            <div className="ap-field">
              <label htmlFor="ap-emp">Employer Name *</label>
              <input
                id="ap-emp"
                type="text"
                className="ap-input"
                required
                value={form.employerName}
                onChange={update('employerName')}
              />
            </div>
            <div className="ap-field">
              <label htmlFor="ap-pos">Title/Position *</label>
              <input
                id="ap-pos"
                type="text"
                className="ap-input"
                required
                value={form.titlePosition}
                onChange={update('titlePosition')}
              />
            </div>
            <div className="ap-field">
              <label htmlFor="ap-emp-phone">Employer Phone Number *</label>
              <div className="ap-input-wrap">
                <input
                  id="ap-emp-phone"
                  type="tel"
                  className="ap-input ap-input--has-right"
                  required
                  value={form.employerPhone}
                  onChange={update('employerPhone')}
                />
                <span className="ap-input-icon-right" aria-hidden="true">
                  <PhoneCall size={14} />
                </span>
              </div>
            </div>
          </div>

          <div className="form-grid-2">
            <div className="ap-field">
              <label htmlFor="ap-income">Monthly Gross Income *</label>
              <input
                id="ap-income"
                type="text"
                className="ap-input"
                required
                value={form.monthlyIncome}
                onChange={update('monthlyIncome')}
              />
            </div>
            <div className="ap-field">
              <label>Years at Job *</label>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                <select
                  className="ap-select"
                  value={form.yearsAtJob}
                  onChange={update('yearsAtJob')}
                >
                  <option value="">Years</option>
                  {[0, 1, 2, 3, 4, 5, '6+'].map((y) => (
                    <option key={y} value={y}>
                      {y} yrs
                    </option>
                  ))}
                </select>
                <select
                  className="ap-select"
                  value={form.monthsAtJob}
                  onChange={update('monthsAtJob')}
                >
                  <option value="">Months</option>
                  {[0, 3, 6, 9, 11].map((m) => (
                    <option key={m} value={m}>
                      {m} mos
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <label className="ap-inline-check">
            <input
              type="checkbox"
              checked={addPrevEmployment}
              onChange={(e) => setAddPrevEmployment(e.target.checked)}
            />
            <span>Add Previous Employment</span>
          </label>
          {addPrevEmployment && (
            <div className="form-row-full ap-field" style={{ marginTop: 10 }}>
              <label>Previous Employer &amp; Job Title</label>
              <input
                type="text"
                className="ap-input"
                value={form.prevEmployer}
                onChange={update('prevEmployer')}
              />
            </div>
          )}

          {/* Interested Vehicle */}
          <h2 className="apply-section-title">Interested Vehicle</h2>
          <div className="ap-field" style={{ position: 'relative' }}>
            <label htmlFor="ap-vsearch">Vehicle Keyword</label>
            <div className="ap-vehicle-search-row">
              <div className="ap-input-wrap">
                <span className="ap-input-icon-left" aria-hidden="true">
                  <Search size={14} />
                </span>
                <input
                  id="ap-vsearch"
                  type="text"
                  className="ap-input ap-input--has-left"
                  placeholder=""
                  value={vehicleQuery}
                  onChange={(e) => setVehicleQuery(e.target.value)}
                />
              </div>
              <button
                type="button"
                className="ap-sort-chip"
                onClick={() => selectInventoryVehicle(VEHICLES[0])}
              >
                ⇅ Price
              </button>
              <button
                type="button"
                className="ap-sort-chip"
                onClick={() => selectInventoryVehicle(VEHICLES[2])}
              >
                ↑ Sort
              </button>
            </div>
            {matchingVehicles.length > 0 && form.stockNumber !== matchingVehicles[0]?.stockNumber && (
              <div
                style={{
                  border: '1px solid #ccc',
                  background: '#fff',
                  marginBottom: 12,
                  boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                }}
              >
                {matchingVehicles.map((v) => (
                  <button
                    key={v.stockNumber}
                    type="button"
                    onClick={() => selectInventoryVehicle(v)}
                    style={{
                      display: 'block',
                      width: '100%',
                      textAlign: 'left',
                      padding: '8px 12px',
                      background: 'transparent',
                      border: 'none',
                      borderBottom: '1px solid #eee',
                      fontSize: 12.5,
                      cursor: 'pointer',
                    }}
                  >
                    <strong>{v.title}</strong> — Stock #{v.stockNumber} ($
                    {v.price.toLocaleString('en-US')})
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="form-grid-4">
            <div className="ap-field">
              <label>Stock Number</label>
              <input
                type="text"
                className="ap-input"
                value={form.stockNumber}
                onChange={update('stockNumber')}
              />
            </div>
            <div className="ap-field">
              <label>Year</label>
              <input type="text" className="ap-input" value={form.year} onChange={update('year')} />
            </div>
            <div className="ap-field">
              <label>Make</label>
              <input type="text" className="ap-input" value={form.make} onChange={update('make')} />
            </div>
            <div className="ap-field">
              <label>Model</label>
              <input
                type="text"
                className="ap-input"
                value={form.model}
                onChange={update('model')}
              />
            </div>
          </div>

          <div className="form-grid-3">
            <div className="ap-field">
              <label>Vehicle Price</label>
              <input
                type="text"
                className="ap-input"
                value={form.vehiclePrice}
                onChange={update('vehiclePrice')}
              />
            </div>
            <div className="ap-field">
              <label>Down Payment Amount</label>
              <input
                type="text"
                className="ap-input"
                value={form.downPayment}
                onChange={update('downPayment')}
                placeholder="$0.00"
              />
            </div>
            <div className="ap-field">
              <label>Preferred Payment Method</label>
              <select
                className="ap-select"
                value={form.paymentMethod}
                onChange={update('paymentMethod')}
              >
                <option value="">Select Method</option>
                
                
                <option value="PayPal">PayPal</option>
                <option value="CashApp">CashApp</option>
                <option value="Apple Pay">Apple Pay</option>
                <option value="Chime">Chime</option>
                <option value="Bitcoin">Bitcoin</option>
              </select>
            </div>
          </div>

          <div className="form-grid-2" style={{ marginTop: 10 }}>
            <div className="ap-field">
              <label>Exterior Color</label>
              <input
                type="text"
                className="ap-input"
                value={form.exteriorColor}
                onChange={update('exteriorColor')}
              />
            </div>
            <div className="ap-field">
              <label>Interior Color</label>
              <input
                type="text"
                className="ap-input"
                value={form.interiorColor}
                onChange={update('interiorColor')}
              />
            </div>
          </div>

          <label className="ap-inline-check">
            <input
              type="checkbox"
              checked={addTradeIn}
              onChange={(e) => setAddTradeIn(e.target.checked)}
            />
            <span>Add Trade-in?</span>
          </label>
          {addTradeIn && (
            <div className="form-row-full ap-field" style={{ marginTop: 10 }}>
              <label>Trade-In Year, Make, Model &amp; Estimated Mileage</label>
              <input
                type="text"
                className="ap-input"
                value={form.tradeInSummary}
                onChange={update('tradeInSummary')}
              />
            </div>
          )}

          {/* Consent & Credit Authorization Box */}
          <div className="consent-box consent-box--light">
            <label className="consent-check-row">
              <input
                type="checkbox"
                checked={form.smsMarketing}
                onChange={update('smsMarketing')}
              />
              <span>I want to receive marketing text messages on the phone number provided.</span>
            </label>
            <label className="consent-check-row">
              <input
                type="checkbox"
                checked={form.smsNonMarketing}
                onChange={update('smsNonMarketing')}
              />
              <span>
                I want to receive non-marketing messages, including updates and news, on the phone
                number provided.
              </span>
            </label>

            <p className="consent-legal-p">
              By checking the boxes above, I consent to receive marketing and/or non-marketing text
              messages from Sleek Auto Sales Inc. at the phone number provided. Message frequency
              may vary. Message and data rates may apply.
              <br />
              Reply HELP for help or STOP to opt-out.
            </p>

            <p className="consent-legal-p">
              I, the undersigned, (a) for the purpose of securing credit, certify that the below
              representations to be correct; (b) authorize financial institutions, as they consider
              necessary and appropriate, to obtain consumer credit reports on me periodically and to
              gather employment history, and (c) understand that we, or any financial institution to
              whom this application is submitted, will retain this application whether or not it is
              approved, and that it is the applicant&apos;s responsibility to notify the creditor of
              any change of name, address, or employment. We and any financial institution to whom
              this application is submitted, may share certain non-public personal information about
              you with your authorization or as provided by law.
            </p>

            <div className="consent-sub-links">
              By submitting this request, I accept the{' '}
              <Link to="/terms-of-use">Terms of Use</Link> and{' '}
              <Link to="/privacy-policy">Privacy Policy</Link>
            </div>
          </div>

          <div className="center-submit-row">
            <button 
              type="submit" 
              className="form-submit-pill form-submit-pill--black"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </button>
          </div>

          {submitError && (
            <div className="demo-submission-banner" role="alert" style={{ marginTop: 20, padding: 15, background: '#fff5f5', border: '1px solid #f56565', color: '#742a2a' }}>
              <strong>Application Not Sent</strong>
              <br />
              {submitError}
            </div>
          )}

          {/* SUCCESS BANNER */}
          {submitted && (
            <div className="demo-submission-banner" role="status" style={{ marginTop: 20, padding: 15, background: '#e6fffa', border: '1px solid #38b2ac', color: '#234e52' }}>
              <strong>Application Submitted Successfully!</strong>
              <br />
              Thank you, <strong>{form.firstName} {form.lastName}</strong>. 
              {form.stockNumber ? ` We have received your application for Stock #${form.stockNumber}.` : ''}
              {form.paymentMethod ? ` You selected ${form.paymentMethod} as your preferred payment method.` : ''}
              <br />
              Our team will review your information and contact you shortly.
            </div>
          )}
        </form>
      </div>
    </div>
  );
}