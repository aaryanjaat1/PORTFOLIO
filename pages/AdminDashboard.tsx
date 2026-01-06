
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  AreaChart, Area, XAxis, Tooltip, ResponsiveContainer, CartesianGrid
} from 'recharts';
import { 
  FolderKanban, Users, Plus, Edit2, Trash2, Activity, LogOut, X, Video, MessageSquare, Mail, CheckCircle, Clock
} from 'lucide-react';
import Button from '../components/Button';
import { CATEGORIES, MOCK_PROJECTS, MOCK_LEADS } from '../constants';
import { ServiceType, Project, AspectRatio, Lead } from '../types';

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'overview' | 'projects' | 'leads'>('overview');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [projects, setProjects] = useState<Project[]>(MOCK_PROJECTS);
  const [leads, setLeads] = useState<Lead[]>(MOCK_LEADS);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    navigate('/login');
  };

  const [formData, setFormData] = useState<Partial<Project>>({
    title: '', client: '', category: ServiceType.VIDEO_EDITING, description: '', 
    metrics: '', aspectRatio: '16:9', tools: [], tags: [], 
    thumbnail: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe', videoUrl: ''
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      setProjects(projects.map(p => p.id === editingId ? { ...p, ...formData } as Project : p));
    } else {
      const projectToAdd = {
        ...formData, id: `project-${Date.now()}`, views: 0,
        createdAt: new Date().toISOString(), tools: formData.tools || [], tags: formData.tags || [],
      } as Project;
      setProjects([projectToAdd, ...projects]);
    }
    setIsModalOpen(false);
  };

  const updateLeadStatus = (id: string, status: Lead['status']) => {
    setLeads(leads.map(l => l.id === id ? { ...l, status } : l));
    if (selectedLead?.id === id) setSelectedLead({ ...selectedLead, status });
  };

  return (
    <div className="min-h-screen pt-24 md:pt-32 pb-20 bg-[#020202] text-neutral-100">
      <div className="container mx-auto px-4 md:px-6">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 md:mb-16 gap-6 bg-neutral-900/40 p-6 md:p-10 rounded-2xl md:rounded-[3rem] border border-white/5">
           <div>
              <div className="flex items-center gap-3 mb-2">
                 <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                 <span className="text-[9px] font-black uppercase tracking-[0.4em] text-neutral-500">System Secure</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-black uppercase tracking-tighter">Command Center</h1>
           </div>
           <div className="flex gap-3 w-full md:w-auto">
              <Link to="/" className="flex-1 md:flex-none"><Button variant="outline" size="sm" className="w-full bg-transparent border-white/10">Public View</Button></Link>
              <Button onClick={() => { setEditingId(null); setIsModalOpen(true); }} variant="vibrant" size="sm" gradientClass="from-blue-600 to-indigo-600" className="flex-1 md:flex-none gap-2">
                 <Plus size={18} /> New Project
              </Button>
           </div>
        </header>

        <div className="flex flex-col lg:flex-row gap-8 md:gap-12">
          {/* Sidebar */}
          <aside className="w-full lg:w-64 space-y-2 flex flex-row lg:flex-col overflow-x-auto pb-4 lg:pb-0 custom-scrollbar">
            {[
              { id: 'overview', label: 'Stats', icon: <Activity size={16}/> },
              { id: 'projects', label: 'Work', icon: <FolderKanban size={16}/> },
              { id: 'leads', label: 'Queries', icon: <MessageSquare size={16}/> },
            ].map(item => (
              <button 
                key={item.id}
                onClick={() => setActiveTab(item.id as any)}
                className={`flex-shrink-0 flex items-center gap-3 px-6 py-4 rounded-xl font-black uppercase tracking-widest text-[9px] transition-all whitespace-nowrap lg:w-full ${
                  activeTab === item.id ? 'bg-white text-black shadow-xl' : 'text-neutral-500 hover:text-white hover:bg-neutral-900/50'
                }`}
              >
                {item.icon} {item.label}
              </button>
            ))}
            <button 
              onClick={handleLogout}
              className="flex-shrink-0 flex items-center gap-3 px-6 py-4 rounded-xl text-[9px] font-black uppercase tracking-widest text-red-500 hover:bg-red-500/10 transition-all lg:w-full lg:mt-10"
            >
              <LogOut size={16} /> Terminate
            </button>
          </aside>

          {/* Main Area */}
          <main className="flex-1">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                   <div className="glass p-8 rounded-2xl border-white/5">
                      <p className="text-[9px] font-black uppercase tracking-widest text-neutral-500 mb-2">Total Views</p>
                      <h3 className="text-4xl font-black">1.2M</h3>
                   </div>
                   <div className="glass p-8 rounded-2xl border-white/5">
                      <p className="text-[9px] font-black uppercase tracking-widest text-neutral-500 mb-2">Total Queries</p>
                      <h3 className="text-4xl font-black text-emerald-500">{leads.length}</h3>
                   </div>
                   <div className="glass p-8 rounded-2xl border-white/5 hidden md:block">
                      <p className="text-[9px] font-black uppercase tracking-widest text-neutral-500 mb-2">Conversion %</p>
                      <h3 className="text-4xl font-black text-blue-500">12.4%</h3>
                   </div>
                </div>
                <div className="glass p-10 rounded-[3rem] border-white/5 h-[300px]">
                   <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={[{n:'W1',v:400},{n:'W2',v:1200},{n:'W3',v:800},{n:'W4',v:2400}]}>
                        <CartesianGrid stroke="#111" strokeDasharray="3 3" vertical={false}/>
                        <Area type="monotone" dataKey="v" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.1} />
                      </AreaChart>
                   </ResponsiveContainer>
                </div>
              </div>
            )}

            {activeTab === 'projects' && (
              <div className="glass rounded-[2.5rem] overflow-hidden border-white/5">
                <table className="w-full text-left">
                  <thead className="bg-neutral-900/50 border-b border-white/5">
                    <tr>
                      <th className="px-6 py-5 text-[9px] font-black uppercase tracking-widest text-neutral-500">Asset</th>
                      <th className="px-6 py-5 text-[9px] font-black uppercase tracking-widest text-neutral-500 hidden md:table-cell">Ratio</th>
                      <th className="px-6 py-5 text-[9px] font-black uppercase tracking-widest text-neutral-500 text-right">Ops</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-900">
                    {projects.map(p => (
                      <tr key={p.id} className="hover:bg-white/[0.02] transition-colors group">
                        <td className="px-6 py-6 flex items-center gap-4">
                          <img src={p.thumbnail} className="w-12 h-12 rounded-lg object-cover" />
                          <div>
                            <p className="font-bold text-sm">{p.title}</p>
                            <p className="text-[8px] text-neutral-500 font-black uppercase">{p.client}</p>
                          </div>
                        </td>
                        <td className="px-6 py-6 hidden md:table-cell text-[10px] font-mono text-neutral-500">{p.aspectRatio}</td>
                        <td className="px-6 py-6 text-right">
                          <div className="flex justify-end gap-2">
                            <button onClick={() => { setFormData(p); setEditingId(p.id); setIsModalOpen(true); }} className="p-2 glass rounded-lg text-blue-400"><Edit2 size={14}/></button>
                            <button onClick={() => setProjects(projects.filter(pr => pr.id !== p.id))} className="p-2 glass rounded-lg text-red-500"><Trash2 size={14}/></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {activeTab === 'leads' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Leads List */}
                <div className="space-y-4">
                  <h3 className="text-xl font-black uppercase tracking-tighter mb-6">Inbound Signals</h3>
                  {leads.map(lead => (
                    <div 
                      key={lead.id} 
                      onClick={() => setSelectedLead(lead)}
                      className={`glass p-6 rounded-[2rem] border-white/5 cursor-pointer transition-all hover:border-white/20 ${selectedLead?.id === lead.id ? 'border-white/20 bg-white/5 scale-[1.02]' : ''}`}
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-neutral-900 flex items-center justify-center text-neutral-500"><Users size={18}/></div>
                          <div>
                            <h4 className="font-bold text-sm">{lead.name}</h4>
                            <p className="text-[9px] text-neutral-500 font-black uppercase tracking-widest">{lead.service}</p>
                          </div>
                        </div>
                        <span className={`text-[8px] font-black uppercase px-2 py-1 rounded-md ${lead.status === 'new' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-blue-500/10 text-blue-500'}`}>
                          {lead.status}
                        </span>
                      </div>
                      <p className="text-neutral-400 text-xs line-clamp-2 leading-relaxed">{lead.message}</p>
                    </div>
                  ))}
                </div>

                {/* Lead Detail View */}
                <div className="hidden lg:block">
                  <AnimatePresence mode="wait">
                    {selectedLead ? (
                      <motion.div 
                        key={selectedLead.id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        className="glass p-10 rounded-[3rem] border-white/5 sticky top-32"
                      >
                         <div className="flex justify-between items-start mb-8">
                            <h3 className="text-2xl font-black uppercase tracking-tighter">Query Log</h3>
                            <div className="flex gap-2">
                               <button onClick={() => updateLeadStatus(selectedLead.id, 'contacted')} className="p-2 glass rounded-lg text-neutral-400 hover:text-white transition-colors"><Mail size={16}/></button>
                               <button onClick={() => updateLeadStatus(selectedLead.id, 'closed')} className="p-2 glass rounded-lg text-neutral-400 hover:text-emerald-500 transition-colors"><CheckCircle size={16}/></button>
                            </div>
                         </div>
                         
                         <div className="space-y-8">
                            <div className="grid grid-cols-2 gap-6">
                               <div className="space-y-1">
                                  <p className="text-[9px] font-black uppercase tracking-widest text-neutral-500">Sender</p>
                                  <p className="font-bold">{selectedLead.name}</p>
                               </div>
                               <div className="space-y-1 text-right">
                                  <p className="text-[9px] font-black uppercase tracking-widest text-neutral-500">Received</p>
                                  <p className="font-mono text-[10px]">{new Date(selectedLead.createdAt).toLocaleDateString()}</p>
                               </div>
                            </div>
                            
                            <div className="p-6 bg-neutral-900/50 rounded-2xl border border-white/5">
                               <p className="text-[9px] font-black uppercase tracking-widest text-neutral-500 mb-4 flex items-center gap-2"><Clock size={12}/> Message Narrative</p>
                               <p className="text-sm text-neutral-300 leading-relaxed italic">"{selectedLead.message}"</p>
                            </div>

                            <div className="pt-6 border-t border-white/5">
                               <a href={`mailto:${selectedLead.email}`}>
                                  <Button variant="vibrant" className="w-full py-4 text-[10px] uppercase tracking-widest" gradientClass="from-blue-600 to-indigo-600">Open Communication</Button>
                               </a>
                            </div>
                         </div>
                      </motion.div>
                    ) : (
                      <div className="h-[400px] flex flex-col items-center justify-center text-center opacity-30">
                         <div className="w-20 h-20 rounded-full border border-dashed border-white/20 flex items-center justify-center mb-6"><MessageSquare size={32}/></div>
                         <p className="text-[10px] font-black uppercase tracking-widest">Select a signal to decode</p>
                      </div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Project Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-black/95 backdrop-blur-xl">
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="w-full max-w-2xl glass p-8 md:p-12 rounded-3xl border border-white/5">
                <div className="flex justify-between items-center mb-10">
                   <h3 className="text-2xl font-black uppercase tracking-tighter">{editingId ? 'Edit Asset' : 'New Deployment'}</h3>
                   <button onClick={() => setIsModalOpen(false)} className="text-neutral-500 hover:text-white"><X size={24}/></button>
                </div>
                <form onSubmit={handleSave} className="space-y-6">
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <input className="w-full bg-neutral-900 p-4 rounded-xl border border-white/5 outline-none font-bold" required placeholder="Title" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} />
                      <input className="w-full bg-neutral-900 p-4 rounded-xl border border-white/5 outline-none font-bold" placeholder="Client" value={formData.client} onChange={e => setFormData({...formData, client: e.target.value})} />
                   </div>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <select className="w-full bg-neutral-900 p-4 rounded-xl border border-white/5 outline-none font-bold appearance-none" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value as ServiceType})}>
                        {CATEGORIES.map(c => <option key={c.id} value={c.id}>{c.label}</option>)}
                      </select>
                      <select className="w-full bg-neutral-900 p-4 rounded-xl border border-white/5 outline-none font-bold appearance-none" value={formData.aspectRatio} onChange={e => setFormData({...formData, aspectRatio: e.target.value as AspectRatio})}>
                        <option value="16:9">Landscape</option>
                        <option value="9:16">Portrait</option>
                      </select>
                   </div>
                   <textarea className="w-full bg-neutral-900 p-4 rounded-xl border border-white/5 min-h-[100px] font-medium resize-none" placeholder="Description" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} />
                   <Button type="submit" variant="vibrant" className="w-full py-4 rounded-2xl" gradientClass="from-emerald-600 to-teal-500">Confirm Asset Deployment</Button>
                </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminDashboard;
