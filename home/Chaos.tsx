import React, { useEffect, useRef, useState } from 'react';
import { vars } from './util';

type View = 'before' | 'after';

// [pain, outcome, tilt, x offset, y offset]: how far each card sits out of line while it is a problem
const PAIRS: [string, string, string, string, string][] = [
  ['Reporting takes days to compile by hand', 'Automated dashboards, ready in seconds', '-4deg', '6px', '14px'],
  ['Departments report conflicting numbers', 'One trusted source of truth for everyone', '3deg', '-4px', '-12px'],
  ['Constant fire-fighting with messy data', 'Stable pipelines and proactive quality checks', '-2deg', '0px', '22px'],
  ['No visibility on what drives performance', 'Clear KPIs and drill-down insights', '5deg', '-8px', '-6px'],
  ['Teams ignore complex spreadsheets', 'Role-based views they actually use', '-3deg', '4px', '16px'],
];

/**
 * Five problems as a crooked pile of cards. The switch (or a click on the cards) turns each one
 * over to what it becomes, in a straight row. It flips by itself once, the first time it is seen.
 */
const Chaos: React.FC = () => {
  const [view, setView] = useState<View>('before');
  const touched = useRef(false);
  const pairs = useRef<HTMLOListElement>(null);

  const choose = (v: View) => { touched.current = true; setView(v); };

  useEffect(() => {
    const el = pairs.current;
    if (!el) return;
    let timer = 0;
    const io = new IntersectionObserver(entries => {
      if (!entries[0].isIntersecting) return;
      io.disconnect();
      timer = window.setTimeout(() => { if (!touched.current) setView('after'); }, 1400);
    }, { threshold: 0.6 });
    io.observe(el);
    return () => { io.disconnect(); window.clearTimeout(timer); };
  }, []);

  return (
    <section className="chaos">
      <div className="wrap">
        <div className="chaos-head">
          <div>
            <h2 className="h2 rv">From chaos to clarity.</h2>
            <p className="sub rv" style={vars({ '--d': '.08s' })}>
              Five common data headaches, and what each one turns into once the data is in order.
            </p>
          </div>
          <div className="switch rv" data-v={view} role="group" aria-label="Show before or after">
            <button type="button" aria-pressed={view === 'before'} onClick={() => choose('before')}>Before</button>
            <button type="button" aria-pressed={view === 'after'} onClick={() => choose('after')}>After</button>
          </div>
        </div>

        <ol className="pairs" ref={pairs} data-v={view} onClick={() => choose(view === 'after' ? 'before' : 'after')}>
          {PAIRS.map(([pain, gain, r, x, y], i) => (
            <li key={pain} className="pair" style={vars({ '--i': i, '--r': r, '--x': x, '--y': y })}>
              <div className="face pain" aria-hidden={view === 'after'}>
                <i className="mk">!</i>
                <span>{pain}</span>
              </div>
              <div className="face gain" aria-hidden={view === 'before'}>
                <i className="mk"><svg viewBox="0 0 24 24"><path d="M5 12.5l4.5 4.5L19 7.5" /></svg></i>
                <span>{gain}</span>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};

export default Chaos;
