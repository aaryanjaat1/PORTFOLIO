
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Mail, MapPin, Loader2 } from 'lucide-react';
import Button from '../components/Button';
import { CATEGORIES } from '../constants';
import { supabase } from '../supabase';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const { error } = await supabase
      .from('leads')
      .insert([
        { 
          name: formData.name, 
          email: formData.email, 
          service: formData.service, 
          message: formData.message,
          status: 'new'
        }
      ]);

    if (error) {
      console.error('Error submitting lead:', error);
      alert('Failed to send message. Please try again.');
    } else {
      setSubmitted(true);
    }
    setIsSubmitting(false);
  };

  return (
    <div className="pt-32 pb-24 px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          <div>
            <span className="text-neutral-500 font-mono text-sm block mb-4">/ GET IN TOUCH</span>
            <h1 className="text-5xl md:text-7xl font-black mb-8">Let's create something <span className="text-neutral-500">unforgettable.</span></h1>
            <p className="text-neutral-400 text-xl leading-relaxed mb-12">
              Whether you have a fully-formed idea or just a spark, I'm here to help you bring it to life.
            </p>

            <div className="space-y-8">
              <div className="flex items-center gap-6">
                <div className="w-12 h-12 glass rounded-xl flex items-center justify-center"><Mail size={20} /></div>
                <div>
                  <p className="text-neutral-500 text-xs font-bold uppercase tracking-widest">Email</p>
                  <p className="text-white text-lg">hello@aryan.design</p>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="w-12 h-12 glass rounded-xl flex items-center justify-center"><MapPin size={20} /></div>
                <div>
                  <p className="text-neutral-500 text-xs font-bold uppercase tracking-widest">Location</p>
                  <p className="text-white text-lg">Remote / Worldwide</p>
                </div>
              </div>
            </div>
          </div>

          <div className="glass p-10 md:p-14 rounded-[3rem] border-white/5">
            {submitted ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-20"
              >
                <div className="w-20 h-20 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center mx-auto mb-8">
                  <Send size={32} />
                </div>
                <h3 className="text-3xl font-bold mb-4">Message Sent!</h3>
                <p className="text-neutral-400">Thanks for reaching out. I'll get back to you within 24 hours.</p>
                <Button variant="outline" className="mt-8" onClick={() => setSubmitted(false)}>Send another</Button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-neutral-500 uppercase tracking-widest ml-1">Your Name</label>
                  <input 
                    type="text" 
                    required
                    placeholder="John Doe"
                    className="w-full bg-neutral-900 border border-neutral-800 rounded-2xl px-6 py-4 focus:outline-none focus:border-white transition-colors"
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-neutral-500 uppercase tracking-widest ml-1">Email Address</label>
                  <input 
                    type="email" 
                    required
                    placeholder="john@example.com"
                    className="w-full bg-neutral-900 border border-neutral-800 rounded-2xl px-6 py-4 focus:outline-none focus:border-white transition-colors"
                    value={formData.email}
                    onChange={e => setFormData({...formData, email: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-neutral-500 uppercase tracking-widest ml-1">Service Required</label>
                  <select 
                    className="w-full bg-neutral-900 border border-neutral-800 rounded-2xl px-6 py-4 focus:outline-none focus:border-white transition-colors appearance-none"
                    value={formData.service}
                    onChange={e => setFormData({...formData, service: e.target.value})}
                  >
                    <option value="">Select a service</option>
                    {CATEGORIES.map(c => <option key={c.id} value={c.id}>{c.label}</option>)}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-neutral-500 uppercase tracking-widest ml-1">Message</label>
                  <textarea 
                    rows={4}
                    placeholder="Tell me about your project..."
                    className="w-full bg-neutral-900 border border-neutral-800 rounded-2xl px-6 py-4 focus:outline-none focus:border-white transition-colors resize-none"
                    value={formData.message}
                    onChange={e => setFormData({...formData, message: e.target.value})}
                  />
                </div>
                <Button className="w-full" size="lg" type="submit" disabled={isSubmitting}>
                  {isSubmitting ? <Loader2 className="animate-spin" /> : 'Send Message'}
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
