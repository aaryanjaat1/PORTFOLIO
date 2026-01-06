
import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Bot, Database, Zap, ArrowRight, Share2, Users, Cpu, BarChart3, Cloud } from 'lucide-react';
import Button from '../components/Button';

const AIAutomation: React.FC = () => {
  const workflows = [
    { title: 'WhatsApp Intelligence', icon: <MessageSquare />, desc: 'Auto-reply, lead nurturing, and service booking via WhatsApp API.', color: 'emerald' },
    { title: 'Social DM Engines', icon: <Share2 />, desc: 'Convert stories and DMs into sales pipeline automatically using Llama 3 models.', color: 'blue' },
    { title: 'Neural CRM Sync', icon: <Database />, desc: 'Intelligent lead filtering from ads directly to HubSpot or Salesforce.', color: 'purple' },
    { title: 'Autonomous Support', icon: <Bot />, desc: '24/7 voice & text agents that sound human and solve complex tickets.', color: 'orange' },
  ];

  return (
    <div className="pt-32 pb-24 px-6 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_rgba(16,185,129,0.05)_0%,_transparent_70%)] -z-10"></div>

      <div className="container mx-auto">
        <header className="max-w-4xl mx-auto text-center mb-32 relative">
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-24 h-24 bg-gradient-to-br from-emerald-400 to-teal-600 rounded-[2rem] flex items-center justify-center text-white mx-auto mb-12 shadow-[0_0_60px_rgba(16,185,129,0.4)]"
          >
            <Cpu size={40} />
          </motion.div>
          <h1 className="text-6xl md:text-8xl font-black mb-8 tracking-tighter leading-none">
            Scale your <br/> <span className="text-emerald-500 uppercase">Ambition.</span>
          </h1>
          <p className="text-neutral-400 text-xl md:text-2xl leading-relaxed max-w-2xl mx-auto font-medium">
            Stop doing $10/hour work. I build the neural infrastructure that automates your growth while you sleep.
          </p>
        </header>

        {/* Dynamic Flow Visualizer */}
        <section className="mb-40 relative">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 relative">
            <div className="absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500/0 via-emerald-500/20 to-emerald-500/0 -translate-y-1/2 hidden lg:block"></div>
            {[
              { label: 'Capture', icon: <Users />, sub: 'Leads from social/web' },
              { label: 'Analyze', icon: <Cpu />, sub: 'AI Filtering & Scoring' },
              { label: 'Nurture', icon: <Cloud />, sub: 'Auto Follow-ups' },
              { label: 'Close', icon: <BarChart3 />, sub: 'Booked Appointments' },
            ].map((step, idx) => (
              <motion.div 
                key={step.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.2 }}
                viewport={{ once: true }}
                className="relative z-10 flex flex-col items-center group"
              >
                <div className="w-24 h-24 rounded-3xl glass border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-8 bg-neutral-900 shadow-2xl group-hover:scale-110 group-hover:border-emerald-500 transition-all duration-500">
                  {/* Fixed: Added cast to React.ReactElement<any> to resolve 'size' prop type error */}
                  {React.cloneElement(step.icon as React.ReactElement<any>, { size: 32 })}
                </div>
                <h3 className="text-2xl font-black mb-2 uppercase tracking-tight">{step.label}</h3>
                <p className="text-neutral-500 text-sm font-medium">{step.sub}</p>
              </motion.div>
            ))}
          </div>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-40">
          {workflows.map((flow, i) => (
            <motion.div 
              key={flow.title}
              whileHover={{ y: -10 }}
              className="glass p-12 rounded-[3.5rem] border-white/5 hover:border-white/20 transition-all group overflow-hidden relative"
            >
              <div className={`absolute -top-10 -right-10 w-40 h-40 bg-${flow.color}-500/10 rounded-full blur-3xl`}></div>
              <div className={`w-16 h-16 bg-neutral-900 border border-white/10 rounded-2xl flex items-center justify-center text-${flow.color}-400 mb-10 group-hover:scale-110 transition-transform`}>
                {/* Fixed: Added cast to React.ReactElement<any> to resolve 'size' prop type error */}
                {React.cloneElement(flow.icon as React.ReactElement<any>, { size: 28 })}
              </div>
              <h3 className="text-3xl font-black mb-6 uppercase tracking-tighter">{flow.title}</h3>
              <p className="text-neutral-400 text-lg leading-relaxed mb-10 font-medium">{flow.desc}</p>
              <Button variant="outline" className={`w-full group-hover:bg-white group-hover:text-black`}>View Architecture</Button>
            </motion.div>
          ))}
        </div>

        {/* High Conversion CTA Section */}
        <section className="bg-gradient-to-br from-emerald-600 to-teal-700 rounded-[4rem] p-16 md:p-32 text-center relative overflow-hidden shadow-[0_40px_100px_rgba(16,185,129,0.2)]">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-white/10 rounded-full aura-element blur-[120px]"></div>
          <h2 className="text-5xl md:text-7xl font-black text-white mb-10 tracking-tighter uppercase leading-none">Ready for <br/> liftoff?</h2>
          <p className="text-emerald-100 text-xl md:text-2xl mb-16 max-w-2xl mx-auto font-medium">
            Book a discovery session. We'll find exactly where your business is leaking time and plug it with AI.
          </p>
          <Button size="lg" className="bg-white text-emerald-900 hover:bg-emerald-50 px-16 shadow-2xl">Book Audit Call</Button>
        </section>
      </div>
    </div>
  );
};

export default AIAutomation;
