import React from 'react';
import { Link } from 'react-router-dom';
import { vars } from './util';

// colour, left offset, size, animation delay of the bytes drifting up behind the mark
export const FLOATERS: [string, string, string, string][] = [
  ['var(--blue)', '-8%', '26px', '0s'],
  ['var(--pink)', '22%', '18px', '1.3s'],
  ['var(--mint)', '58%', '22px', '.6s'],
  ['#fff', '88%', '16px', '2s'],
  ['var(--orange)', '104%', '24px', '2.7s'],
];

export const Floaters: React.FC = () => (
  <>
    {FLOATERS.map(([c, x, s, t]) => <i key={x} className="fb" style={vars({ '--c': c, '--x': x, '--s': s, '--t': t })} />)}
  </>
);

const Closing: React.FC = () => (
  <section className="closing">
    <div className="wrap">
      <div>
        <h2 className="rv">Ready to turn data into your best asset?</h2>
        <p className="sub rv" style={vars({ '--d': '.08s' })}>
          Let's talk through your data challenges and build a roadmap for getting past them.
        </p>
        <div className="cta rv" style={vars({ '--d': '.14s' })}>
          <Link className="btn dark" to="/contact">Book a discovery call</Link>
          <Link className="btn line" to="/services">View all services</Link>
        </div>
        <ul className="why rv" style={vars({ '--d': '.2s' })}>
          <li>Discuss your specific data challenges and bottlenecks.</li>
          <li>Explore solutions that fit your infrastructure.</li>
          <li>Leave with a clear roadmap from chaos to clarity.</li>
        </ul>
      </div>
      <div className="bigmark" aria-hidden="true">
        <Floaters />
        <div className="tile">
          <svg viewBox="0 0 64 64">
            <path d="M32 8.86L45.44 22.29A19 19 0 1 1 18.56 22.29Z" fill="#fff" />
            <rect className="byte" x="24.5" y="28.23" width="15" height="15" fill="#ffc21f" />
          </svg>
        </div>
      </div>
    </div>
  </section>
);

export default Closing;
