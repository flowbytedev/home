import React, { useEffect, useRef } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Contact from './pages/Contact';
import './home/site.css';

// The home page holds every section. These paths open it at that section, so links to the
// old Services, Solutions and About pages still land in the right place.
const SECTIONS = ['services', 'solutions', 'talktodata', 'about'];

const ScrollManager = () => {
  const location = useLocation();
  const lastPage = useRef('');

  useEffect(() => {
    const id = location.pathname.slice(1);
    const page = id === 'contact' ? 'contact' : 'home';
    const arriving = page !== lastPage.current;   // a fresh page starts in place, with no animated scroll
    lastPage.current = page;
    const isSection = SECTIONS.includes(id);

    const go = (behavior: ScrollBehavior) => {
      const el = isSection ? document.getElementById(id) : null;
      const top = el ? el.getBoundingClientRect().top + window.scrollY : 0;
      window.scrollTo({ top, behavior });
    };
    const raf = requestAnimationFrame(() => go(arriving ? 'instant' : 'smooth'));

    // web fonts change the height of what sits above a section, so settle once they are in
    let stale = false;
    if (arriving && isSection && document.fonts) {
      document.fonts.ready.then(() => { if (!stale) go('instant'); });
    }
    return () => { stale = true; cancelAnimationFrame(raf); };
  }, [location]);

  return null;
};

const App: React.FC = () => {
  return (
    <Router>
      <ScrollManager />
      <Layout>
        <Routes>
          <Route path="/contact" element={<Contact />} />
          <Route path="/:section?" element={<Home />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
