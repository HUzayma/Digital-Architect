import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navigation from './sections/Navigation';
import Hero from './sections/Hero';
import About from './sections/About';
import Skills from './sections/Skills';
import Apps from './sections/Apps';
import Gallery from './sections/Gallery';
import News from './sections/News';
import Contact from './sections/Contact';
import Footer from './sections/Footer';
import AdminPanel from './sections/AdminPanel';
import { Toaster } from '@/components/ui/sonner';

function App() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleAdminLogin = () => {
    if (adminPassword === 'huzayma2024') {
      setIsAdmin(true);
      setShowAdminLogin(false);
      setAdminPassword('');
    } else {
      alert('Hatalı şifre!');
    }
  };

  const handleLogout = () => {
    setIsAdmin(false);
  };

  if (isAdmin) {
    return <AdminPanel onLogout={handleLogout} />;
  }

  return (
    <div className="min-h-screen bg-[#0a0f1c] relative overflow-x-hidden">
      {/* Animated background */}
      <div className="fixed inset-0 animated-gradient opacity-50 pointer-events-none" />
      
      {/* Grid pattern overlay */}
      <div className="fixed inset-0 grid-pattern pointer-events-none" />
      
      {/* Floating orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute w-96 h-96 rounded-full bg-purple-600/20 blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{ top: '10%', left: '10%' }}
        />
        <motion.div
          className="absolute w-80 h-80 rounded-full bg-blue-600/20 blur-3xl"
          animate={{
            x: [0, -80, 0],
            y: [0, 80, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{ top: '50%', right: '5%' }}
        />
        <motion.div
          className="absolute w-64 h-64 rounded-full bg-cyan-600/15 blur-3xl"
          animate={{
            x: [0, 60, 0],
            y: [0, 40, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{ bottom: '10%', left: '30%' }}
        />
      </div>

      {/* Main content */}
      <div className="relative z-10">
        <Navigation 
          scrollY={scrollY} 
          onAdminClick={() => setShowAdminLogin(true)} 
        />
        
        <main>
          <Hero />
          <About />
          <Skills />
          <Apps />
          <Gallery />
          <News />
          <Contact />
        </main>
        
        <Footer />
      </div>

      {/* Admin Login Modal */}
      <AnimatePresence>
        {showAdminLogin && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="glass rounded-2xl p-8 max-w-md w-full"
            >
              <h2 className="text-2xl font-bold gradient-text mb-6 text-center">
                Admin Girişi
              </h2>
              <input
                type="password"
                placeholder="Şifre"
                value={adminPassword}
                onChange={(e) => setAdminPassword(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleAdminLogin()}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/50 mb-4"
              />
              <div className="flex gap-3">
                <button
                  onClick={() => setShowAdminLogin(false)}
                  className="flex-1 px-4 py-3 rounded-xl bg-white/10 hover:bg-white/20 transition-colors text-white"
                >
                  İptal
                </button>
                <button
                  onClick={handleAdminLogin}
                  className="flex-1 px-4 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 transition-all text-white font-medium"
                >
                  Giriş Yap
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Toaster />
    </div>
  );
}

export default App;
