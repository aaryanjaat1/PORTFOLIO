
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowUpRight, Zap, Play, Sparkles, Calendar, Video, Cpu, Globe, CheckCircle, Activity } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../components/Button';
import { CATEGORIES } from '../constants';

const Home: React.FC = () => {
  return (
    <div className="overflow-x-hidden pt-24 mesh-gradient relative">
      {/* Structural Grid Background */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '100px 100px' }}></div>

      {/* Hero Section */}
      <section className="relative min-h-[95vh] flex flex-col items-center justify-center px-6 overflow-hidden">
        {/* Colorful Aura Backgrounds - Expanded for better coverage */}
        <div className="absolute top-1/4 -left-40 w-[800px] h-[800px] bg-purple-600/20 rounded-full aura-element -z-10 blur-[120px]"></div>
        <div className="absolute bottom-1/4 -right-40 w-[700px] h-[700px] bg-blue-600/15 rounded-full aura-element -z-10 blur-[120px]" style={{ animationDelay: '-5s' }}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] bg-emerald-500/5 rounded-full aura-element -z-10 blur-[180px]" style={{ animationDelay: '-8s' }}></div>
        
        {/* Floating Expertise Chips - Fills negative space around text */}
        <div className="absolute inset-0 max-w-7xl mx-auto pointer-events-none hidden lg:block">
           <motion.div 
             animate={{ y: [0, -20, 0] }}
             transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
             className="absolute top-[15%] left-[5%] glass p-4 rounded-2xl border-white/10 flex items-center gap-4"
           >
              <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center text-purple-400"><Video size={18} /></div>
              <div>
                <p className="text-[8px] font-black uppercase tracking-widest text-neutral-500">Video Output</p>
                <p className="text-xs font-bold">RAW 4K Cinematic</p>
              </div>
           </motion.div>

           <motion.div 
             animate={{ y: [0, 25, 0] }}
             transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
             className="absolute bottom-[20%] left-[8%] glass p-4 rounded-2xl border-white/10 flex items-center gap-4"
           >
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-400"><Cpu size={18} /></div>
              <div>
                <p className="text-[8px] font-black uppercase tracking-widest text-neutral-500">AI Latency</p>
                <p className="text-xs font-bold">12ms Response</p>
              </div>
           </motion.div>

           <motion.div 
             animate={{ y: [0, -15, 0] }}
             transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
             className="absolute top-[25%] right-[5%] glass p-4 rounded-2xl border-white/10 flex items-center gap-4"
           >
              <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center text-blue-400"><Globe size={18} /></div>
              <div>
                <p className="text-[8px] font-black uppercase tracking-widest text-neutral-500">Deployment</p>
                <p className="text-xs font-bold">Global Infrastructure</p>
              </div>
           </motion.div>

           <motion.div 
             animate={{ y: [0, 20, 0] }}
             transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
             className="absolute bottom-[30%] right-[10%] glass p-4 rounded-2xl border-white/10 flex items-center gap-4"
           >
              <div className="w-10 h-10 rounded-xl bg-orange-500/20 flex items-center justify-center text-orange-400"><CheckCircle size={18} /></div>
              <div>
                <p className="text-[8px] font-black uppercase tracking-widest text-neutral-500">Project Status</p>
                <p className="text-xs font-bold">Available for Q3</p>
              </div>
           </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-center max-w-5xl relative z-10"
        >
          <div className="inline-flex items-center gap-3 px-5 py-2 glass rounded-full text-[10px] font-bold tracking-[0.3em] uppercase text-white mb-10 border-white/20">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
            <Sparkles size={14} className="text-yellow-400" /> Shaping the future of digital
          </div>
          
          <h1 className="text-6xl md:text-[9.5rem] font-black mb-10 leading-[0.8] tracking-tighter">
            Design <span className="text-gradient-purple">Bold</span> <br />
            Automate <span className="text-gradient-blue">Smart.</span>
          </h1>
          
          <p className="text-neutral-300 text-lg md:text-2xl max-w-3xl mx-auto mb-14 leading-relaxed font-medium px-4">
            Creative Direction meets Engineering. I build scalable digital systems and cinematic brand experiences that dominate markets.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-8">
            <Link to="/contact" className="w-full sm:w-auto">
              <Button size="lg" variant="vibrant" gradientClass="from-white to-neutral-200" className="w-full sm:w-auto !text-black group shadow-[0_20px_50px_rgba(255,255,255,0.1)] h-16 md:h-20 px-10">
                <Calendar className="mr-3" size={20} />
                Book Discovery Call
              </Button>
            </Link>
            <Link to="/work" className="w-full sm:w-auto">
              <Button size="lg" variant="outline" className="w-full sm:w-auto backdrop-blur-md group border-white/10 hover:border-white/40 h-16 md:h-20 px-10">
                View Portfolio
                <ArrowRight className="ml-3 group-hover:translate-x-1 transition-transform" size={20} />
              </Button>
            </Link>
          </div>
        </motion.div>

        {/* Hero Bottom Stats - Fills vertical gap before the next section */}
        <div className="absolute bottom-12 left-0 right-0 hidden lg:flex justify-center gap-20">
           {[
             { label: 'Views Generated', val: '150M+' },
             { label: 'Projects Deployed', val: '250+' },
             { label: 'AI Hours Saved', val: '10k+' }
           ].map((stat, i) => (
             <motion.div 
               key={i} 
               initial={{ opacity: 0 }} 
               animate={{ opacity: 0.5 }} 
               transition={{ delay: 1 + (i * 0.2) }}
               className="text-center"
             >
                <p className="text-[9px] font-black uppercase tracking-widest text-neutral-500 mb-1">{stat.label}</p>
                <p className="text-xl font-black">{stat.val}</p>
             </motion.div>
           ))}
        </div>
      </section>

      {/* Quick Access Grid */}
      <section className="py-20 px-6 relative z-10">
        <div className="container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {CATEGORIES.map(cat => (
                <Link key={cat.id} to={`/work/${cat.id}`} className="glass p-10 rounded-[2.5rem] border-white/5 hover:border-white/20 transition-all group relative overflow-hidden">
                   <div 
                     className="absolute -right-4 -bottom-4 text-8xl opacity-[0.03] group-hover:opacity-[0.07] transition-all duration-700"
                   >
                     {cat.icon}
                   </div>
                   <div className="text-3xl mb-6 group-hover:scale-110 transition-transform origin-left">{cat.icon}</div>
                   <h4 className="font-black uppercase tracking-tighter text-xl">{cat.label}</h4>
                   <p className="text-neutral-500 text-[10px] font-black uppercase tracking-widest mt-4 flex items-center gap-2 group-hover:gap-4 transition-all">
                     Explore assets <ArrowRight size={14} />
                   </p>
                </Link>
              ))}
            </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 md:py-40 px-6 relative">
        <div className="container mx-auto">
          <div className="flex flex-col lg:flex-row items-start justify-between mb-24 gap-12">
            <div className="max-w-2xl">
              <h2 className="text-5xl md:text-8xl font-black mb-8 leading-[0.9] tracking-tighter">Expertise that <br/><span className="text-neutral-600">moves the needle.</span></h2>
              <p className="text-neutral-400 text-xl md:text-2xl leading-relaxed font-medium">
                I don't just provide services; I build ecosystems. Each discipline is designed to feed into the next for maximum impact.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {CATEGORIES.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
              >
                <Link to={`/work/${category.id}`} className="group relative block h-full">
                  <div className="glass p-10 rounded-[3rem] h-full flex flex-col transition-all duration-500 hover:bg-neutral-900/40 hover:-translate-y-4 border-white/5 hover:border-white/20">
                    <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-4xl mb-10 bg-neutral-900 border border-white/10 group-hover:scale-110 transition-transform duration-500 shadow-inner">
                      {category.icon}
                    </div>
                    <h3 className="text-2xl font-black mb-4 uppercase tracking-tighter">{category.label}</h3>
                    <p className="text-neutral-400 text-sm leading-relaxed mb-10 flex-grow font-medium">
                      {category.description}
                    </p>
                    <div 
                      className="mt-auto inline-flex items-center text-[10px] font-black uppercase tracking-widest group-hover:gap-3 transition-all"
                      style={{ color: category.color }}
                    >
                      View Portfolio <ArrowUpRight size={16} className="ml-2" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
