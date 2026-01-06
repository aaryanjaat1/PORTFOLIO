
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { CATEGORIES } from '../constants';
import { ArrowUpRight } from 'lucide-react';

const WorkOverview: React.FC = () => {
  return (
    <div className="pt-32 pb-24 px-6 min-h-screen bg-black overflow-hidden relative">
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-purple-500 rounded-full blur-[150px] aura-element"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-blue-500 rounded-full blur-[150px] aura-element" style={{animationDelay: '-5s'}}></div>
      </div>

      <div className="container mx-auto relative z-10">
        <header className="mb-20 text-center max-w-4xl mx-auto">
          <motion.span 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }}
            className="text-neutral-500 font-mono text-sm tracking-[0.3em] uppercase block mb-6"
          >
            / Selection
          </motion.span>
          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-6xl md:text-9xl font-black uppercase tracking-tighter leading-none mb-8"
          >
            Choose your <span className="text-neutral-500">Path.</span>
          </motion.h1>
          <p className="text-neutral-400 text-xl font-medium">
            Explore my specialized portfolios across creative and technical disciplines.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {CATEGORIES.map((cat, idx) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -10 }}
              className="group"
            >
              <Link to={`/work/${cat.id}`}>
                <div className="relative h-[400px] rounded-[3rem] overflow-hidden glass border-white/5 flex flex-col justify-end p-12 group-hover:border-white/20 transition-all duration-500">
                  <div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500"
                    style={{ backgroundColor: cat.color }}
                  ></div>
                  <div className="absolute top-12 left-12">
                    <div 
                      className="w-16 h-16 rounded-2xl flex items-center justify-center text-4xl bg-neutral-900 border border-white/10 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500"
                    >
                      {cat.icon}
                    </div>
                  </div>
                  <div className="relative z-10">
                    <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-4">{cat.label}</h2>
                    <p className="text-neutral-400 text-lg max-w-sm mb-8 leading-relaxed">
                      {cat.description}
                    </p>
                    <div 
                      className="flex items-center gap-2 text-xs font-black uppercase tracking-widest group-hover:gap-4 transition-all"
                      style={{ color: cat.color }}
                    >
                      Enter Category <ArrowUpRight size={18} />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WorkOverview;
