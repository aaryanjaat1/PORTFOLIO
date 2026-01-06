
import React, { useEffect } from 'react';
import { MemoryRouter as Router, Routes, Route, useLocation, Link } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import WorkOverview from './pages/WorkOverview';
import WorkCategory from './pages/WorkCategory';
import ProjectDetail from './pages/ProjectDetail';
import AIAutomation from './pages/AIAutomation';
import Contact from './pages/Contact';
import AdminDashboard from './pages/AdminDashboard';
import AdminLogin from './pages/AdminLogin';

// ScrollToTop component to handle hash and top resets
const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const element = document.getElementById(hash.replace('#', ''));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  return null;
};

const Footer = () => {
  const location = useLocation();
  // Hide footer on admin and login pages for a cleaner dashboard look
  if (location.pathname.startsWith('/admin') || location.pathname === '/login') return null;

  return (
    <footer className="py-20 px-6 border-t border-neutral-900 bg-[#050505]">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-2">
            <h2 className="text-2xl font-bold mb-6 uppercase tracking-tighter">ARYAN.</h2>
            <p className="text-neutral-500 max-w-sm mb-8 leading-relaxed">
              A creative technologist specializing in high-end design, cinematic video production, and custom AI solutions.
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-6 uppercase text-xs tracking-widest text-neutral-500">Navigation</h4>
            <ul className="space-y-4">
              <li><Link to="/" className="text-neutral-400 hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/work" className="text-neutral-400 hover:text-white transition-colors">Portfolio</Link></li>
              <li><Link to="/ai-automation" className="text-neutral-400 hover:text-white transition-colors">AI Automation</Link></li>
              <li><Link to="/contact" className="text-neutral-400 hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-6 uppercase text-xs tracking-widest text-neutral-500">Connect</h4>
            <ul className="space-y-4">
              <li><a href="#" className="text-neutral-400 hover:text-white transition-colors">LinkedIn</a></li>
              <li><a href="#" className="text-neutral-400 hover:text-white transition-colors">X / Twitter</a></li>
              <li><a href="#" className="text-neutral-400 hover:text-white transition-colors">Instagram</a></li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-neutral-900 text-[10px] font-black uppercase tracking-widest text-neutral-600">
          <p>© 2024 Aryan. Engineered for Excellence.</p>
          <div className="flex gap-8 mt-4 md:mt-0">
            <a href="#" className="hover:text-neutral-400 transition-colors">Privacy</a>
            <a href="#" className="hover:text-neutral-400 transition-colors">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

// Layout component to selectively show Navbar
const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const showNav = !location.pathname.startsWith('/admin') && location.pathname !== '/login';

  return (
    <div className="min-h-screen flex flex-col">
      {showNav && <Navbar />}
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <ScrollToTop />
      <MainLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/work" element={<WorkOverview />} />
          <Route path="/work/:categoryId" element={<WorkCategory />} />
          <Route path="/project/:projectId" element={<ProjectDetail />} />
          <Route path="/ai-automation" element={<AIAutomation />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </MainLayout>
      
      {/* Floating Action Button - Only visible on public pages */}
      <Routes>
        <Route path="/admin" element={null} />
        <Route path="/login" element={null} />
        <Route path="*" element={
          <a 
            href="https://wa.me/yournumber" 
            target="_blank" 
            rel="noopener noreferrer"
            className="fixed bottom-8 right-8 z-50 w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-black shadow-2xl hover:scale-110 transition-transform active:scale-95"
          >
            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
          </a>
        } />
      </Routes>
    </Router>
  );
};

export default App;
