
import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Testimonials from './pages/Testimonials';
import Blog from './pages/Blog';
import Contact from './pages/Contact';
import Projects from './pages/Projects';
import AdminDashboard from './pages/AdminDashboard';
import { useSiteStore } from './store';
import { Lock } from 'lucide-react';

const App: React.FC = () => {
  const { data, updateSettings, updateServices, updateTestimonials, updateBlogs, updateProjects } = useSiteStore();
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [password, setPassword] = useState('');

  const ScrollToTop = () => {
    useEffect(() => { window.scrollTo(0, 0); }, []);
    return null;
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'admin123') { setIsAdminAuthenticated(true); setPassword(''); }
    else { alert('Invalid password'); }
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout data={data}><ScrollToTop /><Home data={data} /></Layout>} />
        <Route path="/about" element={<Layout data={data}><ScrollToTop /><About data={data} /></Layout>} />
        <Route path="/projects" element={<Layout data={data}><ScrollToTop /><Projects data={data} /></Layout>} />
        <Route path="/services" element={<Layout data={data}><ScrollToTop /><Services data={data} /></Layout>} />
        <Route path="/testimonials" element={<Layout data={data}><ScrollToTop /><Testimonials data={data} /></Layout>} />
        <Route path="/blog" element={<Layout data={data}><ScrollToTop /><Blog data={data} /></Layout>} />
        <Route path="/contact" element={<Layout data={data}><ScrollToTop /><Contact data={data} /></Layout>} />
        <Route path="/admin" element={
          isAdminAuthenticated ? (
            <AdminDashboard
              data={data}
              updateSettings={updateSettings}
              updateServices={updateServices}
              updateTestimonials={updateTestimonials}
              updateBlogs={updateBlogs}
              updateProjects={updateProjects}
              onLogout={() => setIsAdminAuthenticated(false)}
            />
          ) : (
            <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
              <div className="bg-white p-8 rounded-3xl w-full max-w-md space-y-8 animate-in zoom-in">
                <div className="text-center space-y-2">
                  <Lock size={32} className="mx-auto text-blue-600 mb-4" />
                  <h1 className="text-2xl font-bold">Admin Login</h1>
                </div>
                <form onSubmit={handleLogin} className="space-y-6">
                  <input type="password" required value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" className="w-full bg-slate-50 border p-4 rounded-xl outline-none focus:ring-2 focus:ring-blue-600" />
                  <button type="submit" className="w-full bg-slate-900 text-white font-bold py-4 rounded-xl shadow-xl">Access Dashboard</button>
                </form>
              </div>
            </div>
          )
        } />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default App;
