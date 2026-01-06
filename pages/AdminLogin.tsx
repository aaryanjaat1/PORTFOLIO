
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lock, ShieldCheck, Terminal, ArrowRight, AlertCircle } from 'lucide-react';
import Button from '../components/Button';

const AdminLogin: React.FC = () => {
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    if (token) navigate('/admin');
  }, [navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Simulating a JWT authentication request
    setTimeout(() => {
      if (username === 'admin' && password === 'aryan2024') {
        const mockJwt = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.${btoa(JSON.stringify({user: 'aryan', role: 'admin'}))}.signature`;
        localStorage.setItem('admin_token', mockJwt);
        navigate('/admin');
      } else {
        setError('Authorization Failed: Invalid Credentials');
        setIsLoading(false);
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-6 overflow-hidden relative">
      {/* Background Security Grid */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-500/10 rounded-full blur-[120px] -z-10"></div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md relative"
      >
        <div className="text-center mb-10">
          <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center text-black mx-auto mb-6 shadow-[0_0_50px_rgba(255,255,255,0.1)]">
            <Lock size={32} />
          </div>
          <h1 className="text-3xl font-black uppercase tracking-tighter mb-2">Secure Gateway</h1>
          <p className="text-neutral-500 text-xs font-bold uppercase tracking-[0.2em]">Authorized Personnel Only</p>
        </div>

        <form onSubmit={handleLogin} className="glass p-10 rounded-[2.5rem] border-white/5 space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-neutral-500 uppercase tracking-widest ml-1">Access Identity</label>
            <div className="relative">
              <Terminal className="absolute left-5 top-1/2 -translate-y-1/2 text-neutral-600" size={18} />
              <input 
                type="text" 
                className="w-full bg-neutral-900/50 border border-white/5 rounded-2xl pl-14 pr-6 py-4 outline-none focus:border-white/20 transition-all font-mono text-sm"
                placeholder="root_user"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-neutral-500 uppercase tracking-widest ml-1">Encrypted Key</label>
            <div className="relative">
              <ShieldCheck className="absolute left-5 top-1/2 -translate-y-1/2 text-neutral-600" size={18} />
              <input 
                type="password" 
                className="w-full bg-neutral-900/50 border border-white/5 rounded-2xl pl-14 pr-6 py-4 outline-none focus:border-white/20 transition-all font-mono text-sm"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          {error && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }} 
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2 text-red-500 text-[10px] font-black uppercase bg-red-500/10 p-4 rounded-xl border border-red-500/20"
            >
              <AlertCircle size={14} /> {error}
            </motion.div>
          )}

          <Button 
            type="submit" 
            variant="vibrant" 
            className="w-full py-5 rounded-2xl gap-3 text-xs uppercase tracking-widest"
            gradientClass="from-blue-600 to-indigo-600"
            disabled={isLoading}
          >
            {isLoading ? 'Verifying...' : 'Establish Session'} 
            {!isLoading && <ArrowRight size={16} />}
          </Button>
        </form>

        <div className="mt-8 text-center">
          <button onClick={() => navigate('/')} className="text-neutral-600 hover:text-neutral-400 text-[10px] font-black uppercase tracking-widest transition-colors">
            Return to Public Interface
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminLogin;
