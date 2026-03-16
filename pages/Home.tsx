import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  Database, 
  Layers, 
  BarChart2, 
  Zap, 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle,
  ArrowDown,
  Cloud,
  FileCode2,
  Snowflake,
  PieChart,
  Server,
  Brain,
  AppWindow,
  Workflow,
  Search,
  Bell,
  MoreHorizontal,
  TrendingUp,
  DollarSign,
  Users,
  MessageSquare,
  Sparkles,
  Bot,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import Button from '../components/Button';

const Home: React.FC = () => {
  const [activePillar, setActivePillar] = useState<number | null>(0);
  const [activeChaosIndex, setActiveChaosIndex] = useState(0);
  const pillarRefs = useRef<(HTMLDivElement | null)[]>([]);

  const chaosItems = [
    { pain: "Reporting takes days to compile manually", outcome: "Automated dashboards ready in seconds" },
    { pain: "Conflicting numbers across different departments", outcome: "One trusted source of truth for everyone" },
    { pain: "Constant fire-fighting with messy data", outcome: "Stable pipelines and proactive quality checks" },
    { pain: "No visibility on what drives performance", outcome: "Clear KPIs and drill-down insights" },
    { pain: "Teams ignore complex spreadsheets", outcome: "Intuitive, role-based views they actually use" },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = pillarRefs.current.findIndex(ref => ref === entry.target);
            if (index !== -1) {
              setActivePillar(index);
            }
          }
        });
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 1.0,
      }
    );

    const currentRefs = pillarRefs.current;
    currentRefs.forEach(ref => {
      if (ref) observer.observe(ref);
    });

    return () => {
      currentRefs.forEach(ref => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);

  // Tool logos configuration
  const tools = [
    { name: 'Power BI', icon: BarChart2, color: 'text-yellow-600', bg: 'bg-yellow-50' },
    { name: 'Snowflake', icon: Snowflake, color: 'text-sky-500', bg: 'bg-sky-50' },
    { name: 'Tableau', icon: PieChart, color: 'text-indigo-600', bg: 'bg-indigo-50' },
    { name: 'PostgreSQL', icon: Database, color: 'text-slate-600', bg: 'bg-slate-100' },
    { name: 'Azure', icon: Cloud, color: 'text-blue-600', bg: 'bg-blue-50' },
    { name: 'SQL Server', icon: Server, color: 'text-red-600', bg: 'bg-red-50' },
    { name: 'Dagster', icon: Workflow, color: 'text-teal-600', bg: 'bg-teal-50' },
    { name: 'Python', icon: FileCode2, color: 'text-blue-500', bg: 'bg-slate-50' },
    { name: 'Streamlit', icon: AppWindow, color: 'text-red-500', bg: 'bg-red-50' },
    { name: 'AWS', icon: Cloud, color: 'text-orange-500', bg: 'bg-orange-50' },
    { name: 'SSIS', icon: Layers, color: 'text-purple-600', bg: 'bg-purple-50' },
    { name: 'AI / ML', icon: Brain, color: 'text-pink-600', bg: 'bg-pink-50' },
  ];

  return (
    <div className="flex flex-col gap-0">
      
      {/* Injecting CSS for marquee animation and chart animations */}
      <style>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-scroll {
          animation: scroll 40s linear infinite;
        }
        .paused {
          animation-play-state: paused;
        }
        @keyframes drawLine {
          from { stroke-dashoffset: 1000; opacity: 0; }
          to { stroke-dashoffset: 0; opacity: 1; }
        }
        .animate-draw {
          stroke-dasharray: 1000;
          stroke-dashoffset: 1000;
          animation: drawLine 2.5s ease-out forwards;
        }
        @keyframes popIn {
          0% { transform: scale(0.95); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }
        .animate-pop {
          animation: popIn 0.6s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
        }
      `}</style>

      {/* Hero Section */}
      <section className="relative pt-12 pb-12 lg:pt-20 lg:pb-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            
            {/* Content */}
            <div className="space-y-8 fade-in-up">
              <h1 className="text-4xl lg:text-6xl font-bold tracking-tight text-slate-900 leading-[1.1]">
                Turn your data into decisions—<span className="text-blue-600">fast.</span>
              </h1>
              <p className="text-xl text-slate-600 leading-relaxed max-w-lg">
                We build reliable data foundations and clear dashboards so teams can track performance, spot issues early, and act with confidence.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button to="/contact" variant="primary" className="w-full sm:w-auto">
                  Book a Call
                </Button>
                <Button to="/contact" variant="outline" className="w-full sm:w-auto">
                  Contact Us
                </Button>
              </div>

              <div className="flex items-center gap-2 text-sm text-slate-500 font-medium">
                <CheckCircle2 size={16} className="text-green-500" />
                <span>From messy sources to a single source of truth—built for your business.</span>
              </div>
            </div>

            {/* Visual (Abstract Dashboard Mockup) */}
            <div className="relative fade-in-up delay-200 h-auto sm:h-[500px] lg:h-[600px] flex items-center justify-center">
              
              {/* Container for the visuals */}
              <div className="relative w-full max-w-lg aspect-[4/3]">
                
                {/* Abstract Dashboard */}
                <div className="absolute inset-0 bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col transform transition-transform duration-500 hover:scale-[1.01]">
                   
                   {/* Top Bar (Fake Browser/App) */}
                   <div className="h-5 bg-slate-50 border-b border-slate-100 flex items-center px-4 gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-400"></div>
                      <div className="w-2.5 h-2.5 rounded-full bg-amber-400"></div>
                      <div className="w-2.5 h-2.5 rounded-full bg-emerald-400"></div>
                   </div>

                   <div className="flex-1 flex min-h-0">
                      {/* Sidebar */}
                      <div className="w-16 bg-slate-900 flex flex-col items-center py-6 gap-6 z-10">
                         <div className="w-8 h-8 bg-blue-600 rounded-lg mb-4 flex items-center justify-center">
                            <div className="w-4 h-4 bg-white/20 rounded-sm"></div>
                         </div>
                         {[1,2,3,4,5].map(i => (
                            <div key={i} className="w-8 h-8 rounded-lg bg-slate-800/50 flex items-center justify-center">
                               <div className="w-3 h-3 bg-slate-600 rounded-sm"></div>
                            </div>
                         ))}
                      </div>

                      {/* Main Canvas */}
                      <div className="flex-1 bg-slate-50 p-6 flex flex-col gap-5 overflow-hidden">
                         
                         {/* Header Abstract */}
                         <div className="flex justify-between items-center animate-pop" style={{animationDelay: '0.1s'}}>
                            <div className="space-y-2.5">
                               <div className="w-32 h-6 bg-slate-300 rounded-md"></div>
                               <div className="w-24 h-3 bg-slate-200 rounded-md"></div>
                            </div>
                            <div className="flex gap-3">
                               <div className="w-9 h-9 rounded-full bg-white border border-slate-200"></div>
                               <div className="w-9 h-9 rounded-full bg-blue-100 border border-blue-200"></div>
                            </div>
                         </div>

                         {/* KPI Cards Abstract */}
                         <div className="grid grid-cols-3 gap-4">
                            {[1, 2, 3].map((i) => (
                               <div key={i} className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex flex-col justify-between h-28 animate-pop" style={{animationDelay: `${0.2 + (i * 0.1)}s`}}>
                                  <div className="flex justify-between items-start">
                                     <div className={`w-9 h-9 rounded-lg ${i===1 ? 'bg-blue-50' : i===2 ? 'bg-purple-50' : 'bg-orange-50'}`}></div>
                                     <div className="w-12 h-5 rounded-full bg-emerald-50"></div>
                                  </div>
                                  <div className="space-y-2.5">
                                     <div className="w-20 h-6 bg-slate-800 rounded-md"></div>
                                     <div className="w-14 h-2.5 bg-slate-200 rounded-full"></div>
                                  </div>
                               </div>
                            ))}
                         </div>

                         {/* Charts Area */}
                         <div className="flex-1 flex gap-4 min-h-0 animate-pop" style={{animationDelay: '0.6s'}}>
                            {/* Main Chart */}
                            <div className="flex-[2] bg-white rounded-xl shadow-sm border border-slate-100 p-5 flex flex-col">
                               <div className="flex justify-between mb-6">
                                  <div className="w-28 h-4 bg-slate-200 rounded-full"></div>
                                  <div className="flex gap-1.5">
                                    <div className="w-6 h-2 bg-blue-100 rounded-full"></div>
                                    <div className="w-6 h-2 bg-slate-100 rounded-full"></div>
                                  </div>
                               </div>
                               <div className="flex-1 relative">
                                  {/* Grid Lines */}
                                  <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
                                     {[1,2,3,4].map(k => <div key={k} className="w-full h-px bg-slate-50"></div>)}
                                  </div>
                                  {/* Area Chart Path (Abstract Visual) */}
                                  <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100">
                                     <defs>
                                        <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                                           <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.2" />
                                           <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
                                        </linearGradient>
                                     </defs>
                                     {/* Fill */}
                                     <path 
                                        d="M0,85 C20,75 35,90 50,45 C65,0 80,60 100,35 V100 H0 Z" 
                                        fill="url(#chartGrad)" 
                                        className="opacity-80"
                                     />
                                     {/* Line */}
                                     <path 
                                        d="M0,85 C20,75 35,90 50,45 C65,0 80,60 100,35" 
                                        fill="none" 
                                        stroke="#3b82f6" 
                                        strokeWidth="3" 
                                        strokeLinecap="round" 
                                        strokeLinejoin="round" 
                                        className="animate-draw"
                                     />
                                  </svg>
                               </div>
                            </div>
                            
                            {/* Right Column (Donut + List) */}
                            <div className="flex-1 flex flex-col gap-4">
                               {/* Donut Chart Block */}
                               <div className="flex-1 bg-white rounded-xl shadow-sm border border-slate-100 p-4 flex items-center justify-center relative">
                                  <div className="relative w-24 h-24">
                                      {/* Abstract Donut: SVG Circles */}
                                      <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                                         {/* Backing */}
                                         <circle cx="50" cy="50" r="40" fill="none" stroke="#f1f5f9" strokeWidth="14" />
                                         {/* Segment 1 */}
                                         <circle cx="50" cy="50" r="40" fill="none" stroke="#3b82f6" strokeWidth="14" strokeDasharray="180 300" strokeLinecap="round" className="animate-draw" style={{animationDuration: '1.5s'}} />
                                         {/* Segment 2 */}
                                         <circle cx="50" cy="50" r="40" fill="none" stroke="#6366f1" strokeWidth="14" strokeDasharray="60 300" strokeDashoffset="-190" strokeLinecap="round" className="animate-draw" style={{animationDuration: '2s'}} />
                                      </svg>
                                      <div className="absolute inset-0 flex items-center justify-center">
                                         <div className="w-8 h-8 rounded-full bg-slate-50"></div>
                                      </div>
                                  </div>
                               </div>

                               {/* List Block */}
                               <div className="flex-1 bg-white rounded-xl shadow-sm border border-slate-100 p-4 flex flex-col gap-4 justify-center">
                                  {[1,2].map(j => (
                                     <div key={j} className="flex gap-3 items-center">
                                        <div className="w-8 h-8 rounded-full bg-slate-100 flex-shrink-0"></div>
                                        <div className="flex-1 space-y-1.5">
                                           <div className="w-full h-2 bg-slate-200 rounded-full"></div>
                                           <div className="w-2/3 h-2 bg-slate-100 rounded-full"></div>
                                        </div>
                                     </div>
                                  ))}
                               </div>
                            </div>
                         </div>

                      </div>
                   </div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute -right-4 top-10 w-20 h-20 bg-blue-500 rounded-full blur-2xl opacity-20 animate-pulse"></div>
                <div className="absolute -left-4 bottom-10 w-32 h-32 bg-purple-500 rounded-full blur-3xl opacity-20 animate-pulse" style={{animationDelay: '1s'}}></div>
              </div>

              {/* Decorative Blur Effect behind everything */}
              <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] bg-blue-600/10 blur-[90px] rounded-full"></div>
            </div>

          </div>
        </div>
      </section>

      {/* Trust Statement */}
      <section className="bg-blue-500 py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-2xl md:text-3xl font-medium text-white leading-relaxed">
            Trusted by teams across Retail, FMCG, Marketing, Engineering and other industries—supporting decision-makers with data that’s accurate and timely.
          </p>
        </div>
      </section>

      {/* Pillars Section (Liquid Glass Design) */}
      <section className="py-24 bg-slate-950 relative overflow-hidden">
        {/* Animated Liquid Background Blobs */}
        <div className="absolute top-0 -left-4 w-72 h-72 bg-blue-500 rounded-full mix-blend-screen filter blur-[100px] opacity-40 animate-blob"></div>
        <div className="absolute top-0 -right-4 w-72 h-72 bg-teal-500 rounded-full mix-blend-screen filter blur-[100px] opacity-40 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-purple-500 rounded-full mix-blend-screen filter blur-[100px] opacity-40 animate-blob animation-delay-4000"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-slate-300 text-sm font-semibold tracking-wide mb-6 backdrop-blur-md">
              <Layers size={14} className="text-blue-400" />
              <span>Core Capabilities</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">End-to-end data solutions</h2>
            <p className="text-xl text-slate-400">Everything you need to move from scattered data to trusted insights, built for scale.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Data Management',
                desc: 'Unify data from multiple sources, improve data quality, and create reliable pipelines that keep information consistent and up to date.',
                icon: Database,
                colors: {
                  borderHover: 'md:hover:border-blue-400/50',
                  borderActive: 'max-md:border-blue-400/50',
                  bgHover: 'md:hover:bg-white/10',
                  bgActive: 'max-md:bg-white/10',
                  iconBg: 'bg-blue-500/20',
                  iconText: 'text-blue-400',
                  linkText: 'text-blue-400'
                }
              },
              {
                title: 'Reports & Dashboards',
                desc: 'Create dashboards that stakeholders actually use—clear KPIs, drill-down analysis, and automated reporting for daily/weekly decision-making.',
                icon: BarChart2,
                colors: {
                  borderHover: 'md:hover:border-teal-400/50',
                  borderActive: 'max-md:border-teal-400/50',
                  bgHover: 'md:hover:bg-white/10',
                  bgActive: 'max-md:bg-white/10',
                  iconBg: 'bg-teal-500/20',
                  iconText: 'text-teal-400',
                  linkText: 'text-teal-400'
                }
              },
              {
                title: 'Automation & Analytics',
                desc: 'Reduce manual work with scheduled refreshes, alerts, and automated reporting workflows—so teams focus on actions, not spreadsheets.',
                icon: Zap,
                colors: {
                  borderHover: 'md:hover:border-orange-400/50',
                  borderActive: 'max-md:border-orange-400/50',
                  bgHover: 'md:hover:bg-white/10',
                  bgActive: 'max-md:bg-white/10',
                  iconBg: 'bg-orange-500/20',
                  iconText: 'text-orange-400',
                  linkText: 'text-orange-400'
                }
              }
            ].map((pillar, index) => {
              const isActive = activePillar === index;
              const Icon = pillar.icon;
              return (
                <div 
                  key={index}
                  ref={el => pillarRefs.current[index] = el}
                  className={`group relative p-10 rounded-3xl transition-all duration-700 overflow-hidden flex flex-col h-full
                    bg-white/5 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.3)]
                    md:hover:-translate-y-2 ${pillar.colors.borderHover} ${pillar.colors.bgHover}
                    ${isActive 
                      ? `max-md:scale-100 max-md:opacity-100 max-md:blur-none ${pillar.colors.borderActive} ${pillar.colors.bgActive}` 
                      : 'max-md:scale-[0.96] max-md:opacity-40 max-md:blur-[3px]'
                    }
                  `}
                >
                  {/* Inner subtle glow on hover/active */}
                  <div className={`absolute top-0 right-0 w-32 h-32 ${pillar.colors.iconBg} rounded-full blur-3xl -mr-16 -mt-16 transition-opacity duration-700 -z-10
                    opacity-0 md:group-hover:opacity-100
                    ${isActive ? 'max-md:opacity-100' : ''}
                  `}></div>
                  
                  <div className={`w-16 h-16 ${pillar.colors.iconBg} ${pillar.colors.iconText} rounded-2xl flex items-center justify-center mb-8 border border-white/5`}>
                    <Icon size={32} strokeWidth={1.5} />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">{pillar.title}</h3>
                  <p className="text-slate-300 leading-relaxed flex-grow">
                    {pillar.desc}
                  </p>
                  <div className={`mt-8 flex items-center ${pillar.colors.linkText} font-medium transition-all duration-500
                    md:opacity-0 md:-translate-x-4 md:group-hover:opacity-100 md:group-hover:translate-x-0
                    ${isActive ? 'max-md:opacity-100 max-md:translate-x-0' : 'max-md:opacity-0 max-md:-translate-x-4'}
                  `}>
                    <Link to="/services" className="flex items-center">
                      <span>Learn more</span>
                      <ArrowRight size={16} className="ml-2" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
          
          <div className="text-center mt-16">
            <p className="text-slate-400 mb-6 font-medium text-lg">Not sure what you need? Let's map the right approach together.</p>
            <Button to="/contact" variant="primary" className="rounded-full px-8 py-3 bg-white/10 hover:bg-white/20 text-white border border-white/20 backdrop-blur-md">Book a Discovery Call</Button>
          </div>
        </div>
      </section>

      {/* AI Chatbot Spotlight Section */}
      <section className="py-20 bg-slate-900 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            
            {/* Visual */}
            <div className="relative order-2 lg:order-1">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] bg-blue-500/10 blur-[100px] rounded-full"></div>
              
              <div className="relative bg-slate-800 rounded-xl shadow-2xl border border-slate-700 overflow-hidden max-w-md mx-auto">
                <div className="bg-slate-900/50 border-b border-slate-700 p-4 flex items-center justify-between backdrop-blur-sm">
                  <div className="flex items-center gap-3">
                      <div className="p-1.5 bg-blue-600 rounded-lg">
                        <Bot size={16} className="text-white" />
                      </div>
                      <span className="text-sm font-medium text-slate-200">Talktodata Assistant</span>
                  </div>
                  <MoreHorizontal size={16} className="text-slate-500" />
                </div>
                
                <div className="p-6 space-y-6">
                  {/* User Message */}
                  <div className="flex justify-end animate-fade-in-up">
                      <div className="bg-blue-600 text-white px-5 py-3 rounded-2xl rounded-tr-sm text-sm shadow-md max-w-[85%]">
                        How is our Q3 revenue compared to last year?
                      </div>
                  </div>
                  
                  {/* Bot Message */}
                  <div className="flex items-start gap-3 animate-fade-in-up delay-100">
                      <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center flex-shrink-0 border border-slate-600">
                        <Sparkles size={14} className="text-blue-400" />
                      </div>
                      <div className="bg-slate-700/50 text-slate-200 p-4 rounded-2xl rounded-tl-sm text-sm w-full border border-slate-700/50 shadow-sm">
                          <p className="mb-3 leading-relaxed">
                            Q3 Revenue is <span className="text-green-400 font-bold">+15%</span> compared to last year. 
                            Growth is primarily driven by the <span className="font-semibold text-white">Enterprise</span> segment.
                          </p>

                          {/* Data Table */}
                          <div className="mb-4 overflow-hidden rounded-lg border border-slate-600 bg-slate-800/50">
                            <table className="w-full text-xs text-left">
                              <thead className="bg-slate-900/50 text-slate-400 font-medium border-b border-slate-600">
                                <tr>
                                  <th className="p-2">Segment</th>
                                  <th className="p-2 text-right">Revenue</th>
                                  <th className="p-2 text-right">YoY</th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-slate-600 text-slate-300">
                                <tr>
                                  <td className="p-2">Enterprise</td>
                                  <td className="p-2 text-right">$2.4M</td>
                                  <td className="p-2 text-right text-green-400">+25%</td>
                                </tr>
                                <tr>
                                  <td className="p-2">Mid-Market</td>
                                  <td className="p-2 text-right">$1.1M</td>
                                  <td className="p-2 text-right text-green-400">+12%</td>
                                </tr>
                              </tbody>
                            </table>
                          </div>

                          {/* Mini Chart */}
                          <div className="h-24 bg-slate-800/50 rounded-lg p-3 flex items-end justify-between gap-2 border border-slate-700/50">
                              {[40, 65, 55, 80, 70, 90, 85].map((h, i) => (
                                <div key={i} className="w-full bg-blue-500/20 rounded-t-sm relative group hover:bg-blue-500/40 transition-colors">
                                  <div style={{height: `${h}%`}} className="absolute bottom-0 w-full bg-blue-500 rounded-t-sm"></div>
                                </div>
                              ))}
                          </div>
                      </div>
                  </div>
                </div>

                {/* Input Area */}
                <div className="p-4 bg-slate-900/50 border-t border-slate-700">
                  <div className="h-10 bg-slate-800 rounded-full border border-slate-600 flex items-center px-4 text-sm text-slate-500">
                    <span className="animate-pulse">|</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="order-1 lg:order-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold uppercase tracking-wider mb-6">
                <Sparkles size={12} />
                <span>Enterprise Solutions</span>
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6 leading-tight">
                Stop digging for reports.<br/>
                <span className="text-blue-500">Just ask.</span>
              </h2>
              <p className="text-lg text-slate-400 mb-8 leading-relaxed">
                Meet Talktodata. Ask questions in plain English and get instant, accurate answers—visualized on the fly by connecting directly to your data warehouse.
              </p>
              
              <ul className="space-y-4 mb-8">
                {[
                  "Natural language queries (no SQL needed)",
                  "Instant charts and trend analysis",
                  "Drill-down capabilities in chat",
                  "Secure, role-based data access"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-slate-300">
                    <CheckCircle2 size={18} className="text-blue-500 mt-1 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <Button href="https://talktodata.ai" variant="primary">
                Explore AI Solutions
              </Button>
            </div>

          </div>
        </div>
      </section>

      {/* The Gaps We Fix (Redesigned as Carousel) */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">From Chaos to Clarity</h2>
            <p className="text-lg text-slate-600">See how we transform common data headaches into competitive advantages.</p>
          </div>
          
          <div className="relative">
            {/* Carousel Container */}
            <div className="overflow-hidden relative min-h-[320px] md:min-h-[220px]">
              {chaosItems.map((item, index) => {
                const isActive = index === activeChaosIndex;
                return (
                  <div 
                    key={index} 
                    className={`absolute inset-0 w-full transition-all duration-500 ease-in-out ${
                      isActive ? 'opacity-100 translate-x-0 pointer-events-auto' : 'opacity-0 translate-x-8 pointer-events-none'
                    }`}
                  >
                    <div className="group grid md:grid-cols-[1fr_80px_1fr] gap-4 items-center h-full py-4">
                      
                      {/* Problem Card (Left) */}
                      <div className="relative h-full p-8 bg-white border border-slate-100 rounded-2xl shadow-sm transition-all duration-500 group-hover:border-red-200 group-hover:shadow-lg group-hover:shadow-red-50/50 z-10 flex flex-col justify-center">
                         <div className="absolute left-0 top-6 bottom-6 w-1.5 bg-slate-100 rounded-r-full transition-colors duration-500 group-hover:bg-red-500"></div>
                         <div className="flex items-start gap-5 pl-4">
                            <div className="absolute -top-3 left-6 text-[11px] font-bold text-slate-400 group-hover:text-red-500 transition-colors duration-300 uppercase tracking-widest bg-white px-3">Problem</div>
                            <div className="mt-1 text-slate-300 group-hover:text-red-500 transition-colors duration-300">
                               <AlertCircle size={24} />
                            </div>
                            <div className="relative">
                              <div className="text-lg font-medium text-slate-500 group-hover:text-slate-800 transition-colors duration-300">
                                {item.pain}
                              </div>
                            </div>
                         </div>
                      </div>

                      {/* Connector (Center) */}
                      <div className="hidden md:flex items-center justify-center relative h-full w-full">
                         {/* Static Line */}
                         <div className="w-full h-[2px] bg-slate-100 rounded-full"></div>
                         
                         {/* Flowing Beam */}
                         <div className="absolute left-0 w-full h-[2px] bg-gradient-to-r from-red-400 via-blue-500 to-emerald-500 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-700 ease-out"></div>
                         
                         {/* Particle */}
                         <div className="absolute left-0 w-2 h-2 bg-blue-600 rounded-full shadow-[0_0_8px_rgba(37,99,235,0.6)] opacity-0 group-hover:opacity-100 group-hover:left-[100%] transition-all duration-700 ease-out delay-75"></div>
                         
                         {/* Icon Overlay */}
                         <div className="absolute bg-white p-2 rounded-full border border-slate-100 text-slate-300 group-hover:border-blue-200 group-hover:text-blue-500 transition-all duration-500 z-20">
                            <ArrowRight size={16} />
                         </div>
                      </div>

                      {/* Mobile Connector */}
                      <div className="md:hidden flex justify-center -my-2 z-0 relative">
                         <div className="h-8 w-[2px] bg-slate-100"></div>
                         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-1.5 rounded-full border border-slate-100">
                            <ArrowDown size={14} className="text-slate-300" />
                         </div>
                      </div>

                      {/* Solution Card (Right) */}
                      <div className="relative h-full p-8 bg-slate-50/50 border border-slate-100 rounded-2xl shadow-sm transition-all duration-500 group-hover:bg-white group-hover:border-emerald-200 group-hover:shadow-lg group-hover:shadow-emerald-50/50 z-10 flex flex-col justify-center">
                         <div className="absolute right-0 top-6 bottom-6 w-1.5 bg-slate-200 rounded-l-full transition-colors duration-500 group-hover:bg-emerald-500"></div>
                         <div className="flex items-start gap-5 pr-4">
                            <div className="absolute -top-3 left-6 text-[11px] font-bold text-slate-400 group-hover:text-emerald-600 transition-colors duration-300 uppercase tracking-widest bg-white px-3">Solution</div>
                            <div className="mt-1 text-slate-300 group-hover:text-emerald-500 transition-colors duration-300 delay-150">
                               <CheckCircle2 size={24} />
                            </div>
                            <div className="relative">
                              <div className="text-lg font-semibold text-slate-700 group-hover:text-slate-900 transition-colors duration-300">
                                {item.outcome}
                              </div>
                            </div>
                         </div>
                      </div>

                    </div>
                  </div>
                );
              })}
            </div>

            {/* Navigation Controls */}
            <div className="flex items-center justify-center gap-6 mt-12">
              <button 
                onClick={() => setActiveChaosIndex((prev) => (prev === 0 ? chaosItems.length - 1 : prev - 1))}
                className="p-3 rounded-full bg-white border border-slate-200 text-slate-500 hover:text-blue-600 hover:border-blue-200 hover:bg-blue-50 transition-all shadow-sm"
                aria-label="Previous example"
              >
                <ChevronLeft size={20} />
              </button>
              
              <div className="flex gap-2">
                {chaosItems.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveChaosIndex(idx)}
                    className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                      idx === activeChaosIndex ? 'bg-blue-600 w-8' : 'bg-slate-200 hover:bg-slate-300'
                    }`}
                    aria-label={`Go to example ${idx + 1}`}
                  />
                ))}
              </div>

              <button 
                onClick={() => setActiveChaosIndex((prev) => (prev === chaosItems.length - 1 ? 0 : prev + 1))}
                className="p-3 rounded-full bg-white border border-slate-200 text-slate-500 hover:text-blue-600 hover:border-blue-200 hover:bg-blue-50 transition-all shadow-sm"
                aria-label="Next example"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* How We Work */}
      <section className="py-20 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-16 text-center">How we work</h2>
          
          <div className="grid md:grid-cols-4 gap-8">
            <div className="relative">
              <div className="flex items-center gap-4 mb-4">
                 <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center font-bold text-white">1</div>
                 <h3 className="text-xl font-bold">Discover</h3>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed">We align on business objectives, stakeholders, KPIs, and current data sources.</p>
              {/* Connector Line (Desktop) */}
              <div className="hidden md:block absolute top-5 left-10 w-full h-0.5 bg-slate-700 -z-10 translate-x-4"></div>
            </div>

            <div className="relative">
              <div className="flex items-center gap-4 mb-4">
                 <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center font-bold text-white">2</div>
                 <h3 className="text-xl font-bold">Build</h3>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed">We design the data model, automate data pipelines, and develop dashboards aligned to real workflows.</p>
              <div className="hidden md:block absolute top-5 left-10 w-full h-0.5 bg-slate-700 -z-10 translate-x-4"></div>
            </div>

            <div className="relative">
              <div className="flex items-center gap-4 mb-4">
                 <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center font-bold text-white">3</div>
                 <h3 className="text-xl font-bold">Validate</h3>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed">We run checks, reconcile against existing reports, and ensure numbers are accurate and trusted.</p>
              <div className="hidden md:block absolute top-5 left-10 w-full h-0.5 bg-slate-700 -z-10 translate-x-4"></div>
            </div>

            <div className="relative">
               <div className="flex items-center gap-4 mb-4">
                 <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center font-bold text-white">4</div>
                 <h3 className="text-xl font-bold">Enable</h3>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed">We train users, deliver documentation, and set up a roadmap for continuous improvements.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack (Redesigned with Marquee) */}
      <section className="py-20 bg-white border-b border-slate-100 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-12">
          <h2 className="text-2xl font-bold text-slate-900">Built with the tools that are most reliable</h2>
        </div>
        
        <div className="relative w-full">
           {/* Side Gradients for fading effect */}
           <div className="absolute top-0 left-0 h-full w-24 bg-gradient-to-r from-white to-transparent z-10"></div>
           <div className="absolute top-0 right-0 h-full w-24 bg-gradient-to-l from-white to-transparent z-10"></div>
           
           {/* Marquee Container */}
           <div className="flex w-full overflow-hidden group">
             {/* Animation Track */}
             <div className="flex animate-scroll group-hover:paused">
               
               {/* Original Set */}
               <div className="flex gap-16 px-8 items-center">
                 {tools.map((tool, i) => (
                    <div key={i} className="flex flex-col items-center gap-3 group/icon cursor-default min-w-[80px]">
                      <div className={`w-16 h-16 ${tool.bg} rounded-2xl flex items-center justify-center transition-transform duration-300 group-hover/icon:scale-110 shadow-sm`}>
                        <tool.icon size={32} className={tool.color} />
                      </div>
                      <span className="text-sm font-medium text-slate-600">{tool.name}</span>
                    </div>
                 ))}
               </div>

               {/* Duplicate Set for Seamless Loop */}
               <div className="flex gap-16 px-8 items-center">
                 {tools.map((tool, i) => (
                    <div key={`dup-${i}`} className="flex flex-col items-center gap-3 group/icon cursor-default min-w-[80px]">
                      <div className={`w-16 h-16 ${tool.bg} rounded-2xl flex items-center justify-center transition-transform duration-300 group-hover/icon:scale-110 shadow-sm`}>
                        <tool.icon size={32} className={tool.color} />
                      </div>
                      <span className="text-sm font-medium text-slate-600">{tool.name}</span>
                    </div>
                 ))}
               </div>

             </div>
           </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-slate-900 mb-6">Ready to turn data into your best asset?</h2>
          <p className="text-xl text-slate-600 mb-10">
            Let's discuss how we can solve your data challenges and build a roadmap for success.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button to="/contact" variant="primary" className="text-lg px-8 py-4">Book a Discovery Call</Button>
            <Button to="/services" variant="outline" className="text-lg px-8 py-4">View All Services</Button>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;