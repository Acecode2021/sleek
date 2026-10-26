import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import emailjs from '@emailjs/browser';

export default function CarFinder() {
  const [form, setForm] = useState({
    make: '',
    model: '',
    year: '',
    maxMileage: '',
    priceRange: '',
    desiredFeatures: '',
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    comments: '',
    smsMarketing: false,
    smsNonMarketing: false,
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({ type: '', message: '' });

  const handleChange = (field) => (e) => {
    const val = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setForm((prev) => ({ ...prev, [field]: val }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_CARFINDER_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
    if (!serviceId || !templateId || !publicKey) {
      setSubmitStatus({
        type: 'error',
        message: 'Email delivery is not configured. Check the EmailJS service ID, Car Finder template ID, and public key.',
      });
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus({ type: '', message: '' });

    try {
      await emailjs.send(serviceId, templateId, form, publicKey);

      setSubmitStatus({ 
        type: 'success', 
        message: 'Your Car Finder request has been sent successfully! We will contact you soon.' 
      });
      
      // Reset the form after successful submission
      setForm({
        make: '', model: '', year: '', maxMileage: '', priceRange: '', desiredFeatures: '',
        firstName: '', lastName: '', phone: '', email: '', comments: '',
        smsMarketing: false, smsNonMarketing: false,
      });

    } catch (error) {
      const detail = error?.text || error?.message;
      console.error('EmailJS Error:', { status: error?.status, detail });
      setSubmitStatus({ 
        type: 'error', 
        message: detail
          ? `Email delivery failed: ${detail}`
          : 'Email delivery failed. Check the EmailJS service/template pairing and try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <div className="page-title-band">
        <div className="container">
          <h1 className="page-main-heading">CAR FINDER</h1>
        </div>
      </div>

      <section className="car-finder-band">
        <div className="car-finder-container">
          <div className="car-finder-intro">
            <h2>Don’t see the car you are looking for? We can help you find it!</h2>
            <p>Just fill out the form below and we’ll help you look for the car you want.</p>
          </div>

          <p className="required-note">All fields marked with an asterisk (*) are required</p>

          <form onSubmit={handleSubmit}>
            <div className="form-section-title">Vehicle Information</div>

            <div className="form-grid-2">
              <input
                type="text"
                className="cf-input"
                placeholder="Make *"
                required
                value={form.make}
                onChange={handleChange('make')}
              />
              <input
                type="text"
                className="cf-input"
                placeholder="Model *"
                required
                value={form.model}
                onChange={handleChange('model')}
              />
            </div>

            <div className="form-grid-2">
              <input
                type="text"
                className="cf-input"
                placeholder="Year *"
                required
                value={form.year}
                onChange={handleChange('year')}
              />
              <input
                type="text"
                className="cf-input"
                placeholder="Max Mileage *"
                required
                value={form.maxMileage}
                onChange={handleChange('maxMileage')}
              />
            </div>

            <div className="form-row-full">
              <select
                className="cf-select"
                required
                value={form.priceRange}
                onChange={handleChange('priceRange')}
              >
                <option value="">Price Range *</option>
                <option value="Under $15,000">Under $15,000</option>
                <option value="$15,000 - $25,000">$15,000 - $25,000</option>
                <option value="$25,000 - $40,000">$25,000 - $40,000</option>
                <option value="$40,000 - $55,000">$40,000 - $55,000</option>
                <option value="$55,000+">$55,000+</option>
              </select>
            </div>

            <div className="form-row-full">
              <textarea
                className="cf-textarea"
                placeholder="Desired Features"
                maxLength={1024}
                value={form.desiredFeatures}
                onChange={handleChange('desiredFeatures')}
              />
              <div className="char-counter">
                Characters left: {(1024 - form.desiredFeatures.length).toLocaleString('en-US')}
              </div>
            </div>

            <div className="form-section-title">Contact Information</div>

            <div className="form-grid-2">
              <input
                type="text"
                className="cf-input"
                placeholder="First Name *"
                required
                value={form.firstName}
                onChange={handleChange('firstName')}
              />
              <input
                type="text"
                className="cf-input"
                placeholder="Last Name *"
                required
                value={form.lastName}
                onChange={handleChange('lastName')}
              />
            </div>

            <div className="form-grid-2">
              <input
                type="tel"
                className="cf-input"
                placeholder="Phone Number *"
                required
                value={form.phone}
                onChange={handleChange('phone')}
              />
              <input
                type="email"
                className="cf-input"
                placeholder="Email *"
                required
                value={form.email}
                onChange={handleChange('email')}
              />
            </div>

            <div className="form-row-full">
              <textarea
                className="cf-textarea"
                placeholder="Comments"
                maxLength={1024}
                value={form.comments}
                onChange={handleChange('comments')}
              />
              <div className="char-counter">
                Characters left: {(1024 - form.comments.length).toLocaleString('en-US')}
              </div>
            </div>

            <div className="consent-box">
              <label className="consent-check-row">
                <input
                  type="checkbox"
                  checked={form.smsMarketing}
                  onChange={handleChange('smsMarketing')}
                />
                <span>I want to receive marketing text messages on the phone number provided.</span>
              </label>
              <label className="consent-check-row">
                <input
                  type="checkbox"
                  checked={form.smsNonMarketing}
                  onChange={handleChange('smsNonMarketing')}
                />
                <span>
                  I want to receive non-marketing messages, including updates and news, on the phone
                  number provided.
                </span>
              </label>

              <p className="consent-legal-p">
                By checking the boxes above, I consent to receive marketing and/or non-marketing
                text messages from Sleek Auto Sales Inc. at the phone number provided. Message
                frequency may vary. Message and data rates may apply.
                <br />
                Reply HELP for help or STOP to opt-out.
              </p>

              <div className="consent-sub-links">
                By submitting this request, I accept the{' '}
                <Link to="/terms-of-use">Terms of Use</Link> and{' '}
                <Link to="/privacy-policy">Privacy Policy</Link>
              </div>
            </div>

            <div className="center-submit-row">
              <button type="submit" className="form-submit-pill" disabled={isSubmitting}>
                {isSubmitting ? 'Sending...' : 'Submit'}
              </button>
            </div>
          </form>

          {/* Success / Error Banner */}
          {submitStatus.message && (
            <div 
              className="demo-submission-banner" 
              role="status" 
              style={{ 
                marginTop: 20, 
                padding: 15, 
                background: submitStatus.type === 'success' ? '#e6fffa' : '#fff5f5', 
                border: submitStatus.type === 'success' ? '1px solid #38b2ac' : '1px solid #f56565', 
                color: submitStatus.type === 'success' ? '#234e52' : '#742a2a' 
              }}
            >
              <strong>{submitStatus.type === 'success' ? 'Request Sent Successfully!' : 'Submission Failed'}</strong>
              <br />
              {submitStatus.message}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}