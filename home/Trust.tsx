import React from 'react';
import { vars } from './util';

const INDUSTRIES: [name: string, colour: string, tilt: string][] = [
  ['Retail', 'var(--sun)', '-2.5deg'],
  ['FMCG', 'var(--pink)', '2deg'],
  ['Marketing', 'var(--mint)', '-1.5deg'],
  ['Engineering', '#fff', '2.5deg'],
];

/** The blue band. The industries are stickers that pop in once the band is on screen. */
const Trust: React.FC = () => (
  <section className="trust">
    <div className="wrap">
      <p className="trust-line">
        Trusted by teams across{' '}
        {INDUSTRIES.map(([name, c, r], i) => (
          <React.Fragment key={name}>
            <span className="tag" style={vars({ '--c': c, '--r': r, '--i': i })}>{name}</span>{' '}
          </React.Fragment>
        ))}
        and other industries.
      </p>
      <p className="trust-sub">We support decision-makers with data that is accurate and on time.</p>
    </div>
  </section>
);

export default Trust;
