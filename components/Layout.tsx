import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { DropMark, Wordmark } from './Logo';
import { useScroll } from '../home/util';

interface LayoutProps {
  children: React.ReactNode;
}

// Services, Solutions, TalkToData and About are sections of the home page (see App.tsx).
const NAV = [
  { name: 'Services', path: '/services' },
  { name: 'Solutions', path: '/solutions' },
  { name: 'TalkToData', path: '/talktodata' },
  { name: 'About', path: '/about' },
  { name: 'Contact', path: '/contact' },
];

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [stuck, setStuck] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => { setOpen(false); }, [location]);

  // nav background once the page has moved, and the five-colour progress bar along the top
  useScroll(() => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    document.documentElement.style.setProperty('--sp', String(max > 0 ? window.scrollY / max : 0));
    setStuck(window.scrollY > 24);
  }, [location.pathname]);

  return (
    <>
      <div className="prog" aria-hidden="true" />

      <header className={`nav${stuck ? ' stuck' : ''}`}>
        <div className="wrap">
          <Link className="logo" to="/" aria-label="Flowbyte, home">
            <DropMark />
            <Wordmark />
          </Link>
          <nav id="site-links" className={`links${open ? ' open' : ''}`} aria-label="Main">
            {NAV.map(l => <Link key={l.path} to={l.path}>{l.name}</Link>)}
          </nav>
          <Link className="btn sm" to="/contact">Book a call</Link>
          <button
            className="burger"
            type="button"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="site-links"
            onClick={() => setOpen(o => !o)}
          >
            <i /><i />
          </button>
        </div>
      </header>

      <main>{children}</main>

      <footer className="foot">
        <div className="wrap">
          <div className="foot-grid">
            <div>
              <Link className="logo" to="/" aria-label="Flowbyte, home">
                <DropMark />
                <Wordmark />
              </Link>
              <p>Data management, dashboards and automation. We turn messy data into trusted insights for enterprise teams.</p>
            </div>
            <div>
              <h4>Company</h4>
              <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/about">About us</Link></li>
                <li><Link to="/services">Services</Link></li>
                <li><Link to="/solutions">Solutions</Link></li>
              </ul>
            </div>
            <div>
              <h4>Capabilities</h4>
              <ul>
                <li><Link to="/services">Data management</Link></li>
                <li><Link to="/services">Data modelling</Link></li>
                <li><Link to="/services">Power BI dashboards</Link></li>
                <li><Link to="/services">Automation</Link></li>
                <li><Link to="/talktodata">TalkToData</Link></li>
              </ul>
            </div>
            <div>
              <h4>Contact</h4>
              <ul>
                <li><a href="mailto:hello@flowbyte.com">hello@flowbyte.com</a></li>
                <li>Beirut, Lebanon</li>
                <li><a href="https://linkedin.com/company/flowbyte" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
              </ul>
            </div>
          </div>
          <div className="foot-end">
            <span>&copy; {new Date().getFullYear()} Flowbyte. All rights reserved.</span>
            <span>
              <a href="#">Privacy policy</a>
              <a href="#">Terms of service</a>
            </span>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Layout;
