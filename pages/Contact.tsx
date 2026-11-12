import React, { useEffect } from 'react';
import Cal, { getCalApi } from '@calcom/embed-react';
import { Mail, Linkedin, ExternalLink } from 'lucide-react';
import { Floaters } from '../home/Closing';
import { useReveal, vars } from '../home/util';

const CAL_LINK = 'kevorkkeheian/15min';

const Contact: React.FC = () => {
  useReveal();

  useEffect(() => {
    (async function () {
      try {
        const cal = await getCalApi({ namespace: '15min' });
        cal('ui', {
          styles: { branding: { brandColor: '#2f4bf7' } },
          hideEventTypeDetails: false,
          layout: 'month_view',
          theme: 'light',
        });
      } catch (error) {
        console.error('Failed to initialize Cal.com API:', error);
      }
    })();
  }, []);

  return (
    <>
      <section className="c-head">
        <div className="c-bytes" aria-hidden="true"><Floaters /></div>
        <div className="wrap">
          <h1>
            <span className="ln"><span>Book a</span></span>
            <span className="ln"><span>discovery call.</span></span>
          </h1>
          <p className="sub">Schedule a consultation to discuss your data needs and how we can help.</p>
          <ul className="c-why">
            <li>Discuss your specific data challenges and bottlenecks.</li>
            <li>Explore solutions that fit your infrastructure.</li>
            <li>Leave with a clear roadmap from chaos to clarity.</li>
          </ul>
        </div>
      </section>

      <section className="c-body">
        <div className="wrap">
          <div className="c-cal">
            <div className="c-cal-in">
              <Cal
                namespace="15min"
                calLink={CAL_LINK}
                style={{ width: '100%', height: '100%', overflow: 'scroll' }}
                config={{ layout: 'month_view', theme: 'light', hideEventTypeDetails: false }}
              />
            </div>
            <p className="c-fallback">
              Having trouble loading the calendar?{' '}
              <a href={`https://cal.com/${CAL_LINK}`} target="_blank" rel="noopener noreferrer">
                Book directly on Cal.com <ExternalLink size={15} aria-hidden="true" />
              </a>
            </p>
          </div>

          <div className="c-touch rv">
            <h2>Get in touch</h2>
            <ul>
              <li>
                <i className="ic" style={vars({ '--c': 'var(--mint)' })}><Mail aria-hidden="true" /></i>
                <div>
                  <small>Email</small>
                  <a href="mailto:hello@flowbyte.com">hello@flowbyte.com</a>
                </div>
              </li>
              <li>
                <i className="ic" style={vars({ '--c': 'var(--pink)' })}><Linkedin aria-hidden="true" /></i>
                <div>
                  <small>LinkedIn</small>
                  <a href="https://linkedin.com/company/flowbyte" target="_blank" rel="noopener noreferrer">Flowbyte</a>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
