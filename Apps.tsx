import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../components/ui/dialog';
  ExternalLink, 
  Star, 
  Download, 
  Smartphone,
  Gamepad2,
  Wrench,
  ChevronLeft,
  ChevronRight,
  Palette
} from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { db } from './firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';

export default function Apps() {
  const [apps, setApps] = useState<any[]>([]);
  const [selectedApp, setSelectedApp] = useState<any | null>(null);
  const [currentScreenshot, setCurrentScreenshot] = useState(0);
  const [loading, setLoading] = useState(true);

  // Firebase'den Verileri Çek
  useEffect(() => {
    const fetchApps = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "applications"));
        const data = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setApps(data);
        setLoading(false);
      } catch (error) {
        console.error("Veri çekme hatası:", error);
        setLoading(false);
      }
    };
    fetchApps();
  }, []);

  const nextScreenshot = () => {
    if (selectedApp) {
      setCurrentScreenshot((prev) => (prev + 1) % (selectedApp.screenshots || 1));
    }
  };

  const prevScreenshot = () => {
    if (selectedApp) {
      setCurrentScreenshot((prev) => (prev - 1 + (selectedApp.screenshots || 1)) % (selectedApp.screenshots || 1));
    }
  };

  // Kategoriye göre ikon belirleme yardımcı fonksiyonu
  const getIcon = (category: string) => {
    switch (category?.toLowerCase()) {
      case 'oyun': return Gamepad2;
      case 'üretkenlik': return Wrench;
      case 'yaratıcılık': return Palette;
      default: return Smartphone;
    }
  };

  if (loading) return <div className="py-24 text-center text-white">Yükleniyor...</div>;

  return (
    <section id="apps" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-green-600/10 border border-green-500/20 text-green-400 text-sm mb-4">
            Uygulamalarım
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Play Store'daki Uygulamalarım
          </h2>
          <p className="text-lg text-white/60 max-w-3xl mx-auto">
            Kullanıcıların günlük hayatlarına değer katan, bulut veritabanı ile güncellenen Android uygulamalarımı keşfedin.
          </p>
        </motion.div>

        {/* Apps grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {apps.map((app, index) => {
            const IconComponent = getIcon(app.category);
            return (
              <motion.div
                key={app.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group"
              >
                <div className="glass rounded-2xl overflow-hidden card-hover h-full flex flex-col bg-white/5 border border-white/10">
                  {/* App icon area */}
                  <div className={`h-48 bg-gradient-to-br from-blue-600 to-purple-600 relative overflow-hidden`}>
                    <img src={app.image} alt={app.title} className="absolute inset-0 w-full h-full object-cover opacity-50" />
                    <div className="absolute inset-0 bg-black/20" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-20 h-20 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30">
                        <IconComponent className="w-10 h-10 text-white" />
                      </div>
                    </div>
                  </div>

                  {/* App info */}
                  <div className="p-6 flex-1 flex flex-col">
                    <h3 className="text-xl font-bold text-white mb-1">{app.title}</h3>
                    <span className="text-sm text-white/50 mb-3">{app.category}</span>
                    <p className="text-white/60 text-sm mb-4 flex-1">{app.description}</p>

                    {/* Buttons */}
                    <div className="flex gap-3 mt-auto">
                      <button
                        onClick={() => setSelectedApp(app)}
                        className="flex-1 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-sm font-medium transition-all"
                      >
                        Detaylar
                      </button>
                      <a
                        href={app.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center w-10 h-10 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition-all"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Detay Modalı */}
      <Dialog open={!!selectedApp} onOpenChange={() => setSelectedApp(null)}>
        <DialogContent className="max-w-3xl bg-[#0f172a] border-white/10 text-white max-h-[90vh] overflow-y-auto">
          {selectedApp && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold flex items-center gap-3">
                  <img src={selectedApp.image} className="w-12 h-12 rounded-xl object-cover" alt="" />
                  {selectedApp.title}
                </DialogTitle>
              </DialogHeader>

              <div className="mt-4 space-y-6">
                <div className="aspect-video rounded-xl overflow-hidden bg-white/5">
                   <img src={selectedApp.image} className="w-full h-full object-contain" alt="Preview" />
                </div>

                <div className="prose prose-invert max-w-none">
                  <h4 className="text-white/50 text-sm uppercase">Açıklama</h4>
                  <p className="text-white/80 leading-relaxed whitespace-pre-wrap">
                    {selectedApp.description}
                  </p>
                </div>

                <div className="flex gap-3">
                  <a
                    href={selectedApp.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 px-6 py-3 rounded-xl bg-blue-600 text-white font-semibold text-center hover:bg-blue-700 transition-all flex items-center justify-center gap-2"
                  >
                    <ExternalLink className="w-5 h-5" />
                    Uygulamaya Git
                  </a>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}