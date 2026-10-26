import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ContactSection from '../components/ContactSection';

export default function ContactUs() {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    prefPhone: false,
    prefEmail: false,
    prefSms: false,
    message: '',
    smsMarketing: false,
    smsNonMarketing: false,
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (field) => (e) => {
    const val = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setForm((prev) => ({ ...prev, [field]: val }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div>
      <div className="page-title-band">
        <div className="container">
          <h1 className="page-main-heading">CONTACT US</h1>
        </div>
      </div>

      <section className="contact-top-section">
        <div className="container contact-two-col">
          {/* Left Feedback Intro */}
          <div className="contact-feedback-copy">
            <h2 className="contact-feedback-title">We Welcome Your Feedback and Comments</h2>
            <p>
              Do you have questions or comments for us? We’d love to hear them! Fill out the form
              below and we will get back to you as soon as possible.
            </p>
            <p>
              If you need help with any aspect of the buying process, please don’t hesitate to ask
              us. Our customer service representatives will be happy to assist you in any way.
              Whether through email, phone or in person, we’re here to help you get the customer
              service you deserve.
            </p>
          </div>

          {/* Right Contact Form */}
          <form onSubmit={handleSubmit}>
            <p className="required-note">All fields marked with an asterisk (*) are required</p>
            <div className="form-section-title" style={{ marginTop: 8 }}>
              Contact Information
            </div>

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

            <div className="contact-pref-row">
              <span>Contact Preference</span>
              <label>
                <input
                  type="checkbox"
                  checked={form.prefPhone}
                  onChange={handleChange('prefPhone')}
                />
                <span>Phone</span>
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={form.prefEmail}
                  onChange={handleChange('prefEmail')}
                />
                <span>Email</span>
              </label>
              <label>
                <input type="checkbox" checked={form.prefSms} onChange={handleChange('prefSms')} />
                <span>SMS</span>
              </label>
            </div>

            <div className="form-row-full">
              <textarea
                className="cf-textarea"
                placeholder="Message *"
                required
                maxLength={1024}
                value={form.message}
                onChange={handleChange('message')}
              />
              <div className="char-counter">
                Characters left: {(1024 - form.message.length).toLocaleString('en-US')}
              </div>
            </div>

            <div className="consent-box consent-box--light">
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
              <button type="submit" className="form-submit-pill">
                Submit
              </button>
            </div>

            {submitted && (
              <div className="demo-submission-banner" role="status">
                <strong>Message Validated Locally (Demonstration Mode)</strong>
                Thank you, <strong>{form.firstName} {form.lastName}</strong>. Your message preview
                was validated locally; because this project is an educational UI recreation,{' '}
                <strong>no message was sent to Sleek Auto Sales Inc.</strong>
              </div>
            )}
          </form>
        </div>
      </section>

      <ContactSection />
    </div>
  );
}
