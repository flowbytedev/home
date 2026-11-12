import React, { useEffect, useRef, useState } from 'react';
import { reducedMotion, vars } from './util';

const TTD_URL = 'https://talktodata.io';

/** TalkToData's own mark: three chart bars that together make a speech bubble. */
const TtdMark: React.FC = () => (
  <svg viewBox="0 0 64 64" aria-hidden="true" focusable="false">
    <path fill="#4fb0ff" d="M15 6h36a7 7 0 0 1 0 14H9a3 3 0 0 1-3-3v-2a9 9 0 0 1 9-9Z" />
    <path fill="#fff" d="M9 24h23a7 7 0 0 1 0 14H9a3 3 0 0 1-3-3v-8a3 3 0 0 1 3-3Z" />
    <path fill="#ffc93c" d="M9 42h35a7 7 0 0 1 0 14H19L8.6 62.2A1.6 1.6 0 0 1 6 61V45a3 3 0 0 1 3-3Z" />
  </svg>
);

/* The two questions the demo plays, with the answer each one gets. The figures are illustrative. */
const QA: { q: string; answer: React.ReactNode }[] = [
  {
    q: 'How is our Q3 revenue compared to last year?',
    answer: (
      <>
        Q3 revenue is <b className="up">up 15%</b> on last year. Most of the growth comes from the <b>Enterprise</b> segment.
        <div className="a-table">
          <div style={vars({ '--i': 0 })}><span>Segment</span><span>Revenue</span><span>YoY</span></div>
          <div style={vars({ '--i': 1 })}><span>Enterprise</span><span>$2.4M</span><span className="up">+25%</span></div>
          <div style={vars({ '--i': 2 })}><span>Mid-Market</span><span>$1.1M</span><span className="up">+12%</span></div>
        </div>
        <div className="a-bars">
          {[40, 65, 55, 80, 70, 90, 85].map((h, i) => <i key={i} style={vars({ '--h': `${h}%`, '--i': i })} />)}
        </div>
      </>
    ),
  },
  {
    q: 'Show me the top selling products this month.',
    answer: (
      <>
        Here are this month's top sellers.
        <div className="a-rows">
          <div style={vars({ '--i': 0, '--w': '90%' })}><p><span>Pro Plan Subscription</span><span>$12,450</span></p><u /></div>
          <div style={vars({ '--i': 1, '--w': '65%' })}><p><span>Data Audit Package</span><span>$8,200</span></p><u /></div>
        </div>
      </>
    ),
  },
];

interface Message { id: number; kind: 'me' | 'wait' | 'ai'; qa: number }

const sleep = (ms: number) => new Promise<void>(resolve => window.setTimeout(resolve, ms));

/** A recorded exchange: the question is typed, sent, thought about and answered, then the next one. */
const Chat: React.FC = () => {
  const el = useRef<HTMLDivElement>(null);
  const [typed, setTyped] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    const node = el.current;
    if (!node) return;
    let stopped = false, visible = false, started = false, id = 0;

    async function play() {
      if (reducedMotion()) {
        setMessages([{ id: 1, kind: 'me', qa: 0 }, { id: 2, kind: 'ai', qa: 0 }]);
        return;
      }
      for (let i = 0; !stopped; i = (i + 1) % QA.length) {
        while (!visible && !stopped) await sleep(400);   // wait off screen rather than play to nobody
        if (stopped) return;
        setMessages([]); setTyped('');
        await sleep(700);
        const q = QA[i].q;
        for (let n = 1; n <= q.length && !stopped; n++) { setTyped(q.slice(0, n)); await sleep(22 + Math.random() * 34); }
        await sleep(380);
        if (stopped) return;
        setTyped(''); setMessages([{ id: ++id, kind: 'me', qa: i }]);
        await sleep(500);
        if (stopped) return;
        setMessages(m => [...m, { id: ++id, kind: 'wait', qa: i }]);
        await sleep(1400);
        if (stopped) return;
        setMessages(m => [...m.filter(x => x.kind !== 'wait'), { id: ++id, kind: 'ai', qa: i }]);
        await sleep(6200);
      }
    }

    const io = new IntersectionObserver(entries => {
      visible = entries[0].isIntersecting;
      if (visible && !started) { started = true; play(); }
    }, { threshold: 0.3 });
    io.observe(node);
    return () => { stopped = true; io.disconnect(); };
  }, []);

  return (
    <div className="chat" ref={el} aria-hidden="true">
      <div className="chat-top">
        <TtdMark />
        TalkToData
        <span className="src-chip"><i />Sales warehouse</span>
      </div>
      <div className="chat-body">
        {messages.map(m => {
          if (m.kind === 'me') return <div key={m.id} className="msg me">{QA[m.qa].q}</div>;
          if (m.kind === 'wait') {
            return (
              <div key={m.id} className="msg ai">
                <span className="dots">{[0, 1, 2].map(i => <i key={i} style={vars({ '--i': i })} />)}</span>
              </div>
            );
          }
          return <div key={m.id} className="msg ai full">{QA[m.qa].answer}</div>;
        })}
      </div>
      <div className="chat-in">
        <span className="chat-q">{typed}</span>
        <i className="caret" />
        <span className="send"><svg viewBox="0 0 24 24"><path d="M5 12h13M12 6l6 6-6 6" /></svg></span>
      </div>
    </div>
  );
};

/** Our product, shown in its own colours so it reads as a different brand from the rest of the page. */
const TalkToData: React.FC = () => (
  <section className="ttd" id="talktodata">
    <div className="wrap">
      <div className="ttd-panel rv">
        <div className="ttd-copy">
          <a className="ttd-logo" href={TTD_URL} target="_blank" rel="noopener noreferrer" aria-label="TalkToData">
            <TtdMark />
            <span>talk<i>to</i>data</span>
          </a>
          <h2>Stop digging for reports. Just ask.</h2>
          <p>Meet TalkToData, the product we built. Ask a question in plain English and get an accurate answer, charted on the spot, straight from your data warehouse.</p>
          <ul className="ttd-list">
            <li><i style={vars({ '--c': '#4fb0ff' })} />Plain-language questions, no SQL needed</li>
            <li><i style={vars({ '--c': '#ffc93c' })} />Instant charts and trend analysis</li>
            <li><i style={vars({ '--c': '#ff6f51' })} />Drill down without leaving the chat</li>
            <li><i style={vars({ '--c': '#35dba9' })} />Secure, role-based data access</li>
          </ul>
          <a className="ttd-btn" href={TTD_URL} target="_blank" rel="noopener noreferrer">Visit talktodata.io</a>
        </div>
        <Chat />
      </div>
    </div>
  </section>
);

export default TalkToData;
