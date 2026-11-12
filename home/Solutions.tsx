import React, { useEffect, useRef, useState } from 'react';
import { reducedMotion, vars } from './util';

/*
  Four sample dashboards behind tabs. The tabs advance by themselves every few seconds while the
  section is on screen, until someone picks one. Every figure here is made up, and the page says so.
*/

const BRANCHES = ['Hamra', 'Jounieh', 'Achrafieh', 'Verdun', 'Byblos', 'Zahle'];
const UP = 'var(--mint)', DOWN = 'var(--pink)', WARN = 'var(--sun)';
const ADVANCE_MS = 7000;   // keep in step with the tabprog animation in site.css

const Legend: React.FC<{ items: [label: string, colour: string, width?: string][] }> = ({ items }) => (
  <div className="lg">
    {items.map(([label, c, w]) => (
      <span key={label}><i style={vars({ '--c': c, ...(w ? { width: w } : {}) })} />{label}</span>
    ))}
  </div>
);

const ExecChart: React.FC = () => {
  const revenue = [0.52, 0.48, 0.58, 0.6, 0.55, 0.66, 0.7, 0.64, 0.74, 0.8, 0.78, 0.92];
  const margin = [0.5, 0.46, 0.5, 0.56, 0.52, 0.58, 0.62, 0.55, 0.64, 0.66, 0.7, 0.76];
  const months = 'JFMAMJJASOND';
  const x = (i: number) => 8 + i * 39.5;
  const points = margin.map((m, i) => [x(i) + 13, 196 - m * 205]);
  const line = points.map((p, i) => `${i ? 'L' : 'M'}${p[0]} ${p[1].toFixed(1)}`).join(' ');
  return (
    <>
      <h4>Revenue and margin by month</h4>
      <svg className="ch" viewBox="0 0 480 248" role="img" aria-label="Monthly revenue bars with a margin line">
        {revenue.map((v, i) => (
          <rect key={i} className="gy" style={vars({ '--i': i })} x={x(i)} y={222 - v * 205} width="26" height={v * 205} rx="5" />
        ))}
        <path className="ln2" pathLength={1} d={line} />
        {points.map((p, i) => (
          <rect key={i} className="pt" style={vars({ '--i': i })} x={p[0] - 4.5} y={p[1] - 4.5} width="9" height="9" />
        ))}
        {revenue.map((_, i) => <text key={i} x={x(i) + 13} y="242" textAnchor="middle">{months[i]}</text>)}
      </svg>
      <Legend items={[['Revenue', 'var(--blue)'], ['Margin', 'var(--sun)']]} />
    </>
  );
};

const SalesChart: React.FC = () => {
  const rows: [share: number, value: string][] = [[92, '$412k'], [86, '$389k'], [79, '$356k'], [74, '$335k'], [67, '$301k'], [55, '$249k']];
  return (
    <>
      <h4>Sales by branch against target</h4>
      {rows.map(([share, value], i) => (
        <div key={BRANCHES[i]} className="hb">
          <span>{BRANCHES[i]}</span>
          <div className="trk"><i className={share < 70 ? 'lo' : undefined} style={vars({ '--w': `${share}%`, '--i': i })} /></div>
          <b>{value}</b>
        </div>
      ))}
      <Legend items={[['On target', 'var(--orange)'], ['Below target', 'var(--pink)'], ['Target', 'var(--ink)', '3px']]} />
    </>
  );
};

const CustChart: React.FC = () => {
  const cohorts = ['May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'];
  const base = [100, 64, 51, 44, 40, 37];
  let n = 0;
  return (
    <>
      <h4>Customers still buying, % by month since first order</h4>
      <div className="coh">
        <span />
        {base.map((_, m) => <span key={m} style={{ textAlign: 'center' }}>M{m}</span>)}
        {cohorts.map((cohort, r) => (
          <React.Fragment key={cohort}>
            <span>{cohort}</span>
            {base.map((b, m) => {
              if (m > 5 - r) return <u key={m} />;   // months that have not happened yet for this cohort
              const v = m ? Math.round(b + r * 1.6 + ((r * 7 + m * 3) % 5) - 2) : 100;
              return <i key={m} style={vars({ '--v': v, '--i': n++ })}>{v}</i>;
            })}
          </React.Fragment>
        ))}
      </div>
    </>
  );
};

const InvChart: React.FC = () => {
  const rows: [category: string, healthy: number, low: number, out: number][] = [
    ['Dairy', 78, 14, 8], ['Bakery', 70, 18, 12], ['Beverages', 90, 8, 2], ['Produce', 64, 22, 14], ['Household', 94, 5, 1], ['Frozen', 84, 11, 5],
  ];
  return (
    <>
      <h4>Stock health by category</h4>
      {rows.map(([category, healthy, low, out], i) => (
        <div key={category} className="stk">
          <span>{category}</span>
          <div style={vars({ '--i': i })}>
            <i style={{ width: `${healthy}%`, background: 'var(--mint)' }} />
            <i style={{ width: `${low}%`, background: 'var(--sun)' }} />
            <i style={{ width: `${out}%`, background: 'var(--pink)' }} />
          </div>
        </div>
      ))}
      <Legend items={[['Healthy', 'var(--mint)'], ['Running low', 'var(--sun)'], ['Out of stock', 'var(--pink)']]} />
    </>
  );
};

interface Solution {
  colour: string;
  tab: string;
  blurb: string;
  title: string;
  chips: string[];
  /** label, value, note, and whether the note is good news */
  kpis: [string, string, string, boolean][];
  Chart: React.FC;
  sideTitle: string;
  side: [label: string, value: string, colour: string][];
}

const SOLUTIONS: Solution[] = [
  {
    colour: 'var(--blue)', tab: 'Executive performance',
    blurb: 'One view for leadership: revenue, margin, growth and what drives them, always up to date.',
    title: 'Executive performance', chips: ['This year', 'All branches'],
    kpis: [['Revenue', '$3.9M', '+4.2%', true], ['Gross margin', '22.4%', '+0.6 pt', true], ['Growth on last year', '+11%', 'on plan', true]],
    Chart: ExecChart, sideTitle: 'What moved the number',
    side: [['Dairy', '+$84k', UP], ['Bakery', '+$31k', UP], ['Household', '+$9k', UP], ['Beverages', '-$12k', DOWN]],
  },
  {
    colour: 'var(--orange)', tab: 'Sales and channel performance',
    blurb: 'Track results by region, store, product, sales rep or channel, and see what is driving them.',
    title: 'Sales and channel performance', chips: ['This month', 'By branch'],
    kpis: [['Sales this month', '$2.04M', '+3.1%', true], ['Best branch', 'Hamra', '92% of target', true], ['Below target', '2 of 6', 'Byblos, Zahle', false]],
    Chart: SalesChart, sideTitle: 'Sales by channel',
    side: [['Stores', '64%', 'var(--orange)'], ['Online', '18%', 'var(--blue)'], ['Wholesale', '13%', 'var(--mint)'], ['Export', '5%', 'var(--sun)']],
  },
  {
    colour: 'var(--pink)', tab: 'Customer and retention insights',
    blurb: 'Segment customers, track repeat behaviour and watch churn signals with clear metrics.',
    title: 'Customer and retention insights', chips: ['Last 6 months', 'By cohort'],
    kpis: [['Active customers', '48,200', '+1,340', true], ['Repeat rate', '37%', '+2 pt', true], ['At risk of leaving', '1,940', 'needs action', false]],
    Chart: CustChart, sideTitle: 'Segments',
    side: [['Loyal', '9,600', UP], ['Regular', '21,300', 'var(--blue)'], ['New', '15,360', WARN], ['Slipping away', '1,940', DOWN]],
  },
  {
    colour: 'var(--mint)', tab: 'Inventory and supply chain visibility',
    blurb: 'Stock health, ageing, availability, wastage and replenishment, so operations stay ahead.',
    title: 'Inventory and supply chain', chips: ['Today', 'All warehouses'],
    kpis: [['In stock', '96.1%', '+0.8 pt', true], ['Ageing stock', '$212k', '-$18k', true], ['Wastage', '1.8%', 'above 1.5% goal', false]],
    Chart: InvChart, sideTitle: 'Reorder now',
    side: [['Labneh 500g', '2 days left', DOWN], ['Baguette', '1 day left', DOWN], ['Tomatoes', '3 days left', WARN], ['Olive oil 1L', '4 days left', WARN]],
  },
];

const Solutions: React.FC = () => {
  const root = useRef<HTMLDivElement>(null);
  const [current, setCurrent] = useState(0);
  const [auto, setAuto] = useState(() => !reducedMotion());
  const [seen, setSeen] = useState(false);
  const [replay, setReplay] = useState(0);   // bumped to redraw the chart when the section comes back into view

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const io = new IntersectionObserver(entries => {
      const v = entries[0].isIntersecting;
      setSeen(v);
      if (v) setReplay(r => r + 1);
    }, { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!auto || !seen) return;
    const t = window.setTimeout(() => setCurrent(c => (c + 1) % SOLUTIONS.length), ADVANCE_MS);
    return () => window.clearTimeout(t);
  }, [auto, seen, current, replay]);

  const pick = (i: number) => { setAuto(false); setCurrent(i); };
  const s = SOLUTIONS[current];

  return (
    <section className="solutions" id="solutions">
      <div className="wrap">
        <h2 className="h2 rv">Dashboards for the questions every team asks.</h2>
        <p className="sub rv" style={vars({ '--d': '.08s' })}>
          Proven starting points for common business needs, fitted to your own data sources and KPIs.
        </p>

        <div className={`sol${auto && seen ? ' auto' : ''}`} ref={root}>
          <div className="sol-tabs" role="tablist" aria-label="Solutions">
            {SOLUTIONS.map((sol, i) => (
              <button
                key={sol.tab}
                type="button"
                role="tab"
                aria-selected={i === current}
                className={`tab${i === current ? ' on' : ''}`}
                style={vars({ '--c': sol.colour })}
                onClick={() => pick(i)}
              >
                <b>{sol.tab}</b>
                <span><em>{sol.blurb}</em></span>
                <i className="tp" />
              </button>
            ))}
          </div>

          <div className="view" role="tabpanel" style={vars({ '--c': s.colour })}>
            {/* keyed so the chart's entrance animations run again on every change */}
            <div key={`${current}-${replay}`}>
              <div className="v-top">
                <h3>{s.title}</h3>
                {s.chips.map(c => <span key={c} className="chip">{c}</span>)}
              </div>
              <div className="v-kpis">
                {s.kpis.map(([label, value, note, good], i) => (
                  <div key={label} className="v-kpi" style={vars({ '--i': i })}>
                    <span>{label}</span><b>{value}</b><em className={good ? undefined : 'dn'}>{note}</em>
                  </div>
                ))}
              </div>
              <div className="v-body">
                <div><s.Chart /></div>
                <div>
                  <h4>{s.sideTitle}</h4>
                  <ul className="side">
                    {s.side.map(([label, value, c], i) => (
                      <li key={label} style={vars({ '--i': i, '--t': c })}>{label}<b>{value}</b></li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <p className="note">Sample dashboards. The company and its figures are made up.</p>
      </div>
    </section>
  );
};

export default Solutions;
