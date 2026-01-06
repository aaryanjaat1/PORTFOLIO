
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
// Fixed: replaced non-existent 'Tool' icon with 'Wrench'
import { ArrowLeft, CheckCircle2, Monitor, Wrench, Tag } from 'lucide-react';
import { MOCK_PROJECTS } from '../constants';
import Button from '../components/Button';

const ProjectDetail: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();
  const project = MOCK_PROJECTS.find(p => p.id === projectId);

  if (!project) return <div className="pt-32 text-center">Project not found</div>;

  return (
    <div className="pt-32 pb-24 px-6">
      <div className="container mx-auto">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-neutral-400 hover:text-white mb-12 transition-colors"
        >
          <ArrowLeft size={20} /> Back to Work
        </button>

        <header className="mb-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
            <div>
              <span className="text-neutral-500 font-mono text-sm block mb-4">/ CASE STUDY</span>
              <h1 className="text-4xl md:text-7xl font-bold mb-4">{project.title}</h1>
              <p className="text-2xl text-neutral-400 font-light">{project.client}</p>
            </div>
            <div className="flex flex-wrap gap-3">
              {project.tags.map(tag => (
                <span key={tag} className="glass px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-widest">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="rounded-[3rem] overflow-hidden aspect-video glass relative">
            {project.videoUrl ? (
              <video 
                src={project.videoUrl} 
                controls 
                autoPlay 
                muted 
                className="w-full h-full object-cover"
              />
            ) : (
              <img 
                src={project.thumbnail} 
                className="w-full h-full object-cover" 
                alt={project.title} 
              />
            )}
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          <div className="lg:col-span-2 space-y-16">
            <section>
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-neutral-800 flex items-center justify-center">1</div>
                The Challenge
              </h2>
              <p className="text-neutral-400 text-lg leading-relaxed">
                {project.problem}
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-neutral-800 flex items-center justify-center">2</div>
                Our Strategy
              </h2>
              <p className="text-neutral-400 text-lg leading-relaxed">
                {project.solution}
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-neutral-800 flex items-center justify-center">3</div>
                The Outcome
              </h2>
              <div className="glass p-10 rounded-[2.5rem] border-white/5">
                <p className="text-white text-xl font-medium mb-6">
                  {project.result}
                </p>
                <div className="flex items-center gap-2 text-neutral-500">
                  <CheckCircle2 size={18} className="text-green-500" /> Key Metric: Growth Observed
                </div>
              </div>
            </section>
          </div>

          <aside className="space-y-10">
            <div className="glass p-8 rounded-3xl sticky top-32">
              <h3 className="text-lg font-bold mb-6">Project Metadata</h3>
              
              <div className="space-y-6">
                <div>
                  <p className="text-neutral-500 text-xs uppercase font-bold tracking-widest mb-2 flex items-center gap-2">
                    <Monitor size={14} /> Platform / Category
                  </p>
                  <p className="text-white capitalize">{project.category.replace('-', ' ')}</p>
                </div>

                <div>
                  <p className="text-neutral-500 text-xs uppercase font-bold tracking-widest mb-2 flex items-center gap-2">
                    {/* Fixed: changed Tag to Wrench to match 'Tools Used' label and consistent iconography */}
                    <Wrench size={14} /> Tools Used
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tools.map(tool => (
                      <span key={tool} className="text-xs bg-neutral-800 px-3 py-1 rounded-md">{tool}</span>
                    ))}
                  </div>
                </div>

                <div className="pt-6 border-t border-white/5">
                  <h4 className="font-bold mb-4">Want a result like this?</h4>
                  <Button className="w-full">Get In Touch</Button>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
