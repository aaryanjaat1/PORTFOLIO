
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, AreaChart, Area
} from 'recharts';
import { 
  LayoutDashboard, FolderKanban, Users, Settings, Plus, Edit2, Trash2, 
  ExternalLink, Eye, LogOut, TrendingUp, DollarSign, Activity, X, Upload, Video, Image as ImageIcon
} from 'lucide-react';
import Button from '../components/Button';
import { CATEGORIES, MOCK_PROJECTS } from '../constants';
import { ServiceType, Project } from '../types';

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'projects' | 'leads'>('overview');
  const [isAdding, setIsAdding] = useState(false);
  const [projects, setProjects] = useState<Project[]>(MOCK_PROJECTS);

  const [newProject, setNewProject] = useState<Partial<Project>>({
    title: '',
    client: '',
    category: ServiceType.VIDEO_EDITING,
    description: '',
    metrics: '',
    tools: [],
    tags: [],
    thumbnail: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe',
    videoUrl: ''
  });

  const handleAddProject = (e: React.FormEvent) => {
    e.preventDefault();
    const projectToAdd = {
      ...newProject,
      id: `custom-${Date.now()}`,
      views: 0,
      createdAt: new Date().toISOString(),
      tools: newProject.tools || [],
      tags: newProject.tags || [],
    } as Project;
    setProjects([projectToAdd, ...projects]);
    setIsAdding(false);
    // Reset form
    setNewProject({
      title: '',
      client: '',
      category: ServiceType.VIDEO_EDITING,
      description: '',
      metrics: '',
      tools: [],
      tags: [],
      thumbnail: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe',
      videoUrl: ''
    });
  };

  const deleteProject = (id: string) => {
    if(window.confirm('Delete this asset from your portfolio?')) {
      setProjects(projects.filter(p => p.id !== id));
    }
  };

  return (
    <div className="min-h-screen pt-32 pb-20 bg-[#020202] text-neutral-100">
      <div className="container mx-auto px-6">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-6 bg-neutral-900/40 p-10 rounded-[3rem] border border-white/5">
           <div>
              <div className="flex items-center gap-3 mb-2">
                 <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                 <span className="text-[10px] font-black uppercase tracking-[0.4em] text-neutral-500">System Online</span>
              </div>
              <h1 className="text-4xl font-black uppercase tracking-tighter">Command Center</h1>
              <p className="text-neutral-500 font-medium text-sm">Portfolio Management & Analytics Engine</p>
           </div>
           <div className="flex gap-4">
              <Link to="/"><Button variant="outline" size="sm" className="bg-transparent border-white/10 hover:border-white/20">Exit Dashboard</Button></Link>
              <Button onClick={() => setIsAdding(true)} variant="vibrant" size="sm" gradientClass="from-blue-600 to-indigo-600" className="gap-2">
                 <Plus size={18} /> Deploy Asset
              </Button>
           </div>
        </header>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Sidebar Navigation */}
          <aside className="w-full lg:w-72 space-y-3">
            {[
              { id: 'overview', label: 'Intelligence', icon: <Activity size={18}/> },
              { id: 'projects', label: 'Asset Library', icon: <FolderKanban size={18}/> },
              { id: 'leads', label: 'Client Logs', icon: <Users size={18}/> },
            ].map(item => (
              <button 
                key={item.id}
                onClick={() => setActiveTab(item.id as any)}
                className={`w-full flex items-center gap-4 px-8 py-5 rounded-3xl font-black uppercase tracking-widest text-[10px] transition-all duration-500 ${
                  activeTab === item.id 
                  ? 'bg-white text-black shadow-[0_20px_40px_rgba(255,255,255,0.1)]' 
                  : 'text-neutral-500 hover:text-white hover:bg-neutral-900/50'
                }`}
              >
                {item.icon} {item.label}
              </button>
            ))}
            <div className="pt-10 mt-10 border-t border-neutral-900">
               <button className="w-full flex items-center gap-4 px-8 py-5 rounded-3xl text-[10px] font-black uppercase tracking-widest text-red-500 hover:bg-red-500/10 transition-all">
                <LogOut size={18} /> Terminate Session
              </button>
            </div>
          </aside>

          {/* Main Dashboard Panel */}
          <main className="flex-1 space-y-10">
            {activeTab === 'overview' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                   <div className="glass p-10 rounded-[2.5rem] border-white/5 group hover:border-white/20 transition-all">
                      <p className="text-[10px] font-black uppercase tracking-widest text-neutral-500 mb-4">Network Reach</p>
                      <h3 className="text-5xl font-black tracking-tighter mb-2">1.2M</h3>
                      <p className="text-xs text-emerald-500 font-bold flex items-center gap-1"><TrendingUp size={12}/> +14% this month</p>
                   </div>
                   <div className="glass p-10 rounded-[2.5rem] border-white/5 group hover:border-white/20 transition-all">
                      <p className="text-[10px] font-black uppercase tracking-widest text-neutral-500 mb-4">Total Conversions</p>
                      <h3 className="text-5xl font-black tracking-tighter mb-2">48</h3>
                      <p className="text-xs text-neutral-500 font-bold">Inbound leads processed</p>
                   </div>
                   <div className="glass p-10 rounded-[2.5rem] border-white/5 group hover:border-white/20 transition-all">
                      <p className="text-[10px] font-black uppercase tracking-widest text-neutral-500 mb-4">Storage Used</p>
                      <h3 className="text-5xl font-black tracking-tighter mb-2">84%</h3>
                      <p className="text-xs text-yellow-500 font-bold">Optimization recommended</p>
                   </div>
                </div>
                
                <div className="glass p-12 rounded-[3rem] border-white/5 h-[400px]">
                   <h3 className="text-sm font-black uppercase tracking-widest text-neutral-400 mb-10">Portfolio Engagement History</h3>
                   <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={[
                        { name: 'W1', val: 400 }, { name: 'W2', val: 1200 }, { name: 'W3', val: 900 }, { name: 'W4', val: 2400 }
                      ]}>
                        <defs>
                          <linearGradient id="adminGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4}/>
                            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#111" vertical={false} />
                        <XAxis dataKey="name" stroke="#333" fontSize={10} axisLine={false} tickLine={false} />
                        <Tooltip contentStyle={{ backgroundColor: '#000', border: '1px solid #222', borderRadius: '12px', fontSize: '10px' }} />
                        <Area type="monotone" dataKey="val" stroke="#3b82f6" strokeWidth={3} fill="url(#adminGrad)" />
                      </AreaChart>
                   </ResponsiveContainer>
                </div>
              </motion.div>
            )}

            {activeTab === 'projects' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
                <div className="flex justify-between items-center">
                   <h3 className="text-2xl font-black uppercase tracking-tighter">Active Portfolio Assets</h3>
                   <div className="flex gap-4">
                      <div className="glass px-4 py-2 rounded-xl text-[10px] font-bold text-neutral-500">
                         Total: {projects.length} Items
                      </div>
                   </div>
                </div>

                <div className="glass rounded-[3rem] overflow-hidden border-white/5 shadow-2xl">
                  <table className="w-full text-left">
                    <thead className="bg-neutral-900/50">
                      <tr>
                        <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-neutral-500">Asset Identity</th>
                        <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-neutral-500">Metric Output</th>
                        <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-neutral-500">Discipline</th>
                        <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-neutral-500 text-right">Ops</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-900">
                      {projects.map(p => (
                        <tr key={p.id} className="hover:bg-white/[0.02] group transition-colors">
                          <td className="px-10 py-8 flex items-center gap-5">
                            <div className="w-14 h-14 rounded-2xl overflow-hidden glass border-white/10 group-hover:scale-105 transition-transform">
                               <img src={p.thumbnail} className="w-full h-full object-cover" />
                            </div>
                            <div>
                               <p className="font-black uppercase tracking-tight mb-1 text-sm">{p.title}</p>
                               <p className="text-[10px] text-neutral-500 font-bold uppercase tracking-widest">{p.client}</p>
                            </div>
                          </td>
                          <td className="px-10 py-8">
                             <span className="text-xs font-mono text-neutral-300">{p.metrics || 'N/A'}</span>
                          </td>
                          <td className="px-10 py-8">
                             <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: CATEGORIES.find(c => c.id === p.category)?.color }}></div>
                                <span className="text-[10px] font-black uppercase tracking-widest text-neutral-400">{p.category.split('-')[0]}</span>
                             </div>
                          </td>
                          <td className="px-10 py-8 text-right">
                            <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                              <button className="p-3 glass rounded-xl hover:bg-blue-500/10 hover:text-blue-500 transition-all"><Edit2 size={14}/></button>
                              <button onClick={() => deleteProject(p.id)} className="p-3 glass rounded-xl hover:bg-red-500/10 hover:text-red-500 transition-all"><Trash2 size={14}/></button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            )}

            {activeTab === 'leads' && (
              <div className="glass p-20 rounded-[3.5rem] text-center border-white/5">
                <div className="w-24 h-24 bg-neutral-900 rounded-[2.5rem] flex items-center justify-center text-neutral-800 mx-auto mb-10 border border-white/10 shadow-inner">
                   <Users size={40} />
                </div>
                <h3 className="text-3xl font-black uppercase tracking-tighter mb-4">Pipeline Synchronized</h3>
                <p className="text-neutral-500 max-w-sm mx-auto font-medium text-sm leading-relaxed">No new inbound signals detected on the primary contact grid.</p>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Creation Modal */}
      <AnimatePresence>
        {isAdding && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/95 backdrop-blur-xl"
          >
             <motion.div 
               initial={{ scale: 0.9, y: 50 }}
               animate={{ scale: 1, y: 0 }}
               className="w-full max-w-3xl glass p-12 md:p-16 rounded-[4rem] border border-white/10 relative max-h-[90vh] overflow-y-auto"
             >
                <button onClick={() => setIsAdding(false)} className="absolute top-10 right-10 w-12 h-12 glass rounded-full flex items-center justify-center hover:bg-white hover:text-black transition-all">
                  <X size={24}/>
                </button>
                
                <div className="mb-12">
                   <h3 className="text-4xl font-black uppercase tracking-tighter mb-4">Deploy New Asset</h3>
                   <p className="text-neutral-500 font-medium">Add a high-impact project to your live portfolio.</p>
                </div>

                <form onSubmit={handleAddProject} className="space-y-10">
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-3">
                        <label className="text-[10px] font-black text-neutral-500 uppercase tracking-widest flex items-center gap-2">Project Identity</label>
                        <input className="w-full bg-neutral-900/50 p-5 rounded-2xl border border-white/5 outline-none focus:border-white/20 transition-all font-bold placeholder:text-neutral-700" 
                          required placeholder="e.g. Cyber Brand Redesign" value={newProject.title} onChange={e => setNewProject({...newProject, title: e.target.value})} />
                      </div>
                      <div className="space-y-3">
                        <label className="text-[10px] font-black text-neutral-500 uppercase tracking-widest">Client Name</label>
                        <input className="w-full bg-neutral-900/50 p-5 rounded-2xl border border-white/5 outline-none focus:border-white/20 transition-all font-bold placeholder:text-neutral-700" 
                          placeholder="e.g. Tesla Inc." value={newProject.client} onChange={e => setNewProject({...newProject, client: e.target.value})} />
                      </div>
                   </div>

                   <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-3">
                        <label className="text-[10px] font-black text-neutral-500 uppercase tracking-widest">Project Discipline</label>
                        <select className="w-full bg-neutral-900/50 p-5 rounded-2xl border border-white/5 outline-none focus:border-white/20 transition-all font-bold appearance-none"
                          value={newProject.category} onChange={e => setNewProject({...newProject, category: e.target.value as ServiceType})}>
                          {CATEGORIES.map(c => <option key={c.id} value={c.id}>{c.label}</option>)}
                        </select>
                      </div>
                      <div className="space-y-3">
                        <label className="text-[10px] font-black text-neutral-500 uppercase tracking-widest">Core Impact Metric</label>
                        <input className="w-full bg-neutral-900/50 p-5 rounded-2xl border border-white/5 outline-none focus:border-white/20 transition-all font-bold placeholder:text-neutral-700" 
                          placeholder="e.g. 50% Sales Lift" value={newProject.metrics} onChange={e => setNewProject({...newProject, metrics: e.target.value})} />
                      </div>
                   </div>

                   <div className="space-y-3">
                      <label className="text-[10px] font-black text-neutral-500 uppercase tracking-widest flex items-center gap-2"><ImageIcon size={14}/> Thumbnail Source (URL)</label>
                      <input className="w-full bg-neutral-900/50 p-5 rounded-2xl border border-white/5 font-mono text-xs" 
                        placeholder="https://images.unsplash.com/..." value={newProject.thumbnail} onChange={e => setNewProject({...newProject, thumbnail: e.target.value})} />
                   </div>

                   <div className="space-y-3">
                      <label className="text-[10px] font-black text-neutral-500 uppercase tracking-widest flex items-center gap-2"><Video size={14}/> Showcase Video Stream (URL)</label>
                      <input className="w-full bg-neutral-900/50 p-5 rounded-2xl border border-white/5 font-mono text-xs" 
                        placeholder="https://..." value={newProject.videoUrl} onChange={e => setNewProject({...newProject, videoUrl: e.target.value})} />
                   </div>

                   <div className="space-y-3">
                      <label className="text-[10px] font-black text-neutral-500 uppercase tracking-widest">Narrative Overview</label>
                      <textarea className="w-full bg-neutral-900/50 p-5 rounded-3xl border border-white/5 min-h-[120px] outline-none focus:border-white/20 transition-all font-medium resize-none" 
                        placeholder="Describe the problem, process, and ultimate success..." value={newProject.description} onChange={e => setNewProject({...newProject, description: e.target.value})} />
                   </div>

                   <div className="pt-6">
                      <Button type="submit" variant="vibrant" className="w-full h-20 rounded-[2.5rem] text-sm uppercase tracking-[0.2em]" gradientClass="from-emerald-600 to-teal-500">
                        Finalize Deployment
                      </Button>
                   </div>
                </form>
             </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminDashboard;
