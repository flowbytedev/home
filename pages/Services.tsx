import React from 'react';
import { CheckCircle2, Database, Network, LineChart, Cpu, Brain } from 'lucide-react';
import Button from '../components/Button';

const Services: React.FC = () => {
  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="bg-slate-900 text-white py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Services</h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto mb-10">
            Flexible engagement models—whether you need a full data foundation, improved reporting, or a targeted dashboard build.
          </p>
          <Button to="/contact" variant="primary">Book a Call</Button>
        </div>
      </section>

      {/* Service 1 */}
      <section className="py-20 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-12 gap-12">
            <div className="md:col-span-4">
              <div className="bg-blue-100 w-16 h-16 rounded-xl flex items-center justify-center text-blue-600 mb-6">
                <Database size={32} />
              </div>
              <h2 className="text-3xl font-bold text-slate-900 mb-4">Data Management & Quality</h2>
              <p className="text-slate-600 mb-6">
                Establish a reliable data backbone. We clean, organize, and automate your data flows so you can trust the numbers.
              </p>
            </div>
            <div className="md:col-span-8 grid sm:grid-cols-2 gap-8">
              <div className="bg-slate-50 p-6 rounded-lg">
                <h3 className="font-bold text-slate-900 mb-4">What it covers:</h3>
                <ul className="space-y-3">
                  {[
                    "Source assessment and mapping",
                    "Data cleaning and transformation rules",
                    "Automated pipelines and scheduled refreshes",
                    "Data validation and reconciliation checks",
                    "Documentation and governance basics"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-slate-600 text-sm">
                      <CheckCircle2 size={16} className="text-blue-600 mt-1 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-blue-50/50 p-6 rounded-lg border border-blue-100">
                <h3 className="font-bold text-slate-900 mb-4">Deliverables:</h3>
                <ul className="space-y-3">
                  {[
                    "Data source map",
                    "Automated pipeline(s)",
                    "Data quality rules + monitoring checklist",
                    "Documentation for handover"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-slate-700 text-sm font-medium">
                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 shrink-0"></div>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service 2 */}
      <section className="py-20 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-12 gap-12">
            <div className="md:col-span-4">
              <div className="bg-indigo-100 w-16 h-16 rounded-xl flex items-center justify-center text-indigo-600 mb-6">
                <Network size={32} />
              </div>
              <h2 className="text-3xl font-bold text-slate-900 mb-4">Data Modeling & Single Source of Truth</h2>
              <p className="text-slate-600 mb-6">
                Create a scalable architecture. We design models that make reporting fast, consistent, and easy to maintain.
              </p>
            </div>
            <div className="md:col-span-8 grid sm:grid-cols-2 gap-8">
              <div className="bg-slate-50 p-6 rounded-lg">
                <h3 className="font-bold text-slate-900 mb-4">What it covers:</h3>
                <ul className="space-y-3">
                  {[
                    "KPI definitions and metric logic standardization",
                    "Dimensional modeling (facts/dimensions)",
                    "Performance optimization for reporting",
                    "Scalable structure for future growth"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-slate-600 text-sm">
                      <CheckCircle2 size={16} className="text-indigo-600 mt-1 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-indigo-50/50 p-6 rounded-lg border border-indigo-100">
                <h3 className="font-bold text-slate-900 mb-4">Deliverables:</h3>
                <ul className="space-y-3">
                  {[
                    "Data model + KPI dictionary",
                    "Optimized dataset for BI",
                    "Documentation + usage guidelines"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-slate-700 text-sm font-medium">
                       <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full mt-2 shrink-0"></div>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service 3 */}
      <section className="py-20 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-12 gap-12">
            <div className="md:col-span-4">
              <div className="bg-teal-100 w-16 h-16 rounded-xl flex items-center justify-center text-teal-600 mb-6">
                <LineChart size={32} />
              </div>
              <h2 className="text-3xl font-bold text-slate-900 mb-4">Reporting & Dashboards (Power BI)</h2>
              <p className="text-slate-600 mb-6">
                Visualize success. We build intuitive, interactive dashboards that drive adoption and decision-making.
              </p>
            </div>
            <div className="md:col-span-8 grid sm:grid-cols-2 gap-8">
              <div className="bg-slate-50 p-6 rounded-lg">
                <h3 className="font-bold text-slate-900 mb-4">What it covers:</h3>
                <ul className="space-y-3">
                  {[
                    "Stakeholder reporting needs (role-based views)",
                    "KPI pages + drilldowns",
                    "Executive summaries + operational dashboards",
                    "Automated exports (daily/weekly)",
                    "Dashboard adoption enablement"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-slate-600 text-sm">
                      <CheckCircle2 size={16} className="text-teal-600 mt-1 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-teal-50/50 p-6 rounded-lg border border-teal-100">
                <h3 className="font-bold text-slate-900 mb-4">Deliverables:</h3>
                <ul className="space-y-3">
                  {[
                    "Dashboard suite (exec + teams)",
                    "KPI tree and definitions",
                    "Training session + guide"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-slate-700 text-sm font-medium">
                       <div className="w-1.5 h-1.5 bg-teal-500 rounded-full mt-2 shrink-0"></div>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service: AI & Machine Learning */}
      <section className="py-20 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-12 gap-12">
            <div className="md:col-span-4">
              <div className="bg-pink-100 w-16 h-16 rounded-xl flex items-center justify-center text-pink-600 mb-6">
                <Brain size={32} />
              </div>
              <h2 className="text-3xl font-bold text-slate-900 mb-4">AI & Machine Learning</h2>
              <p className="text-slate-600 mb-6">
                Move beyond "what happened" to "what will happen." We build practical models that predict trends and automate complex decisions.
              </p>
            </div>
            <div className="md:col-span-8 grid sm:grid-cols-2 gap-8">
              <div className="bg-slate-50 p-6 rounded-lg">
                <h3 className="font-bold text-slate-900 mb-4">What it covers:</h3>
                <ul className="space-y-3">
                  {[
                    "Demand forecasting & inventory optimization",
                    "Customer churn prediction & retention scoring",
                    "Advanced segmentation & clustering",
                    "Anomaly detection (fraud/operations)",
                    "Predictive maintenance models"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-slate-600 text-sm">
                      <CheckCircle2 size={16} className="text-pink-600 mt-1 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-pink-50/50 p-6 rounded-lg border border-pink-100">
                <h3 className="font-bold text-slate-900 mb-4">Deliverables:</h3>
                <ul className="space-y-3">
                  {[
                    "Deployed predictive models (Python/SQL)",
                    "Integration into Power BI dashboards",
                    "Automated scoring pipelines",
                    "Model performance monitoring",
                    "Documentation & code handover"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-slate-700 text-sm font-medium">
                       <div className="w-1.5 h-1.5 bg-pink-500 rounded-full mt-2 shrink-0"></div>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service 4 */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-12 gap-12">
             <div className="md:col-span-4">
              <div className="bg-orange-100 w-16 h-16 rounded-xl flex items-center justify-center text-orange-600 mb-6">
                <Cpu size={32} />
              </div>
              <h2 className="text-3xl font-bold text-slate-900 mb-4">Automated Reporting, Alerts & Workflows</h2>
              <p className="text-slate-600 mb-6">
                Be proactive, not reactive. Set up automated systems that notify you when things need attention.
              </p>
            </div>
            <div className="md:col-span-8 grid sm:grid-cols-2 gap-8">
              <div className="bg-slate-50 p-6 rounded-lg">
                <h3 className="font-bold text-slate-900 mb-4">What it covers:</h3>
                <ul className="space-y-3">
                  {[
                    "Scheduled reporting",
                    "Threshold alerts (e.g., drop in sales, stockouts, spikes)",
                    "Automated email summaries",
                    "Reduce manual recurring tasks"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-slate-600 text-sm">
                      <CheckCircle2 size={16} className="text-orange-600 mt-1 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-orange-50/50 p-6 rounded-lg border border-orange-100">
                <h3 className="font-bold text-slate-900 mb-4">Deliverables:</h3>
                <ul className="space-y-3">
                  {[
                    "Automated workflow(s)",
                    "Alert rules + recipients",
                    "Maintenance documentation"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-slate-700 text-sm font-medium">
                       <div className="w-1.5 h-1.5 bg-orange-500 rounded-full mt-2 shrink-0"></div>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services CTA */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Not sure which service fits?</h2>
          <p className="text-lg text-slate-600 mb-8">
            We’ll recommend the best path based on your data maturity, timelines, and business priorities.
          </p>
          <Button to="/contact" variant="primary">Book a Call</Button>
        </div>
      </section>
    </div>
  );
};

export default Services;