
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowUpRight, Zap, Play, Sparkles, Code } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../components/Button';
import { CATEGORIES } from '../constants';

const Home: React.FC = () => {
  return (
    <div className="overflow-x-hidden pt-24 mesh-gradient">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex flex-col items-center justify-center px-6 overflow-hidden">
        {/* Colorful Aura Backgrounds */}
        <div className="absolute top-1/4 -left-20 w-[600px] h-[600px] bg-purple-600/20 rounded-full aura-element -z-10"></div>
        <div className="absolute bottom-1/4 -right-20 w-[500px] h-[500px] bg-blue-600/10 rounded-full aura-element -z-10" style={{ animationDelay: '-5s' }}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-emerald-500/5 rounded-full aura-element -z-10" style={{ animationDelay: '-10s' }}></div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-center max-w-5xl relative z-10"
        >
          <div className="inline-flex items-center gap-2 px-5 py-2 glass rounded-full text-[10px] font-bold tracking-[0.2em] uppercase text-white mb-10 border-white/20">
            <Sparkles size={14} className="text-yellow-400" /> Shaping the future of digital
          </div>
          <h1 className="text-6xl md:text-[7.5rem] font-black mb-10 leading-[0.9] tracking-tighter">
            I design <span className="text-gradient-purple">bold</span> <br />
            & automate <span className="text-gradient-blue">smart.</span>
          </h1>
          <p className="text-neutral-300 text-lg md:text-2xl max-w-3xl mx-auto mb-14 leading-relaxed font-medium">
            Creative Direction meets Engineering. I build scalable digital systems and cinematic brand experiences that dominate markets.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link to="/#work">
              <Button size="lg" variant="vibrant" gradientClass="from-purple-600 via-blue-600 to-cyan-500" className="group shadow-xl shadow-blue-900/20">
                Explore My Portfolio
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
              </Button>
            </Link>
            <Link to="/contact">
              <Button size="lg" variant="outline" className="backdrop-blur-md">
                Get Started
              </Button>
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-40 px-6 relative">
        <div className="container mx-auto">
          <div className="flex flex-col lg:flex-row items-start justify-between mb-24 gap-12">
            <div className="max-w-2xl">
              <h2 className="text-5xl md:text-7xl font-black mb-8 leading-tight">Expertise that <br/><span className="text-neutral-500">moves the needle.</span></h2>
              <p className="text-neutral-400 text-xl leading-relaxed">
                I don't just provide services; I build ecosystems. Each discipline is designed to feed into the next for maximum impact.
              </p>
            </div>
            <div className="flex flex-col gap-4 text-right">
              <div className="text-sm font-mono text-purple-500 font-bold">/ VIDEO EDITING</div>
              <div className="text-sm font-mono text-blue-500 font-bold">/ GRAPHIC DESIGN</div>
              <div className="text-sm font-mono text-emerald-500 font-bold">/ AI AUTOMATION</div>
              <div className="text-sm font-mono text-orange-500 font-bold">/ WEB DESIGN</div>
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
                  <div 
                    className="absolute inset-0 rounded-[2.5rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-2xl"
                    style={{ backgroundColor: `${category.color}20` }}
                  ></div>
                  <div className="glass p-10 rounded-[2.5rem] h-full flex flex-col transition-all duration-500 hover:bg-neutral-900/40 hover:-translate-y-4 border-white/5 hover:border-white/20">
                    <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-4xl mb-10 bg-neutral-900 border border-white/10 group-hover:scale-110 transition-transform duration-500 shadow-inner">
                      {category.icon}
                    </div>
                    <h3 className="text-2xl font-black mb-4 uppercase tracking-tighter">{category.label}</h3>
                    <p className="text-neutral-400 text-sm leading-relaxed mb-10 flex-grow font-medium">
                      {category.description}
                    </p>
                    <div 
                      className="mt-auto inline-flex items-center text-xs font-black uppercase tracking-widest group-hover:gap-3 transition-all"
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

      {/* Featured Projects with Dynamic Colors */}
      <section id="work" className="py-40 px-6 bg-[#080808]">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between mb-24 gap-6">
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter">PROJECTS</h2>
            <Link to="/work/video-editing">
               <Button variant="vibrant" gradientClass="from-neutral-800 to-neutral-700">Explore Archive</Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {[
              { title: 'Cybernetic Future', cat: 'Graphic Design', color: 'blue', img: 'https://images.unsplash.com/photo-1635332215234-90a8807d9284?auto=format&fit=crop&w=1200&q=80' },
              { title: 'The Silent Path', cat: 'Video Editing', color: 'purple', img: 'https://images.unsplash.com/photo-1492691523567-307300298ff9?auto=format&fit=crop&w=1200&q=80' }
            ].map((p, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="group relative cursor-pointer"
              >
                <div className="relative overflow-hidden rounded-[3rem] aspect-[16/11] mb-8">
                  <div className={`absolute inset-0 bg-${p.color}-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10`}></div>
                  <img 
                    src={p.img} 
                    alt={p.title} 
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  />
                  <div className="absolute top-8 left-8 z-20">
                     <span className="glass px-5 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest">{p.cat}</span>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center z-20 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                    <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center text-black shadow-2xl">
                       <Play size={24} fill="currentColor" />
                    </div>
                  </div>
                </div>
                <div className="flex justify-between items-end px-4">
                  <div>
                    <h3 className="text-3xl font-black mb-2 group-hover:text-neutral-400 transition-colors uppercase tracking-tighter">{p.title}</h3>
                    <p className="text-neutral-500 font-mono text-sm tracking-widest">STREETWEAR BRANDING / 2024</p>
                  </div>
                  <div className="w-12 h-12 rounded-full border border-neutral-800 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
                    <ArrowUpRight size={20} />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics Section with Pop of Color */}
      <section className="py-32 px-6">
        <div className="container mx-auto grid grid-cols-2 lg:grid-cols-4 gap-12">
            {[
              { val: '120+', label: 'Projects Completed', color: 'text-purple-500' },
              { val: '45+', label: 'Happy Clients', color: 'text-blue-500' },
              { val: '15k+', label: 'Hours Automated', color: 'text-emerald-500' },
              { val: '24/7', label: 'Support & Uptime', color: 'text-orange-500' }
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <h4 className={`text-5xl md:text-7xl font-black mb-4 tracking-tighter ${stat.color}`}>{stat.val}</h4>
                <p className="text-neutral-500 uppercase text-xs font-bold tracking-[0.3em]">{stat.label}</p>
              </div>
            ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
