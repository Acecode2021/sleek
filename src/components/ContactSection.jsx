import React from 'react';
import { DEALERSHIP_INFO } from '../data/vehicles';

export default function ContactSection() {
  const currentDayIndex = new Date().getDay();

  return (
    <section className="contact-office-band" aria-label="Sales Office and Directions">
      <div className="container contact-office-grid">
        <div>
          <h2 className="office-dealer-name">{DEALERSHIP_INFO.name}</h2>
          <h3 className="office-sub-heading">Sales Office</h3>
          <div className="office-phones">
            <div>
              <strong>Phone</strong>{' '}
              <a href={DEALERSHIP_INFO.phoneHref}>{DEALERSHIP_INFO.phoneDisplay}</a>
            </div>
            <div>
              <strong>Text</strong>{' '}
              <a href={DEALERSHIP_INFO.textHref}>{DEALERSHIP_INFO.textDisplay}</a>
            </div>
          </div>

          <table className="office-hours-table" aria-label="Store Hours">
            <tbody>
              {DEALERSHIP_INFO.dailyHours.map((row) => (
                <tr
                  key={row.day}
                  className={row.dayIndex === currentDayIndex ? 'is-today' : ''}
                >
                  <td>
                    <strong>{row.day}</strong>
                  </td>
                  <td>{row.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </section>
  );
}
