import React from 'react';
import { Link } from 'react-router-dom';
import { DEALERSHIP_INFO } from '../data/vehicles';

export default function TermsOfUse() {
  return (
    <div>
      <div className="page-title-band">
        <div className="container">
          <h1 className="page-main-heading">TERMS OF USE</h1>
        </div>
      </div>

      <section className="legal-page-section">
        <div className="container legal-content">
          <h2>SMS Terms of Service</h2>
          <p>
            1. When you opt-in to the service, we will send you a message to confirm your signup.
            Depending on your selection, you may receive marketing and non-marketing messages which
            include offers, news, and updates. Message frequency varies. Message and data rates may
            apply. Consent to receive marketing messages is not a condition of any purchase. Text
            “HELP” for help. Text “STOP” to cancel.
          </p>
          <p>
            2. You can cancel this service at any time. Just text “STOP” to the number that texted
            you. After you send the message “STOP” to us, we will send you a reply message to
            confirm that you have been unsubscribed. After this, you will no longer receive messages
            from us. If you want to join again, just sign up as you did the first time and we will
            start sending messages to you again.
          </p>
          <p>
            3. If at any time you forget what keywords are supported, just text “HELP” to the number
            that texted you. After you send the message “HELP” to us, we will respond with
            instructions on how to use our service as well as how to unsubscribe.
          </p>
          <p>4. Carriers are not liable for delayed or undelivered messages.</p>
          <p>
            5. For all questions about the messages sent to you by us, you can send an email to{' '}
            <a href={`mailto:${DEALERSHIP_INFO.email}`} style={{ textDecoration: 'underline' }}>
              {DEALERSHIP_INFO.email}
            </a>
            .
          </p>
          <p>
            6. If you have any questions regarding privacy, please read our{' '}
            <Link to="/privacy-policy" style={{ textDecoration: 'underline' }}>
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </section>
    </div>
  );
}
