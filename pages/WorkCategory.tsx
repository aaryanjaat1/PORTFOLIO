
import React, { useState, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { CATEGORIES, MOCK_PROJECTS } from '../constants';
import { ServiceType, Project } from '../types';
import { X, Play, ArrowRight, ExternalLink, Maximize2, Activity, Clock, Layers } from 'lucide-react';
import Button from '../components/Button';

const WorkCategory: React.FC = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const category = CATEGORIES.find(c => c.id === categoryId);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [filter, setFilter] = useState('all');

  if (!category) return <div className="pt-32 text-center">Category not found</div>;

  const projects = MOCK_PROJECTS.filter(p => p.category === categoryId);
  const filters = ['all', ...Array.from(new Set(projects.flatMap(p => p.tags)))];
  const filteredProjects = filter === 'all' ? projects : projects.filter(p => p.tags.includes(filter));

  // Category specific icon for the modal metrics
  const getMetricIcon = () => {
    switch (category.id) {
      case ServiceType.VIDEO_EDITING: return <Play size={16} />;
      case ServiceType.AI_AUTOMATION: return <Clock size={16} />;
      case ServiceType.WEB_DESIGN: return <Activity size={16} />;
      default: return <Layers size={16} />;
    }
  };

  return (
    <div className="pt-40 px-6 min-h-screen relative overflow-hidden bg-black">
      {/* Mesh Glow Background */}
      <div 
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[800px] rounded-full blur-[180px] opacity-15 -z-10"
        style={{ backgroundColor: category.color }}
      ></div>

      <div className="container mx-auto">
        <header className="mb-24 flex flex-col items-center text-center">
          <Link to="/work" className="text-neutral-500 hover:text-white transition-all text-[10px] font-black uppercase tracking-[0.3em] mb-12 flex items-center gap-3 group">
            <span className="group-hover:-translate-x-1 transition-transform">←</span> Return to Selection
          </Link>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-20 h-20 rounded-3xl mb-8 flex items-center justify-center text-4xl glass border-white/10"
          >
            {category.icon}
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl md:text-[9rem] font-black mb-8 uppercase tracking-tighter leading-[0.85]"
          >
            {category.label.split(' ')[0]} <br/> <span className="text-neutral-500">{category.label.split(' ')[1] || ''}</span>
          </motion.h1>
          <p className="text-neutral-400 text-xl md:text-2xl max-w-2xl font-medium leading-relaxed">
            {category.description}
          </p>
        </header>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-20">
          {filters.map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-10 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all duration-500 ${
                filter === f ? 'bg-white text-black shadow-2xl scale-105' : 'glass text-neutral-500 hover:text-white border-white/5'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Dynamic Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-40">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                whileHover={{ y: -10 }}
                onClick={() => setSelectedProject(project)}
                className="group cursor-pointer"
              >
                {/* Conditional Styling per Category */}
                <div className={`relative overflow-hidden glass border-white/5 group-hover:border-white/20 transition-all duration-700
                  ${category.id === ServiceType.VIDEO_EDITING ? 'aspect-[16/10] rounded-[3rem]' : 
                    category.id === ServiceType.GRAPHIC_DESIGN ? 'aspect-square rounded-[3.5rem]' : 
                    'aspect-[16/12] rounded-[2.5rem]'}
                `}>
                  <img 
                    src={project.thumbnail} 
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
                    alt={project.title}
                  />
                  
                  {/* Overlay for all */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-between p-10">
                    <div className="flex justify-between items-start">
                       <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-black shadow-xl">
                          <Maximize2 size={20} />
                       </div>
                       {project.metrics && (
                         <div className="glass px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest">
                           {project.metrics}
                         </div>
                       )}
                    </div>
                    
                    <div className="translate-y-8 group-hover:translate-y-0 transition-transform duration-500">
                       <h3 className="text-3xl font-black uppercase tracking-tighter mb-2">{project.title}</h3>
                       <div className="flex gap-2">
                         {project.tags.map(t => <span key={t} className="text-[9px] text-neutral-400 font-bold uppercase tracking-widest">{t}</span>)}
                       </div>
                    </div>
                  </div>

                  {/* Play Indicator for Video Content */}
                  {(category.id === ServiceType.VIDEO_EDITING || project.videoUrl) && (
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 group-hover:opacity-0 transition-opacity">
                       <div className="w-20 h-20 glass rounded-full flex items-center justify-center text-white backdrop-blur-xl border-white/20">
                          <Play size={24} fill="currentColor" />
                       </div>
                    </div>
                  )}
                </div>
                
                {/* Card Title (outside overlay for better visibility) */}
                <div className="mt-8 px-4 flex justify-between items-end">
                   <div>
                      <h4 className="text-lg font-black uppercase tracking-tight mb-1">{project.title}</h4>
                      <p className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">{project.client}</p>
                   </div>
                   <div className="w-10 h-10 rounded-full border border-neutral-900 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
                      <ArrowRight size={16} />
                   </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Cinematic Modal - The "Director's Cut" */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/98 backdrop-blur-2xl flex items-center justify-center p-4 md:p-12 overflow-y-auto"
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 50 }}
              className="w-full max-w-7xl bg-neutral-950 rounded-[4rem] border border-white/5 overflow-hidden relative shadow-[0_50px_100px_rgba(0,0,0,0.8)]"
            >
              {/* Close Button */}
              <button 
                onClick={() => setSelectedProject(null)}
                className="absolute top-10 right-10 z-[110] w-14 h-14 glass rounded-full flex items-center justify-center text-white hover:bg-white hover:text-black transition-all duration-500 shadow-2xl"
              >
                <X size={28} />
              </button>

              <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[85vh]">
                {/* Media Showcase (Left 7/12) */}
                <div className="lg:col-span-8 bg-black relative group">
                  {selectedProject.videoUrl ? (
                    <video 
                      src={selectedProject.videoUrl} 
                      controls 
                      autoPlay 
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <img 
                      src={selectedProject.thumbnail} 
                      className="w-full h-full object-cover" 
                      alt={selectedProject.title}
                    />
                  )}
                  <div className="absolute bottom-10 left-10 glass px-6 py-3 rounded-2xl flex items-center gap-3 text-xs font-black uppercase tracking-widest border-white/10">
                    <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
                    Direct Preview
                  </div>
                </div>
                
                {/* Details Side (Right 5/12) */}
                <div className="lg:col-span-4 p-12 md:p-16 overflow-y-auto max-h-[85vh] custom-scrollbar border-l border-white/5">
                  <header className="mb-12">
                    <span 
                      className="text-[10px] font-black uppercase tracking-[0.4em] block mb-6"
                      style={{ color: category.color }}
                    >
                      / {category.label}
                    </span>
                    <h2 className="text-5xl font-black uppercase tracking-tighter mb-6 leading-[0.9]">{selectedProject.title}</h2>
                    <div className="flex items-center gap-3 mb-8">
                       <div className="w-10 h-[1px] bg-neutral-800"></div>
                       <p className="text-neutral-500 text-sm font-bold uppercase tracking-widest">{selectedProject.client}</p>
                    </div>
                  </header>

                  <div className="space-y-12">
                    {/* Performance Metric Box */}
                    {selectedProject.metrics && (
                      <div 
                        className="p-8 rounded-[2.5rem] flex items-center gap-6 border-2"
                        style={{ borderColor: `${category.color}30`, backgroundColor: `${category.color}05` }}
                      >
                        <div 
                          className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg"
                          style={{ backgroundColor: category.color }}
                        >
                          {getMetricIcon()}
                        </div>
                        <div>
                          <h5 className="text-[10px] font-black uppercase tracking-widest text-neutral-500 mb-1">Impact Result</h5>
                          <p className="text-xl font-black uppercase">{selectedProject.metrics}</p>
                        </div>
                      </div>
                    )}

                    <div>
                      <h4 className="text-xs font-black uppercase tracking-widest text-neutral-500 mb-4">About this project</h4>
                      <p className="text-neutral-300 text-lg leading-relaxed font-medium">
                        {selectedProject.description}
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-8">
                       <div>
                          <h4 className="text-[10px] font-black uppercase tracking-widest text-neutral-600 mb-4">Tech Stack</h4>
                          <div className="flex flex-wrap gap-2">
                             {selectedProject.tools.map(t => (
                               <span key={t} className="text-[9px] bg-neutral-900 border border-white/5 px-3 py-1.5 rounded-lg font-bold">{t}</span>
                             ))}
                          </div>
                       </div>
                       <div>
                          <h4 className="text-[10px] font-black uppercase tracking-widest text-neutral-600 mb-4">Focus Areas</h4>
                          <div className="flex flex-wrap gap-2">
                             {selectedProject.tags.map(t => (
                               <span key={t} className="text-[9px] text-neutral-400 font-black uppercase">{t}</span>
                             ))}
                          </div>
                       </div>
                    </div>

                    <div className="pt-8 border-t border-white/5">
                       <Button variant="vibrant" className="w-full h-16 rounded-3xl text-sm" gradientClass={`from-${category.color} to-neutral-800`}>
                         Initiate Collaboration
                       </Button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #333;
          border-radius: 10px;
        }
      `}</style>
    </div>
  );
};

export default WorkCategory;
