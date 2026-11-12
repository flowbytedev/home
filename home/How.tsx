import React, { useRef, useState } from 'react';
import { clamp, reducedMotion, useScroll, vars } from './util';

const STEPS: [name: string, text: string, colour: string][] = [
  ['Discover', 'We align on business objectives, stakeholders, KPIs and your current data sources.', 'var(--blue-hi)'],
  ['Build', 'We design the data model, automate the pipelines and develop dashboards around real workflows.', 'var(--pink)'],
  ['Validate', 'We run checks and reconcile against existing reports, until the numbers are accurate and trusted.', 'var(--sun)'],
  ['Enable', 'We train your users, hand over documentation and set a roadmap for continuous improvement.', 'var(--mint)'],
];

/** The four steps. A byte runs along the rail as the section scrolls past and lights each step it reaches. */
const How: React.FC = () => {
  const list = useRef<HTMLOListElement>(null);
  const [reached, setReached] = useState(0);

  useScroll(() => {
    const el = list.current;
    if (!el) return;
    const top = el.getBoundingClientRect().top, vh = window.innerHeight;
    const p = clamp((vh * 0.86 - top) / (vh * 0.56));
    el.style.setProperty('--p', p.toFixed(4));   // read by the rail in site.css
    setReached(reducedMotion() ? STEPS.length : STEPS.filter((_, i) => p >= i / STEPS.length + 0.02).length);
  });

  return (
    <section className="how">
      <div className="wrap">
        <h2 className="h2 rv">How we work.</h2>
        <ol className="steps" ref={list}>
          <li className="rail" aria-hidden="true"><i /><b /></li>
          {STEPS.map(([name, text, c], i) => (
            <li key={name} className={`step${i < reached ? ' on' : ''}`} style={vars({ '--c': c })}>
              <span className="n">{i + 1}</span>
              <h3>{name}</h3>
              <p>{text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};

export default How;
