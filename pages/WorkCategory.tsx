
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { CATEGORIES } from '../constants';
import { ServiceType, Project } from '../types';
import { X, Play, ArrowRight, Maximize2, Activity, Clock, Layers, Calendar, Loader2 } from 'lucide-react';
import Button from '../components/Button';
import { supabase } from '../supabase';

const WorkCategory: React.FC = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const category = CATEGORIES.find(c => c.id === categoryId);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [videoIsLoading, setVideoIsLoading] = useState(true);

  useEffect(() => {
    if (categoryId) {
      fetchProjects();
    }
  }, [categoryId]);

  const fetchProjects = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('category', categoryId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching projects:', error);
    } else if (data) {
      const mappedData: Project[] = data.map(p => ({
        id: p.id,
        title: p.title,
        client: p.client,
        category: p.category as ServiceType,
        thumbnail: p.thumbnail,
        videoUrl: p.video_url,
        aspectRatio: p.aspect_ratio,
        description: p.description,
        tools: p.tools || [],
        tags: p.tags || [],
        metrics: p.metrics,
        createdAt: p.created_at,
        views: p.views || 0
      }));
      setProjects(mappedData);
    }
    setLoading(false);
  };

  const handleOpenModal = (project: Project) => {
    setVideoIsLoading(true);
    setSelectedProject(project);
  };

  const handleCloseModal = () => {
    setSelectedProject(null);
  };

  if (!category) return <div className="pt-32 text-center text-white">Category not found</div>;

  const filters = ['all', ...Array.from(new Set(projects.flatMap(p => p.tags)))];
  const filteredProjects = filter === 'all' ? projects : projects.filter(p => p.tags.includes(filter));

  const getMetricIcon = () => {
    switch (category.id) {
      case ServiceType.VIDEO_EDITING: return <Play size={16} />;
      case ServiceType.AI_AUTOMATION: return <Clock size={16} />;
      case ServiceType.WEB_DESIGN: return <Activity size={16} />;
      default: return <Layers size={16} />;
    }
  };

  return (
    <div className="pt-32 md:pt-40 px-4 md:px-6 min-h-screen relative overflow-hidden bg-black">
      <div 
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] md:h-[800px] rounded-full blur-[120px] md:blur-[180px] opacity-10 md:opacity-15 -z-10"
        style={{ backgroundColor: category.color }}
      ></div>

      <div className="container mx-auto">
        <header className="mb-16 md:mb-24 flex flex-col items-center text-center">
          <Link to="/work" className="text-neutral-500 hover:text-white transition-all text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em] mb-8 md:mb-12 flex items-center gap-3 group">
            <span className="group-hover:-translate-x-1 transition-transform">←</span> Portfolio Overview
          </Link>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-16 h-16 md:w-20 md:h-20 rounded-2xl md:rounded-3xl mb-6 md:mb-8 flex items-center justify-center text-3xl md:text-4xl glass border-white/10"
          >
            {category.icon}
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-[9rem] font-black mb-6 md:mb-8 uppercase tracking-tighter leading-[0.85]"
          >
            {category.label.split(' ')[0]} <br/> <span className="text-neutral-500">{category.label.split(' ')[1] || ''}</span>
          </motion.h1>
          <p className="text-neutral-400 text-lg md:text-2xl max-w-2xl font-medium leading-relaxed px-4">
            {category.description}
          </p>
        </header>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-40">
            <Loader2 size={40} className="animate-spin text-neutral-500 mb-4" />
            <p className="text-xs font-black uppercase tracking-widest text-neutral-500">Retrieving Digital Assets...</p>
          </div>
        ) : (
          <>
            <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-12 md:mb-20">
              {filters.map(f => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-6 md:px-10 py-3 md:py-4 rounded-xl md:rounded-2xl text-[9px] md:text-[10px] font-black uppercase tracking-widest transition-all duration-500 ${
                    filter === f ? 'bg-white text-black shadow-2xl scale-105' : 'glass text-neutral-500 hover:text-white border-white/5'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>

            <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8 mb-40">
              <AnimatePresence mode="popLayout">
                {filteredProjects.map((project) => (
                  <motion.div
                    key={project.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    onClick={() => handleOpenModal(project)}
                    className="break-inside-avoid group cursor-pointer"
                  >
                    <div className={`relative overflow-hidden glass border-white/5 group-hover:border-white/20 transition-all duration-700 rounded-[2rem] md:rounded-[3rem] 
                      ${project.aspectRatio === '9:16' ? 'aspect-[9/16]' : 'aspect-video'}
                    `}>
                      <img 
                        src={project.thumbnail} 
                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" 
                        alt={project.title}
                      />
                      
                      <div className="absolute inset-0 bg-black/70 md:bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-between p-6 md:p-10">
                        <div className="flex justify-between items-start">
                           <div className="w-10 h-10 md:w-12 md:h-12 bg-white rounded-xl md:rounded-2xl flex items-center justify-center text-black shadow-xl">
                              <Maximize2 size={18} className="md:size-[20px]" />
                           </div>
                           {project.metrics && (
                             <div className="glass px-3 py-1.5 md:px-4 md:py-2 rounded-lg md:rounded-xl text-[8px] md:text-[10px] font-black uppercase tracking-widest border border-white/10">
                               {project.metrics}
                             </div>
                           )}
                        </div>
                        
                        {(category.id === ServiceType.VIDEO_EDITING || project.videoUrl) && (
                          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                             <div className="w-14 h-14 md:w-16 md:h-16 bg-white rounded-full flex items-center justify-center text-black shadow-2xl scale-90 group-hover:scale-100 transition-transform duration-500">
                                <Play size={20} className="md:size-[24px]" fill="black" />
                             </div>
                          </div>
                        )}

                        <div className="translate-y-4 md:translate-y-8 group-hover:translate-y-0 transition-transform duration-500">
                           <h3 className="text-xl md:text-3xl font-black uppercase tracking-tighter mb-1 md:mb-2">{project.title}</h3>
                           <div className="flex gap-2">
                             {project.tags.slice(0, 2).map(t => <span key={t} className="text-[8px] md:text-[9px] text-neutral-400 font-bold uppercase tracking-widest">{t}</span>)}
                           </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-4 md:mt-6 px-2 flex justify-between items-end">
                       <div>
                          <h4 className="text-base md:text-lg font-black uppercase tracking-tight mb-0.5 md:mb-1">{project.title}</h4>
                          <p className="text-[8px] md:text-[10px] font-bold text-neutral-500 uppercase tracking-widest">{project.client}</p>
                       </div>
                       <div className="w-8 h-8 md:w-10 md:h-10 rounded-full border border-neutral-900 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
                          <ArrowRight size={14} className="md:size-[16px]" />
                       </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </>
        )}
      </div>

      {/* REFINED CINEMATIC MODAL */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-3xl flex items-center justify-center p-4 md:p-12 overflow-y-auto"
          >
            <motion.div 
              initial={{ scale: 0.92, opacity: 0, y: 30, filter: 'blur(10px)' }}
              animate={{ scale: 1, opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ scale: 0.95, opacity: 0, y: 15, transition: { duration: 0.3 } }}
              transition={{ 
                type: "spring", 
                damping: 30, 
                stiffness: 400, 
                mass: 0.8,
                filter: { duration: 0.4 } 
              }}
              className={`w-full bg-neutral-950 rounded-[2.5rem] md:rounded-[4rem] border border-white/5 overflow-hidden relative shadow-[0_0_100px_rgba(0,0,0,0.8)] flex flex-col lg:flex-row
                ${selectedProject.aspectRatio === '9:16' ? 'max-w-4xl max-h-[90vh]' : 'max-w-7xl'}
              `}
            >
              {/* Close Button */}
              <motion.button 
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleCloseModal}
                className="absolute top-6 right-6 z-[110] w-10 h-10 md:w-14 md:h-14 glass rounded-full flex items-center justify-center text-white hover:bg-white hover:text-black transition-colors duration-300"
              >
                <X size={20} className="md:size-[28px]" />
              </motion.button>

              {/* Media Section with Lazy Loading Video */}
              <div className={`relative bg-black flex items-center justify-center border-b lg:border-b-0 lg:border-r border-white/5
                ${selectedProject.aspectRatio === '16:9' ? 'lg:w-2/3 aspect-video' : 'lg:w-1/2 aspect-[9/16] max-h-[60vh] lg:max-h-none'}
              `}>
                {selectedProject.videoUrl ? (
                  <>
                    {videoIsLoading && (
                      <div className="absolute inset-0 z-10 flex items-center justify-center bg-neutral-900/50 backdrop-blur-sm">
                        <Loader2 className="animate-spin text-white/20" size={48} />
                      </div>
                    )}
                    <video 
                      src={selectedProject.videoUrl} 
                      controls 
                      autoPlay 
                      playsInline
                      onCanPlayThrough={() => setVideoIsLoading(false)}
                      className={`w-full h-full object-contain transition-opacity duration-500 ${videoIsLoading ? 'opacity-0' : 'opacity-100'}`}
                    />
                  </>
                ) : (
                  <img 
                    src={selectedProject.thumbnail} 
                    className="w-full h-full object-cover" 
                    alt={selectedProject.title}
                  />
                )}
              </div>
              
              {/* Content Section */}
              <div className={`p-8 md:p-16 flex flex-col justify-center
                ${selectedProject.aspectRatio === '16:9' ? 'lg:w-1/3' : 'lg:w-1/2'}
              `}>
                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={{
                    visible: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
                    hidden: {}
                  }}
                >
                  <motion.header 
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: { opacity: 1, y: 0 }
                    }}
                    className="mb-8 md:mb-12"
                  >
                    <span className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.4em] block mb-4 md:mb-6" style={{ color: category.color }}>
                      / {category.label}
                    </span>
                    <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-4 md:mb-6 leading-[0.9]">{selectedProject.title}</h2>
                    <p className="text-neutral-500 text-xs md:text-sm font-bold uppercase tracking-widest">{selectedProject.client}</p>
                  </motion.header>

                  <div className="space-y-8 md:space-y-12 overflow-y-auto custom-scrollbar pr-2 max-h-[40vh] lg:max-h-none">
                    {selectedProject.metrics && (
                      <motion.div 
                        variants={{
                          hidden: { opacity: 0, x: -20 },
                          visible: { opacity: 1, x: 0 }
                        }}
                        className="p-6 md:p-8 rounded-2xl md:rounded-[2.5rem] flex items-center gap-4 md:gap-6 border-2 border-white/5 bg-white/5"
                      >
                        <div className="w-10 h-10 md:w-14 md:h-14 rounded-xl md:rounded-2xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: category.color }}>
                          {getMetricIcon()}
                        </div>
                        <div>
                          <h5 className="text-[8px] md:text-[10px] font-black uppercase tracking-widest text-neutral-500 mb-1">Performance</h5>
                          <p className="text-base md:text-xl font-black uppercase">{selectedProject.metrics}</p>
                        </div>
                      </motion.div>
                    )}

                    <motion.p 
                      variants={{
                        hidden: { opacity: 0 },
                        visible: { opacity: 1 }
                      }}
                      className="text-neutral-300 text-sm md:text-lg leading-relaxed"
                    >
                      {selectedProject.description}
                    </motion.p>

                    <motion.div 
                      variants={{
                        hidden: { opacity: 0, y: 10 },
                        visible: { opacity: 1, y: 0 }
                      }}
                      className="pt-6 md:pt-8"
                    >
                       <Link to="/contact">
                         <Button variant="vibrant" className="w-full h-14 md:h-16 rounded-2xl md:rounded-3xl text-xs md:text-sm gap-3" gradientClass={`from-${category.color} to-neutral-800`}>
                           <Calendar size={18} /> Book Discovery Call
                         </Button>
                       </Link>
                    </motion.div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default WorkCategory;
