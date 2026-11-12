import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { FLOW_COLORS, FLOW_SCENES, startFlow } from './heroFlow';
import { vars } from './util';

const TOOLS: [name: string, colour: string][] = [
  ['Power BI', 'var(--sun)'], ['Snowflake', 'var(--blue-hi)'], ['Tableau', 'var(--pink)'], ['PostgreSQL', 'var(--mint)'],
  ['Azure', 'var(--blue-hi)'], ['SQL Server', 'var(--orange)'], ['Dagster', 'var(--mint)'], ['Python', 'var(--sun)'],
  ['Streamlit', 'var(--pink)'], ['AWS', 'var(--orange)'], ['SSIS', 'var(--blue-hi)'], ['AI and ML', 'var(--pink)'],
];

const Tools: React.FC<{ hidden?: boolean }> = ({ hidden }) => (
  <>
    {TOOLS.map(([name, c]) => (
      <span key={name} className="tool" aria-hidden={hidden || undefined}><i style={vars({ '--c': c })} />{name}</span>
    ))}
  </>
);

/**
 * The hero does what the headline says: messy data comes in on the left and leaves as a chart on
 * the dashboard. The moving part is the canvas driven by heroFlow.ts; the card it lands on, the
 * pipe and the copy are plain elements it measures.
 */
const Hero: React.FC = () => {
  const hero = useRef<HTMLElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const matrix = useRef<HTMLDivElement>(null);
  const pipe = useRef<HTMLDivElement>(null);
  const copy = useRef<HTMLDivElement>(null);
  const screen = useRef<HTMLDivElement>(null);
  const [scene, setScene] = useState(0);

  useEffect(() => {
    if (!hero.current || !canvas.current || !matrix.current || !pipe.current || !copy.current || !screen.current) return;
    return startFlow(
      { hero: hero.current, canvas: canvas.current, matrix: matrix.current, pipe: pipe.current, copy: copy.current, screen: screen.current },
      setScene,
    );
  }, []);

  const s = FLOW_SCENES[scene];

  return (
    <section className="hero" ref={hero}>
      <canvas className="flow" ref={canvas} aria-hidden="true" />
      <div className="pipe" ref={pipe} aria-hidden="true"><span>Clean, model, validate</span></div>

      <div className="wrap hero-in">
        <div className="hero-copy" ref={copy}>
          <h1>
            <span className="ln"><span>Data in.</span></span>
            <span className="ln"><span>Decisions</span></span>
            <span className="ln"><span>out.</span></span>
          </h1>
          <p className="lede">We build reliable data foundations and clear dashboards, so your teams can track performance, spot issues early and act with confidence.</p>
          <div className="cta">
            <Link className="btn" to="/contact">Book a call</Link>
            <Link className="btn ghost" to="/services">See what we build</Link>
          </div>
          <ul className="facts">
            <li><i style={vars({ '--c': 'var(--mint)' })} />One trusted source of truth for every department</li>
            <li><i style={vars({ '--c': 'var(--sun)' })} />Dashboards ready in seconds, not compiled over days</li>
            <li><i style={vars({ '--c': 'var(--pink)' })} />Alerts when something needs your attention</li>
          </ul>
        </div>

        {/* A sample dashboard. Its figures are illustrative. */}
        <div className="screen" ref={screen} aria-hidden="true">
          <div className="scr-top">
            <b>{s.title}</b>
            <span className="live"><i />Live</span>
          </div>
          <div className="kpis">
            <div className="kpi"><span>Revenue</span><b>$3.9M</b><em>+4.2%</em></div>
            <div className="kpi"><span>Margin</span><b>22.4%</b><em>+0.6 pt</em></div>
            <div className="kpi"><span>Last refresh</span><b>06:00</b><em>on schedule</em></div>
          </div>
          <div className="matrix" ref={matrix} />
          <div className="scr-cap" key={scene}>
            {s.legend
              ? s.legend.map((t, i) => <span key={t}><i style={vars({ '--c': FLOW_COLORS[i] })} />{t}</span>)
              : <span>{s.caption}</span>}
          </div>
        </div>
      </div>

      <div className="strip">
        <span className="strip-label">Built with</span>
        <div className="marq">
          {/* the list twice, so the loop has no seam */}
          <div className="marq-track"><Tools /><Tools hidden /></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
