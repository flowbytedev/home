import React from 'react';
import { Link } from 'react-router-dom';
import { vars } from './util';

/* ---------- the five illustrations. Each loops on its own in CSS (see "art" in site.css). ---------- */

type Cell = string | [bad: string, good: string];
// when the scanner line reaches each column, as an animation delay
const SCAN = ['-.43s', '.42s', '1.14s', '1.65s'];
const ROWS: Cell[][] = [
  ['Hamra', '2024-11-03', '12', '4.50'],
  [['HAMRA', 'Hamra'], ['03/11/24', '2024-11-03'], '8', ['4,5', '4.50']],
  ['Zahle', '2024-11-03', ['twelve', '12'], '3.20'],
  [['zahle.', 'Zahle'], ['3 Nov', '2024-11-03'], '20', ['$3.2', '3.20']],
];

/** A table cleaning itself: a scanner passes, bad values are replaced, the duplicate row is dropped. */
const CleanArt: React.FC = () => (
  <div className="art art-clean" aria-hidden="true">
    <div className="tbl">
      {['branch', 'date', 'qty', 'price'].map(h => <span key={h} className="th">{h}</span>)}
      {ROWS.map((row, r) => row.map((cell, c) => typeof cell === 'string'
        ? <span key={`${r}-${c}`} className="td">{cell}</span>
        : <span key={`${r}-${c}`} className="td fix" style={vars({ '--dl': SCAN[c] })}><s>{cell[0]}</s><b>{cell[1]}</b></span>))}
      {(ROWS[0] as string[]).map((cell, c) => <span key={`dup-${c}`} className="td dup">{cell}</span>)}
      <i className="scan" />
    </div>
    <span className="dup-note">duplicate removed</span>
  </div>
);

const DIMS: [name: string, x: number, y: number][] = [
  ['dim_date', 14, 20], ['dim_product', 378, 20], ['dim_store', 14, 166], ['dim_customer', 378, 166],
];
const WIRES = [
  'M142 42 C 190 42, 176 100, 204 104',
  'M378 42 C 330 42, 344 100, 316 104',
  'M142 188 C 190 188, 176 130, 204 126',
  'M378 188 C 330 188, 344 130, 316 126',
];

/** A star schema: four dimension tables feeding one fact table, a byte travelling down each wire. */
const ModelArt: React.FC = () => (
  <div className="art art-model" aria-hidden="true">
    <svg viewBox="0 0 520 230">
      <g className="wires">
        {WIRES.map((d, i) => <path key={i} id={`wire-${i}`} d={d} />)}
      </g>
      {DIMS.map(([name, x, y]) => (
        <g key={name} className="dim">
          <rect x={x} y={y} width="128" height="44" rx="10" />
          <text x={x + 64} y={y + 27}>{name}</text>
        </g>
      ))}
      <g className="fact">
        <rect x="204" y="80" width="112" height="70" rx="12" />
        <text x="260" y="111">fact_sales</text>
        <text className="sm" x="260" y="131">one source of truth</text>
      </g>
      <g className="bytes">
        {WIRES.map((_, i) => (
          <rect key={i} width="10" height="10" x="-5" y="-5">
            <animateMotion dur="2.4s" begin={`${i * 0.6}s`} repeatCount="indefinite">
              <mpath href={`#wire-${i}`} />
            </animateMotion>
          </rect>
        ))}
      </g>
    </svg>
  </div>
);

const MINI_BARS: [height: string, colour: string][] = [
  ['38%', 'var(--blue-hi)'], ['56%', 'var(--pink)'], ['46%', 'var(--blue-hi)'], ['72%', 'var(--mint)'],
  ['60%', 'var(--blue-hi)'], ['84%', 'var(--pink)'], ['70%', 'var(--blue-hi)'], ['96%', 'var(--mint)'],
];

/** A small dashboard whose bars rise and whose trend line draws. */
const DashArt: React.FC = () => (
  <div className="art art-dash" aria-hidden="true">
    <div className="mini">
      <div className="mini-k"><i /><i /><i /></div>
      <div className="mini-bars">
        {MINI_BARS.map(([h, c], i) => <i key={i} style={vars({ '--h': h, '--i': i, '--c': c })} />)}
        <svg viewBox="0 0 300 100" preserveAspectRatio="none">
          <path pathLength={1} d="M0 82 C40 74 60 86 100 62 S170 34 200 44 S270 12 300 16" />
        </svg>
      </div>
    </div>
  </div>
);

/** History up to today, then a forecast drawing itself with its range. */
const ForecastArt: React.FC = () => (
  <div className="art art-ml" aria-hidden="true">
    <svg viewBox="0 0 340 190">
      <g className="grid">
        <line x1="0" y1="45" x2="340" y2="45" /><line x1="0" y1="95" x2="340" y2="95" /><line x1="0" y1="145" x2="340" y2="145" />
      </g>
      <path className="band" d="M190 96 L332 34 L332 104 Z" />
      <path className="hist" d="M8 152 L38 134 L68 142 L98 114 L128 122 L158 92 L190 96" />
      <path className="fore" pathLength={1} d="M190 96 L226 80 L262 86 L296 62 L332 66" />
      <line className="today" x1="190" y1="34" x2="190" y2="176" />
      <circle className="ring" cx="190" cy="96" r="8" />
      <rect className="now" x="183" y="89" width="14" height="14" />
      <text x="10" y="24">actual</text><text x="202" y="24">forecast</text>
    </svg>
  </div>
);

/** A metric crossing its threshold, and the alert that goes out when it does. */
const AlertArt: React.FC = () => (
  <div className="art art-alert" aria-hidden="true">
    <svg viewBox="0 0 340 190">
      <line className="thr" x1="0" y1="118" x2="340" y2="118" />
      <text x="6" y="136">20% below usual</text>
      <path className="sig" pathLength={1} d="M0 70 L40 62 L80 76 L120 58 L160 72 L200 64 L240 92 L276 146 L308 138 L340 150" />
      <circle className="hit-ring" cx="257" cy="118" r="9" />
      <rect className="hit" x="250" y="111" width="14" height="14" />
    </svg>
    <div className="toast">
      <svg className="bell" viewBox="0 0 24 24">
        <path d="M12 3a6 6 0 0 0-6 6v4l-2 3.5h16L18 13V9a6 6 0 0 0-6-6Z" /><path d="M9.5 19.5a2.5 2.5 0 0 0 5 0" />
      </svg>
      <div><b>Zahle sales dropped</b><small>Sent to the branch manager, 08:02</small></div>
    </div>
  </div>
);

/* ---------- the cards ---------- */

interface CardProps {
  colour: string;
  /** White text, for the one card whose colour is too dark for ink. */
  light?: boolean;
  wide?: boolean;
  delay?: string;
  title: string;
  text: string;
  covers: string[];
  get: string;
  children: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ colour, light, wide, delay, title, text, covers, get, children }) => (
  <article
    className={`card rv${wide ? ' w3' : ''}${light ? ' light' : ''}`}
    style={vars({ '--bg': colour, ...(delay ? { '--d': delay } : {}) })}
  >
    {children}
    <h3>{title}</h3>
    <p>{text}</p>
    <ul className="covers">{covers.map(c => <li key={c}>{c}</li>)}</ul>
    <p className="get"><b>You get</b> {get}</p>
  </article>
);

const Services: React.FC = () => (
  <section className="services" id="services">
    <div className="wrap">
      <h2 className="h2 rv">From scattered data to numbers you trust.</h2>
      <p className="sub rv" style={vars({ '--d': '.08s' })}>
        Take one service on its own or the whole path end to end: a full data foundation, better reporting, or a single targeted dashboard.
      </p>

      <div className="bento">
        <Card
          colour="var(--blue)" light wide
          title="Data management and quality"
          text="We clean, organise and automate your data flows, so you can trust the numbers."
          covers={['Source mapping', 'Cleaning rules', 'Automated pipelines', 'Reconciliation checks', 'Governance basics']}
          get="a data source map, automated pipelines, quality rules with a monitoring checklist, and handover documentation."
        >
          <CleanArt />
        </Card>

        <Card
          colour="var(--pink)" wide delay=".08s"
          title="Data modelling and a single source of truth"
          text="We design models that make reporting fast, consistent and easy to maintain."
          covers={['KPI definitions', 'Facts and dimensions', 'Faster reporting', 'Built to grow']}
          get="a data model and KPI dictionary, a dataset optimised for BI, and usage guidelines."
        >
          <ModelArt />
        </Card>

        <Card
          colour="var(--sun)"
          title="Reporting and dashboards"
          text="Intuitive, interactive Power BI dashboards that people adopt and decide from."
          covers={['Role-based views', 'KPI pages and drilldowns', 'Executive summaries', 'Automated exports']}
          get="a dashboard suite for executives and teams, a KPI tree, and a training session with a guide."
        >
          <DashArt />
        </Card>

        <Card
          colour="var(--orange)" delay=".08s"
          title="AI and machine learning"
          text="Move from what happened to what will happen, with practical models that predict trends."
          covers={['Demand forecasting', 'Churn prediction', 'Segmentation', 'Anomaly detection']}
          get="deployed models in Python or SQL, scores inside your Power BI dashboards, and performance monitoring."
        >
          <ForecastArt />
        </Card>

        <Card
          colour="var(--mint)" delay=".16s"
          title="Automated reporting, alerts and workflows"
          text="Be proactive, not reactive. Get told when something needs attention."
          covers={['Scheduled reports', 'Threshold alerts', 'Email summaries', 'Fewer manual tasks']}
          get="automated workflows, alert rules with their recipients, and maintenance documentation."
        >
          <AlertArt />
        </Card>
      </div>

      <div className="fit rv">
        <div>
          <h3>Not sure which service fits?</h3>
          <p>We will recommend the best path based on your data maturity, your timelines and your business priorities.</p>
        </div>
        <Link className="btn" to="/contact">Book a discovery call</Link>
      </div>
    </div>
  </section>
);

export default Services;
