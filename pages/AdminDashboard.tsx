
import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  AreaChart, Area, ResponsiveContainer, CartesianGrid
} from 'recharts';
import { 
  FolderKanban, Users, Plus, Edit2, Trash2, Activity, LogOut, X, Video, MessageSquare, Mail, CheckCircle, Clock, Monitor, Smartphone, RefreshCw, Loader2, Tag, Wrench
} from 'lucide-react';
import Button from '../components/Button';
import { CATEGORIES } from '../constants';
import { ServiceType, Project, AspectRatio, Lead } from '../types';
import { supabase } from '../supabase';

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const videoPreviewRef = useRef<HTMLVideoElement>(null);
  
  const [activeTab, setActiveTab] = useState<'overview' | 'projects' | 'leads'>('overview');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [loading, setLoading] = useState(true);
  const [isDetecting, setIsDetecting] = useState(false);

  // Form state uses strings for tags/tools to make editing easy for the user
  const [formData, setFormData] = useState({
    title: '', 
    client: '', 
    category: ServiceType.VIDEO_EDITING, 
    description: '', 
    metrics: '', 
    aspectRatio: '16:9' as AspectRatio, 
    toolsRaw: '', 
    tagsRaw: '', 
    thumbnail: '', 
    videoUrl: ''
  });

  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    if (!token) {
      navigate('/login');
      return;
    }
    fetchData();
  }, [navigate]);

  const fetchData = async () => {
    setLoading(true);
    const [projRes, leadsRes] = await Promise.all([
      supabase.from('projects').select('*').order('created_at', { ascending: false }),
      supabase.from('leads').select('*').order('created_at', { ascending: false })
    ]);

    if (projRes.data) {
      setProjects(projRes.data.map(p => ({
        ...p,
        category: p.category as ServiceType,
        videoUrl: p.video_url,
        aspectRatio: p.aspect_ratio,
        createdAt: p.created_at
      })));
    }
    if (leadsRes.data) {
      setLeads(leadsRes.data.map(l => ({
        ...l,
        service: l.service as ServiceType,
        createdAt: l.created_at
      })));
    }
    setLoading(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    navigate('/login');
  };

  const resetForm = () => {
    setEditingId(null);
    setFormData({
      title: '', 
      client: '', 
      category: ServiceType.VIDEO_EDITING, 
      description: '', 
      metrics: '', 
      aspectRatio: '16:9', 
      toolsRaw: '', 
      tagsRaw: '', 
      thumbnail: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe', 
      videoUrl: ''
    });
  };

  const detectAspectRatio = () => {
    if (!formData.videoUrl) return;
    setIsDetecting(true);
    const video = document.createElement('video');
    video.src = formData.videoUrl;
    video.onloadedmetadata = () => {
      const ratio = video.videoWidth / video.videoHeight;
      const detected: AspectRatio = ratio < 1 ? '9:16' : '16:9';
      setFormData(prev => ({ ...prev, aspectRatio: detected }));
      setIsDetecting(false);
    };
    video.onerror = () => {
      setIsDetecting(false);
      alert('Could not load video metadata.');
    };
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Parse raw strings into arrays
    const tools = formData.toolsRaw.split(',').map(s => s.trim()).filter(Boolean);
    const tags = formData.tagsRaw.split(',').map(s => s.trim()).filter(Boolean);

    const payload = {
      title: formData.title,
      client: formData.client,
      category: formData.category,
      thumbnail: formData.thumbnail,
      video_url: formData.videoUrl,
      aspect_ratio: formData.aspectRatio,
      description: formData.description,
      metrics: formData.metrics,
      tools: tools,
      tags: tags
    };

    if (editingId) {
      const { error } = await supabase.from('projects').update(payload).eq('id', editingId);
      if (error) {
        console.error('Update error:', error);
        alert('Failed to update project.');
      } else {
        fetchData();
      }
    } else {
      const { error } = await supabase.from('projects').insert([payload]);
      if (error) {
        console.error('Insert error:', error);
        alert('Failed to create project.');
      } else {
        fetchData();
      }
    }
    setIsModalOpen(false);
  };

  const deleteProject = async (id: string) => {
    if (confirm('Delete asset permanently?')) {
      const { error } = await supabase.from('projects').delete().eq('id', id);
      if (!error) fetchData();
    }
  };

  const updateLeadStatus = async (id: string, status: Lead['status']) => {
    const { error } = await supabase.from('leads').update({ status }).eq('id', id);
    if (!error) fetchData();
    if (selectedLead?.id === id) setSelectedLead(prev => prev ? { ...prev, status } : null);
  };

  const openEditModal = (p: Project) => {
    setEditingId(p.id);
    setFormData({
      title: p.title || '',
      client: p.client || '',
      category: p.category || ServiceType.VIDEO_EDITING,
      description: p.description || '',
      metrics: p.metrics || '',
      aspectRatio: p.aspectRatio || '16:9',
      toolsRaw: (p.tools || []).join(', '),
      tagsRaw: (p.tags || []).join(', '),
      thumbnail: p.thumbnail || '',
      videoUrl: (p as any).video_url || p.videoUrl || ''
    });
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen pt-24 md:pt-32 pb-20 bg-[#020202] text-neutral-100">
      <div className="container mx-auto px-4 md:px-6">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 md:mb-16 gap-6 bg-neutral-900/40 p-6 md:p-10 rounded-2xl md:rounded-[3rem] border border-white/5">
           <div>
              <div className="flex items-center gap-3 mb-2">
                 <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                 <span className="text-[9px] font-black uppercase tracking-[0.4em] text-neutral-500">Cloud Sync Active</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-black uppercase tracking-tighter">Command Center</h1>
           </div>
           <div className="flex gap-3 w-full md:w-auto">
              <Link to="/" className="flex-1 md:flex-none"><Button variant="outline" size="sm" className="w-full bg-transparent border-white/10">Public View</Button></Link>
              <Button onClick={() => { resetForm(); setIsModalOpen(true); }} variant="vibrant" size="sm" gradientClass="from-blue-600 to-indigo-600" className="flex-1 md:flex-none gap-2">
                 <Plus size={18} /> New Project
              </Button>
           </div>
        </header>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-40">
            <Loader2 size={48} className="animate-spin text-neutral-500 mb-6" />
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-neutral-500">Establishing Database Handshake...</p>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8 md:gap-12">
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

            <main className="flex-1">
              {activeTab === 'overview' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                    <div className="glass p-8 rounded-2xl border-white/5">
                        <p className="text-[9px] font-black uppercase tracking-widest text-neutral-500 mb-2">Total Views</p>
                        <h3 className="text-4xl font-black">{projects.reduce((acc, curr) => acc + (curr.views || 0), 0).toLocaleString()}</h3>
                    </div>
                    <div className="glass p-8 rounded-2xl border-white/5">
                        <p className="text-[9px] font-black uppercase tracking-widest text-neutral-500 mb-2">Total Queries</p>
                        <h3 className="text-4xl font-black text-emerald-500">{leads.length}</h3>
                    </div>
                    <div className="glass p-8 rounded-2xl border-white/5 hidden md:block">
                        <p className="text-[9px] font-black uppercase tracking-widest text-neutral-500 mb-2">Asset Count</p>
                        <h3 className="text-4xl font-black text-blue-500">{projects.length}</h3>
                    </div>
                  </div>
                  <div className="glass p-10 rounded-[3rem] border-white/5 h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={[{n:'W1',v:400},{n:'W2',v:1200},{n:'W3',v:800},{n:'W4',v:leads.length * 100}]}>
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
                              <button onClick={() => openEditModal(p)} className="p-2 glass rounded-lg text-blue-400"><Edit2 size={14}/></button>
                              <button onClick={() => deleteProject(p.id)} className="p-2 glass rounded-lg text-red-500"><Trash2 size={14}/></button>
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
                          <span className={`text-[8px] font-black uppercase px-2 py-1 rounded-md ${lead.status === 'new' ? 'bg-emerald-500/10 text-emerald-500' : lead.status === 'contacted' ? 'bg-blue-500/10 text-blue-500' : 'bg-neutral-800 text-neutral-400'}`}>
                            {lead.status}
                          </span>
                        </div>
                        <p className="text-neutral-400 text-xs line-clamp-2 leading-relaxed">{lead.message}</p>
                      </div>
                    ))}
                  </div>

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
                                <button onClick={() => updateLeadStatus(selectedLead.id, 'contacted')} className="p-2 glass rounded-lg text-neutral-400 hover:text-white transition-colors" title="Mark Contacted"><Mail size={16}/></button>
                                <button onClick={() => updateLeadStatus(selectedLead.id, 'closed')} className="p-2 glass rounded-lg text-neutral-400 hover:text-emerald-500 transition-colors" title="Mark Closed"><CheckCircle size={16}/></button>
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
        )}
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-black/95 backdrop-blur-xl">
            <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} className="w-full max-w-6xl glass p-8 md:p-12 rounded-[2rem] md:rounded-[4rem] border border-white/5 grid grid-cols-1 lg:grid-cols-2 gap-10 max-h-[95vh] overflow-y-auto custom-scrollbar">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-2xl font-black uppercase tracking-tighter">Asset Preview</h3>
                    <div className="flex gap-2">
                       <div className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border transition-colors ${formData.aspectRatio === '16:9' ? 'bg-blue-500 text-white border-blue-400' : 'bg-neutral-800 text-neutral-500 border-white/5'}`}>16:9</div>
                       <div className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border transition-colors ${formData.aspectRatio === '9:16' ? 'bg-purple-500 text-white border-purple-400' : 'bg-neutral-800 text-neutral-500 border-white/5'}`}>9:16</div>
                    </div>
                  </div>
                  <div className={`relative bg-neutral-900 rounded-[2rem] border border-white/5 overflow-hidden flex items-center justify-center shadow-inner group
                    ${formData.aspectRatio === '16:9' ? 'aspect-video w-full' : 'aspect-[9/16] w-2/3 mx-auto'}
                  `}>
                    {formData.videoUrl ? (
                      <video key={formData.videoUrl} src={formData.videoUrl} controls className="w-full h-full object-contain" ref={videoPreviewRef}/>
                    ) : (
                      <div className="flex flex-col items-center gap-4 opacity-30">
                        <Video size={48} />
                        <p className="text-[10px] font-black uppercase tracking-[0.2em]">Awaiting Stream Source</p>
                      </div>
                    )}
                  </div>
                  {formData.videoUrl && (
                    <button onClick={detectAspectRatio} disabled={isDetecting} className="w-full py-4 glass border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-white hover:text-black transition-all">
                      <RefreshCw size={14} className={isDetecting ? 'animate-spin' : ''} />
                      {isDetecting ? 'Analyzing Source...' : 'Auto-Detect Dimensions'}
                    </button>
                  )}
                </div>
                <div className="space-y-8">
                  <div className="flex justify-between items-center">
                     <h3 className="text-2xl font-black uppercase tracking-tighter">{editingId ? 'Modify Entity' : 'New Deployment'}</h3>
                     <button onClick={() => setIsModalOpen(false)} className="text-neutral-500 hover:text-white"><X size={24}/></button>
                  </div>
                  <form onSubmit={handleSave} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-[9px] font-black text-neutral-500 uppercase tracking-widest ml-1">Label</label>
                        <input className="w-full bg-neutral-800 p-4 rounded-xl border border-white/5 outline-none font-bold text-sm focus:border-white/20 transition-all" required placeholder="Project Name" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[9px] font-black text-neutral-500 uppercase tracking-widest ml-1">Entity</label>
                        <input className="w-full bg-neutral-800 p-4 rounded-xl border border-white/5 outline-none font-bold text-sm focus:border-white/20 transition-all" placeholder="Client Name" value={formData.client} onChange={e => setFormData({...formData, client: e.target.value})} />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-[9px] font-black text-neutral-500 uppercase tracking-widest ml-1">Stream Source (URL)</label>
                        <input className="w-full bg-neutral-800 p-4 rounded-xl border border-white/5 outline-none font-mono text-xs focus:border-white/20 transition-all" placeholder="https://..." value={formData.videoUrl} onChange={e => setFormData({...formData, videoUrl: e.target.value})} />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[9px] font-black text-neutral-500 uppercase tracking-widest ml-1">Thumbnail (URL)</label>
                        <input className="w-full bg-neutral-800 p-4 rounded-xl border border-white/5 outline-none font-mono text-xs focus:border-white/20 transition-all" placeholder="https://..." value={formData.thumbnail} onChange={e => setFormData({...formData, thumbnail: e.target.value})} />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-[9px] font-black text-neutral-500 uppercase tracking-widest ml-1">Discipline</label>
                        <select className="w-full bg-neutral-800 p-4 rounded-xl border border-white/5 outline-none font-bold appearance-none text-sm" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value as ServiceType})}>
                          {CATEGORIES.map(c => <option key={c.id} value={c.id}>{c.label}</option>)}
                        </select>
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[9px] font-black text-neutral-500 uppercase tracking-widest ml-1">Dimension Profile</label>
                        <div className="grid grid-cols-2 gap-2">
                           <button type="button" onClick={() => setFormData({...formData, aspectRatio: '16:9'})} className={`flex items-center justify-center gap-2 p-4 rounded-xl border transition-all ${formData.aspectRatio === '16:9' ? 'bg-white text-black border-white' : 'bg-neutral-800 text-neutral-500 border-white/5'}`}>
                             <Monitor size={14} /> <span className="text-[10px] font-black uppercase tracking-widest">16:9</span>
                           </button>
                           <button type="button" onClick={() => setFormData({...formData, aspectRatio: '9:16'})} className={`flex items-center justify-center gap-2 p-4 rounded-xl border transition-all ${formData.aspectRatio === '9:16' ? 'bg-white text-black border-white' : 'bg-neutral-800 text-neutral-500 border-white/5'}`}>
                             <Smartphone size={14} /> <span className="text-[10px] font-black uppercase tracking-widest">9:16</span>
                           </button>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-[9px] font-black text-neutral-500 uppercase tracking-widest ml-1 flex items-center gap-2"><Tag size={10}/> Tags (comma separated)</label>
                        <input className="w-full bg-neutral-800 p-4 rounded-xl border border-white/5 outline-none font-medium text-sm focus:border-white/20 transition-all" placeholder="Reels, Cinema, Viral..." value={formData.tagsRaw} onChange={e => setFormData({...formData, tagsRaw: e.target.value})} />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[9px] font-black text-neutral-500 uppercase tracking-widest ml-1 flex items-center gap-2"><Wrench size={10}/> Tools (comma separated)</label>
                        <input className="w-full bg-neutral-800 p-4 rounded-xl border border-white/5 outline-none font-medium text-sm focus:border-white/20 transition-all" placeholder="Davinci, After Effects..." value={formData.toolsRaw} onChange={e => setFormData({...formData, toolsRaw: e.target.value})} />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[9px] font-black text-neutral-500 uppercase tracking-widest ml-1">Performance Metric</label>
                      <input className="w-full bg-neutral-800 p-4 rounded-xl border border-white/5 outline-none font-bold text-sm focus:border-white/20 transition-all" placeholder="e.g. 5M+ Views / 40% Growth" value={formData.metrics} onChange={e => setFormData({...formData, metrics: e.target.value})} />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[9px] font-black text-neutral-500 uppercase tracking-widest ml-1">Narrative</label>
                      <textarea className="w-full bg-neutral-800 p-4 rounded-xl border border-white/5 min-h-[100px] font-medium resize-none text-sm focus:border-white/20 transition-all" placeholder="Project brief and case study details..." value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} />
                    </div>
                    <Button type="submit" variant="vibrant" className="w-full py-5 rounded-2xl uppercase tracking-[0.2em] text-[10px]" gradientClass="from-emerald-600 to-teal-500">Deploy Changes</Button>
                  </form>
                </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminDashboard;
