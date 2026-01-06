
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowUpRight, Zap, Play, Sparkles, Calendar, Video } from 'lucide-react';
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
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-center max-w-5xl relative z-10"
        >
          <div className="inline-flex items-center gap-2 px-5 py-2 glass rounded-full text-[10px] font-bold tracking-[0.2em] uppercase text-white mb-10 border-white/20">
            <Sparkles size={14} className="text-yellow-400" /> Shaping the future of digital
          </div>
          <h1 className="text-6xl md:text-[8.5rem] font-black mb-10 leading-[0.85] tracking-tighter">
            Design <span className="text-gradient-purple">Bold</span> <br />
            Automate <span className="text-gradient-blue">Smart.</span>
          </h1>
          <p className="text-neutral-300 text-lg md:text-2xl max-w-3xl mx-auto mb-14 leading-relaxed font-medium">
            Creative Direction meets Engineering. I build scalable digital systems and cinematic brand experiences that dominate markets.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6">
            <Link to="/contact" className="w-full sm:w-auto">
              <Button size="lg" variant="vibrant" gradientClass="from-white to-neutral-300" className="w-full sm:w-auto !text-black group shadow-2xl">
                <Calendar className="mr-3" size={20} />
                Book a Discovery Call
              </Button>
            </Link>
            <Link to="/work" className="w-full sm:w-auto">
              <Button size="lg" variant="outline" className="w-full sm:w-auto backdrop-blur-md group border-white/10 hover:border-white/40">
                View Portfolio
                <ArrowRight className="ml-3 group-hover:translate-x-1 transition-transform" size={20} />
              </Button>
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Quick Access Grid */}
      <section className="py-20 px-6">
        <div className="container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {CATEGORIES.map(cat => (
                <Link key={cat.id} to={`/work/${cat.id}`} className="glass p-8 rounded-3xl border-white/5 hover:border-white/20 transition-all group">
                   <div className="text-3xl mb-4 group-hover:scale-110 transition-transform origin-left">{cat.icon}</div>
                   <h4 className="font-black uppercase tracking-tighter text-lg">{cat.label}</h4>
                   <p className="text-neutral-500 text-xs font-medium mt-2">Explore {cat.label} assets →</p>
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
              <h2 className="text-5xl md:text-7xl font-black mb-8 leading-tight">Expertise that <br/><span className="text-neutral-500">moves the needle.</span></h2>
              <p className="text-neutral-400 text-xl leading-relaxed">
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
    </div>
  );
};

export default Home;
