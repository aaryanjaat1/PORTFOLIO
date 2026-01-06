
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Terminal } from 'lucide-react';
import Button from './Button';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Portfolio', path: '/work' },
    { name: 'AI Automation', path: '/ai-automation' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'py-4' : 'py-6'}`}>
      <div className="container mx-auto px-6">
        <div className={`glass rounded-2xl px-6 py-3 flex items-center justify-between transition-all duration-300 ${scrolled ? 'shadow-2xl' : ''}`}>
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-black group-hover:scale-110 transition-transform">
              <Terminal size={22} />
            </div>
            <span className="font-bold text-xl tracking-tight hidden sm:block uppercase">ARYAN.</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                to={link.path}
                className="text-neutral-400 hover:text-white transition-colors text-xs font-black uppercase tracking-widest"
              >
                {link.name}
              </Link>
            ))}
            <Link to="/admin">
              <Button size="sm" variant="outline" className="text-[10px] uppercase tracking-widest px-4 py-2 border-white/10">Admin</Button>
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 p-6 z-50">
          <div className="glass rounded-2xl p-8 flex flex-col gap-6 items-center shadow-2xl">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                to={link.path}
                onClick={() => setIsOpen(false)}
                className="text-lg font-black uppercase tracking-tighter text-neutral-300"
              >
                {link.name}
              </Link>
            ))}
            <Link to="/contact" className="w-full">
              <Button className="w-full">Hire Me</Button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
