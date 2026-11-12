import React from 'react';
import Hero from '../home/Hero';
import Trust from '../home/Trust';
import Services from '../home/Services';
import Chaos from '../home/Chaos';
import Solutions from '../home/Solutions';
import TalkToData from '../home/TalkToData';
import How from '../home/How';
import About from '../home/About';
import Closing from '../home/Closing';
import { useReveal } from '../home/util';

/**
 * The home page. Each section is its own component under ../home; the styles are home/site.css.
 * Services, Solutions, TalkToData and About carry ids that the nav and App.tsx scroll to.
 */
const Home: React.FC = () => {
  useReveal();
  return (
    <>
      <Hero />
      <Trust />
      <Services />
      <Chaos />
      <Solutions />
      <TalkToData />
      <How />
      <About />
      <Closing />
    </>
  );
};

export default Home;
