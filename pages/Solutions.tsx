import React from 'react';
import { TrendingUp, Users, ShoppingBag, Package, Sparkles, MessageSquare, ArrowRight, Bot, CheckCircle2 } from 'lucide-react';
import Button from '../components/Button';

const Solutions: React.FC = () => {
  const solutions = [
    {
      title: "Executive Performance Dashboards",
      description: "One view for leadership: revenue, margin, growth, and performance drivers—always up to date.",
      icon: <TrendingUp size={32} />
    },
    {
      title: "Sales & Channel Performance",
      description: "Track performance by region, store, product, sales rep, or channel—identify what’s driving results.",
      icon: <ShoppingBag size={32} />
    },
    {
      title: "Customer & Retention Insights",
      description: "Segment customers, track repeat behavior, and monitor churn signals with clear actionable metrics.",
      icon: <Users size={32} />
    },
    {
      title: "Inventory & Supply Chain Visibility",
      description: "Stock health, aging, availability, wastage, and replenishment performance—so operations stay proactive.",
      icon: <Package size={32} />
    }
  ];

  return (
    <div className="bg-slate-50 min-h-screen">
      
      {/* Hero */}
      <section className="bg-slate-900 text-white py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Solutions</h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Pre-built approaches tailored to common business needs—customized for your data sources and KPIs.
          </p>
        </div>
      </section>

      {/* Featured Solution: AI Chatbot */}
      <section className="relative -mt-10 mb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-200">
            <div className="grid lg:grid-cols-2">
              
              {/* Content Side */}
              <div className="p-8 lg:p-12 flex flex-col justify-center">
                 <div className="inline-flex items-center gap-2 self-start px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-bold uppercase tracking-wider mb-6">
                   <Sparkles size={14} />
                   <span>Featured Innovation</span>
                 </div>
                 <h2 className="text-3xl font-bold text-slate-900 mb-4">Flowbyte AI Chatbot</h2>
                 <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                   Empower every team member to become a data analyst. Our natural language chatbot sits on top of your data warehouse, allowing users to ask questions and get instant, visualized answers.
                 </p>
                 
                 <div className="space-y-4 mb-8">
                    {[
                      "Ask questions in plain English",
                      "Instant SQL generation & execution",
                      "Visual responses (Charts & Tables)",
                      "Secure & governed access"
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <CheckCircle2 size={20} className="text-green-500 flex-shrink-0" />
                        <span className="text-slate-700 font-medium">{item}</span>
                      </div>
                    ))}
                 </div>

                 <Button to="/contact" variant="primary" className="self-start">
                   Request a Demo
                 </Button>
              </div>

              {/* Visual Side */}
              <div className="bg-slate-50 p-8 lg:p-12 flex items-center justify-center border-t lg:border-t-0 lg:border-l border-slate-100">
                 <div className="w-full max-w-md bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden">
                    {/* Chat Header */}
                    <div className="px-4 py-3 bg-white border-b border-slate-100 flex items-center gap-3">
                       <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white">
                          <Bot size={18} />
                       </div>
                       <div>
                          <div className="text-sm font-bold text-slate-900">Flowbyte Assistant</div>
                          <div className="flex items-center gap-1.5">
                             <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
                             <div className="text-[10px] text-slate-500 font-medium">Online</div>
                          </div>
                       </div>
                    </div>
                    
                    {/* Chat Area */}
                    <div className="p-4 h-[300px] bg-slate-50/50 flex flex-col gap-4 overflow-y-auto">
                       {/* Bot Welcome */}
                       <div className="flex gap-3">
                          <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                             <Bot size={16} className="text-blue-600" />
                          </div>
                          <div className="bg-white p-3 rounded-2xl rounded-tl-none shadow-sm border border-slate-100 text-sm text-slate-600">
                             Hello! I can help you analyze your data. What would you like to know today?
                          </div>
                       </div>
                       
                       {/* User Query */}
                       <div className="flex gap-3 flex-row-reverse">
                          <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center flex-shrink-0">
                             <Users size={16} className="text-slate-600" />
                          </div>
                          <div className="bg-blue-600 p-3 rounded-2xl rounded-tr-none shadow-sm text-sm text-white">
                             Show me the top selling products this month.
                          </div>
                       </div>

                       {/* Bot Response */}
                       <div className="flex gap-3">
                          <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                             <Bot size={16} className="text-blue-600" />
                          </div>
                          <div className="bg-white p-3 rounded-2xl rounded-tl-none shadow-sm border border-slate-100 text-sm text-slate-600 w-full">
                             <p className="mb-2">Here are the top 3 products for August:</p>
                             <div className="space-y-2">
                                <div className="flex items-center justify-between text-xs font-medium">
                                   <span>Pro Plan Subscription</span>
                                   <span>$12,450</span>
                                </div>
                                <div className="w-full bg-slate-100 rounded-full h-1.5">
                                   <div className="bg-blue-500 h-1.5 rounded-full" style={{width: '90%'}}></div>
                                </div>
                                <div className="flex items-center justify-between text-xs font-medium pt-1">
                                   <span>Data Audit Package</span>
                                   <span>$8,200</span>
                                </div>
                                <div className="w-full bg-slate-100 rounded-full h-1.5">
                                   <div className="bg-blue-500 h-1.5 rounded-full" style={{width: '65%'}}></div>
                                </div>
                             </div>
                          </div>
                       </div>
                    </div>

                    {/* Chat Input */}
                    <div className="p-3 bg-white border-t border-slate-100">
                       <div className="relative">
                          <input type="text" placeholder="Type your question..." className="w-full pl-4 pr-10 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-500" />
                          <button className="absolute right-2 top-1/2 -translate-y-1/2 text-blue-600 hover:text-blue-700">
                             <ArrowRight size={16} />
                          </button>
                       </div>
                    </div>
                 </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Solutions Grid */}
      <section className="py-10 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
             <h3 className="text-2xl font-bold text-slate-900">Standard Business Solutions</h3>
             <p className="text-slate-600 mt-2">Proven dashboards for common department needs</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {solutions.map((sol, index) => (
              <div key={index} className="bg-white p-10 rounded-xl shadow-sm border border-slate-100 hover:shadow-lg transition-all duration-300 group">
                <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  {sol.icon}
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">{sol.title}</h3>
                <p className="text-slate-600 text-lg leading-relaxed">{sol.description}</p>
              </div>
            ))}
          </div>
          
          <div className="mt-16 text-center">
             <Button to="/contact" variant="primary" className="text-lg px-8 py-4">Book a Call</Button>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Solutions;