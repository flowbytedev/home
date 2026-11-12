import React, { useRef, useState } from 'react';
import { clamp, reducedMotion, useScroll, vars } from './util';

const MISSION = 'Our mission is to make data clear, trusted and useful, so teams spend less time compiling numbers and more time improving results.';
const WORDS = MISSION.split(' ');

const DIFFERENT: { title: string; text: string; colour: string; icon: React.ReactNode }[] = [
  {
    title: 'Business-first KPI design',
    text: 'We do not just visualise. We define the metrics that matter to your P&L.',
    colour: 'var(--blue)',
    icon: <><circle cx="12" cy="12" r="8.5" /><circle cx="12" cy="12" r="4.5" /><rect className="f" x="10.6" y="10.6" width="2.8" height="2.8" /></>,
  },
  {
    title: 'Strong data validation',
    text: 'Rigorous reconciliation makes sure your dashboards match your financials.',
    colour: 'var(--sun)',
    icon: <><path d="M12 3l7.5 3v5.5c0 4.6-3.1 7.9-7.5 9.5-4.4-1.6-7.5-4.9-7.5-9.5V6L12 3Z" /><path d="M8.5 12l2.5 2.5 4.5-5" /></>,
  },
  {
    title: 'Clean, scalable structure',
    text: 'Architected for growth, so your data model does not break as you scale.',
    colour: 'var(--mint)',
    icon: <><rect x="3.5" y="13" width="7.5" height="7.5" /><rect x="13" y="13" width="7.5" height="7.5" /><rect x="8.2" y="3.5" width="7.5" height="7.5" /></>,
  },
  {
    title: 'Enablement focus',
    text: 'Training and documentation, so the work is still used long after handover.',
    colour: 'var(--orange)',
    icon: <><path d="M2.5 9.5L12 5l9.5 4.5L12 14 2.5 9.5Z" /><path d="M6.5 11.5v4.8c1.6 1.5 3.4 2.2 5.5 2.2s3.9-.7 5.5-2.2v-4.8M21.5 9.5v6" /></>,
  },
];

/** The mission statement lights up word by word as it scrolls past, followed by what sets us apart. */
const About: React.FC = () => {
  const mission = useRef<HTMLParagraphElement>(null);
  const [lit, setLit] = useState(0);

  useScroll(() => {
    const el = mission.current;
    if (!el) return;
    const r = el.getBoundingClientRect(), vh = window.innerHeight;
    const p = clamp((vh * 0.88 - r.top) / (vh * 0.5 + r.height * 0.5));
    setLit(reducedMotion() ? WORDS.length : Math.round(p * WORDS.length));
  });

  return (
    <section className="about" id="about">
      <div className="wrap">
        <p className="mission" ref={mission}>
          {WORDS.map((w, i) => (
            <React.Fragment key={i}>
              <span className={`w${i < lit ? ' lit' : ''}`}>{w}</span>{' '}
            </React.Fragment>
          ))}
        </p>

        <h2 className="about-h rv">How we are different</h2>
        <ul className="diff">
          {DIFFERENT.map((d, i) => (
            <li key={d.title} className="rv" style={vars({ '--c': d.colour, '--d': `${i * 0.07}s` })}>
              <i className="ic"><svg viewBox="0 0 24 24" aria-hidden="true">{d.icon}</svg></i>
              <h3>{d.title}</h3>
              <p>{d.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default About;
