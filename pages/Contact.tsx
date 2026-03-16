import React, { useEffect } from 'react';
import Cal, { getCalApi } from "@calcom/embed-react";
import { Mail, Linkedin, CheckCircle2, ExternalLink } from 'lucide-react';

const Contact: React.FC = () => {
  const calLink = "kevorkkeheian/15min";

  useEffect(() => {
    (async function () {
      try {
        const cal = await getCalApi({ namespace: "15min" });
        cal("ui", {
          styles: { branding: { brandColor: "#0284c7" } },
          hideEventTypeDetails: false,
          layout: "month_view",
          theme: "light"
        });
      } catch (error) {
        console.error("Failed to initialize Cal.com API:", error);
      }
    })();
  }, []);

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Header Area */}
      <section className="bg-slate-900 text-white pt-16 pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">Book a Discovery Call</h1>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto">
            Schedule a consultation to discuss your data needs and how we can help.
          </p>
        </div>
      </section>

      {/* Main Container */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Column (4/12) */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            {/* Contact Info Card */}
            <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-6">
              <h3 className="text-lg font-bold text-slate-900 mb-6">Get in touch</h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-sky-50 text-sky-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail size={20} />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-slate-500">Email</div>
                    <a href="mailto:hello@flowbyte.com" className="text-slate-900 font-medium hover:text-sky-600 transition-colors">
                      hello@flowbyte.com
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-sky-50 text-sky-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Linkedin size={20} />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-slate-500">LinkedIn</div>
                    <a href="https://linkedin.com/company/flowbyte" target="_blank" rel="noopener noreferrer" className="text-slate-900 font-medium hover:text-sky-600 transition-colors">
                      Flowbyte
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Why Book a Call Card */}
            <div className="bg-slate-800 rounded-2xl shadow-xl border border-slate-700 p-6 text-white">
              <h3 className="text-xl font-bold mb-6">Why book a call?</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <CheckCircle2 size={20} className="text-sky-400 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-300 text-sm leading-relaxed">Discuss your specific data challenges and bottlenecks.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 size={20} className="text-sky-400 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-300 text-sm leading-relaxed">Explore potential solutions tailored to your infrastructure.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 size={20} className="text-sky-400 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-300 text-sm leading-relaxed">Get a clear roadmap for moving from chaos to clarity.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Right Column (8/12) */}
          <div className="lg:col-span-8 bg-white rounded-2xl shadow-xl border border-slate-100 p-2 md:p-4 flex flex-col min-h-[600px]">
            <div className="flex-grow">
              <Cal 
                namespace="15min"
                calLink={calLink}
                style={{ width: "100%", height: "100%", overflow: "scroll" }}
                config={{ layout: 'month_view', theme: 'light', hideEventTypeDetails: false }}
              />
            </div>
            
            {/* Fallback Footer */}
            <div className="mt-4 pt-4 border-t border-slate-100 text-center">
              <p className="text-sm text-slate-500 flex items-center justify-center gap-2">
                Having trouble loading the calendar? 
                <a 
                  href={`https://cal.com/${calLink}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-sky-600 font-medium hover:text-sky-700 flex items-center gap-1"
                >
                  Book directly on Cal.com <ExternalLink size={14} />
                </a>
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Contact;