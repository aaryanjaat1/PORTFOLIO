
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowUpRight, Zap, Play, Sparkles, Calendar, Video, Cpu, Globe, CheckCircle, Activity, BarChart3, Clock, Layers } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../components/Button';
import { CATEGORIES } from '../constants';

const Home: React.FC = () => {
  return (
    <div className="overflow-x-hidden pt-24 mesh-gradient relative">
      {/* Structural Grid Background */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none z-0" style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '100px 100px' }}></div>

      {/* Hero Section */}
      <section className="relative min-h-[90vh] lg:min-h-screen flex items-center justify-center px-6 overflow-hidden">
        {/* Colorful Aura Backgrounds */}
        <div className="absolute top-1/4 -left-40 w-[800px] h-[800px] bg-purple-600/10 rounded-full aura-element -z-10 blur-[120px]"></div>
        <div className="absolute bottom-1/4 -right-40 w-[700px] h-[700px] bg-blue-600/10 rounded-full aura-element -z-10 blur-[120px]" style={{ animationDelay: '-5s' }}></div>
        
        <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center relative z-40">
          
          {/* Left Content Column - Perfected Typography Scale */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="flex flex-col items-center lg:items-start text-center lg:text-left"
          >
            <div className="inline-flex items-center gap-3 px-4 py-1.5 glass rounded-full text-[9px] font-black uppercase tracking-[0.3em] text-white/80 mb-8 border-white/10">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
              <Sparkles size={11} className="text-yellow-400" /> Shaping the future of digital
            </div>
            
            <h1 className="text-4xl md:text-6xl xl:text-[5.5rem] font-black mb-10 leading-[1.05] tracking-tighter drop-shadow-2xl">
              Design <span className="text-gradient-purple">Bold.</span> <br />
              Automate <span className="text-gradient-blue">Smart.</span>
            </h1>
            
            <p className="text-neutral-400 text-base md:text-lg max-w-lg mb-12 leading-relaxed font-medium opacity-70">
              Creative Direction meets Engineering. I build scalable digital systems and cinematic brand experiences that dominate markets.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center gap-4 md:gap-6 w-full lg:w-auto relative z-50">
              <Link to="/contact" className="w-full sm:w-auto">
                <Button size="lg" variant="vibrant" gradientClass="from-white to-neutral-200" className="w-full sm:w-auto !text-black group shadow-[0_20px_50px_rgba(255,255,255,0.05)] h-14 md:h-16 px-10 border border-white/20">
                  <Calendar className="mr-3" size={18} />
                  Book Call
                </Button>
              </Link>
              <Link to="/work" className="w-full sm:w-auto">
                <Button size="lg" variant="outline" className="w-full sm:w-auto backdrop-blur-xl group border-white/10 hover:border-white/30 h-14 md:h-16 px-10">
                  View Work
                  <ArrowRight className="ml-3 group-hover:translate-x-1 transition-transform" size={18} />
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Right Visual Column (Preserved Exactly as Requested) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, x: 40 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="hidden lg:flex items-center justify-center relative"
          >
            {/* Background Glow for the Image */}
            <div className="absolute inset-0 bg-blue-600/20 rounded-full blur-[140px] opacity-40 animate-pulse"></div>
            
            <motion.div
              animate={{ 
                y: [0, -25, 0],
                rotate: [0, 2, 0]
              }}
              transition={{ 
                duration: 8, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
              className="relative w-full max-w-[550px] aspect-square"
            >
              <div className="absolute inset-0 border-2 border-white/10 rounded-[4.5rem] -m-4 md:-m-8 z-0"></div>
              <div className="w-full h-full glass rounded-[4rem] border-white/10 overflow-hidden shadow-[0_50px_100px_rgba(0,0,0,0.8)] relative group">
                <img 
                  src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80" 
                  alt="Cinematic Abstract Art" 
                  className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/20 via-transparent to-blue-500/20 mix-blend-overlay"></div>
                
                {/* Visual Metadata Overlay */}
                <div className="absolute bottom-10 left-10 right-10">
                  <div className="flex items-center gap-4 mb-3">
                     <div className="h-[1px] flex-grow bg-white/20"></div>
                     <span className="text-[9px] font-black uppercase tracking-[0.5em] text-white/40">Visualizer v4.2</span>
                  </div>
                  <h3 className="text-2xl font-black uppercase tracking-tighter">Obsidian Synthesis</h3>
                </div>
              </div>

              {/* Decorative Floating Dots */}
              <div className="absolute -top-10 -right-10 w-24 h-24 glass rounded-full border-white/5 flex items-center justify-center animate-bounce duration-[4000ms]">
                <Cpu className="text-blue-400" size={24} />
              </div>
              <div className="absolute -bottom-6 -left-12 w-32 h-32 glass rounded-3xl border-white/5 flex flex-col items-center justify-center gap-2 animate-pulse">
                <div className="w-12 h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <div className="w-2/3 h-full bg-emerald-500"></div>
                </div>
                <span className="text-[8px] font-black uppercase tracking-widest text-neutral-500">Signal Strong</span>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Floating Expertise Chips - Positioned far out to avoid any interference */}
        <div className="absolute inset-0 pointer-events-none hidden 2xl:block z-10">
           <motion.div 
             animate={{ y: [0, -20, 0] }}
             transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
             className="absolute top-[10%] left-[1%] glass p-4 rounded-2xl border-white/10 flex items-center gap-4 opacity-20"
           >
              <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center text-purple-400"><Video size={18} /></div>
              <div>
                <p className="text-[8px] font-black uppercase tracking-widest text-neutral-500">Output</p>
                <p className="text-xs font-bold">RAW 4K Cinematic</p>
              </div>
           </motion.div>

           <motion.div 
             animate={{ y: [0, 25, 0] }}
             transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
             className="absolute bottom-[10%] left-[3%] glass p-4 rounded-2xl border-white/10 flex items-center gap-4 opacity-20"
           >
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-400"><Cpu size={18} /></div>
              <div>
                <p className="text-[8px] font-black uppercase tracking-widest text-neutral-500">Processing</p>
                <p className="text-xs font-bold">12ms Response</p>
              </div>
           </motion.div>
        </div>
      </section>

      {/* Quick Access Grid */}
      <section className="py-20 px-6 relative z-10 bg-black/40 backdrop-blur-sm">
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
          <div className="flex flex-col lg:flex-row items-center justify-between mb-24 gap-12 lg:gap-20">
            <div className="max-w-2xl">
              <h2 className="text-5xl md:text-8xl font-black mb-8 leading-[0.9] tracking-tighter">Expertise that <br/><span className="text-neutral-600">moves the needle.</span></h2>
              <p className="text-neutral-400 text-xl md:text-2xl leading-relaxed font-medium">
                I don't just provide services; I build ecosystems. Each discipline is designed to feed into the next for maximum impact.
              </p>
            </div>
            
            {/* Decorative Visual Asset for the Right Side of Services */}
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: true }}
              className="relative hidden lg:block w-full lg:w-1/3 group"
            >
               <div className="absolute inset-0 bg-blue-500/10 rounded-[4rem] blur-[80px] -z-10 group-hover:bg-purple-500/10 transition-colors duration-1000"></div>
               <motion.div 
                 animate={{ y: [0, -15, 0] }}
                 transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                 className="relative aspect-square overflow-hidden rounded-[3.5rem] border border-white/10 glass shadow-2xl"
               >
                 <img 
                   src="https://images.unsplash.com/photo-1635776062127-d379bfcba9f8?auto=format&fit=crop&w=800&q=80" 
                   alt="Digital Art Abstract" 
                   className="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700 group-hover:scale-110"
                 />
                 <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60"></div>
                 <div className="absolute bottom-8 left-8 right-8">
                    <p className="text-[9px] font-black uppercase tracking-[0.4em] text-white/40 mb-2">Internal R&D</p>
                    <p className="text-lg font-black uppercase tracking-tighter leading-none">Neural Interface v2.0</p>
                 </div>
               </motion.div>
            </motion.div>
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
