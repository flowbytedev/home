import React from 'react';
import { Target, ShieldCheck, Component, GraduationCap } from 'lucide-react';
import Button from '../components/Button';

const About: React.FC = () => {
  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="bg-slate-900 text-white py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">About Us</h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            We help businesses build reliable data foundations and dashboards that drive action—not just reporting.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-blue-600 font-bold tracking-wide uppercase mb-4 text-sm">Our mission</h2>
          <p className="text-3xl md:text-4xl font-bold text-slate-900 leading-tight">
            To make data clear, trusted, and useful—so teams spend less time compiling numbers and more time improving results.
          </p>
        </div>
      </section>

      {/* Differentiators */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">How we’re different</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
               <Target className="text-blue-600 w-10 h-10 mb-4" />
               <h3 className="font-bold text-lg mb-2">Business-first KPI design</h3>
               <p className="text-slate-600 text-sm">We don't just visualize; we define metrics that matter to your P&L.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
               <ShieldCheck className="text-blue-600 w-10 h-10 mb-4" />
               <h3 className="font-bold text-lg mb-2">Strong data validation</h3>
               <p className="text-slate-600 text-sm">Rigorous reconciliation ensures your dashboards match your financials.</p>
            </div>
             <div className="bg-white p-6 rounded-lg shadow-sm">
               <Component className="text-blue-600 w-10 h-10 mb-4" />
               <h3 className="font-bold text-lg mb-2">Clean, scalable structure</h3>
               <p className="text-slate-600 text-sm">Architected for growth, so your data model doesn't break as you scale.</p>
            </div>
             <div className="bg-white p-6 rounded-lg shadow-sm">
               <GraduationCap className="text-blue-600 w-10 h-10 mb-4" />
               <h3 className="font-bold text-lg mb-2">Enablement focus</h3>
               <p className="text-slate-600 text-sm">We provide training and documentation to ensure long-term adoption.</p>
            </div>
          </div>

          <div className="text-center mt-16">
            <Button to="/contact" variant="primary">Meet with us</Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;