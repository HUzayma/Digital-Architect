import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ExternalLink, 
  Star, 
  Download, 
  Smartphone,
  Gamepad2,
  Wrench,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

const apps = [
  {
    id: 1,
    name: 'Pixel Paint',
    category: 'Yaratıcılık',
    icon: Palette,
    description: 'Basit ve sezgisel bir piksel art çizim uygulaması. Yaratıcılığınızı konuşturun!',
    fullDescription: `Pixel Paint, piksel art çizmek için tasarlanmış modern ve kullanıcı dostu bir uygulamadır. 
    
Özellikler:
• Çok katmanlı çizim desteği
• Özelleştirilebilir renk paleti
• İçe/dışa aktar (PNG, JPG)
• Dokunmatik ve kalem desteği
• Sınırsız geri alma/yineleme
• Grid ve ızgara yardımcıları`,
    rating: 4.7,
    downloads: '500+',
    status: 'Beta Test',
    color: 'from-pink-500 to-rose-500',
    screenshots: 4,
    playStoreUrl: '#',
  },
  {
    id: 2,
    name: 'Word Rush',
    category: 'Oyun',
    icon: Gamepad2,
    description: 'Zamana karşı yarışarak kelimeleri bulun! Eğlenceli ve bağımlılık yapıcı kelime oyunu.',
    fullDescription: `Word Rush, kelime bilginizi test eden hızlı tempolu bir kelime oyunudur.

Özellikler:
• 1000+ seviye
• Günlük görevler ve ödüller
• Liderlik tablosu
• Başarım sistemi
• Çevrimdışı oynama
• İngilizce ve Türkçe desteği`,
    rating: 4.5,
    downloads: '300+',
    status: 'Beta Test',
    color: 'from-blue-500 to-cyan-500',
    screenshots: 4,
    playStoreUrl: '#',
  },
  {
    id: 3,
    name: 'Task Master',
    category: 'Üretkenlik',
    icon: Wrench,
    description: 'Görevlerinizi organize edin, verimliliğinizi artırın. Minimalist yapılacaklar listesi.',
    fullDescription: `Task Master, günlük görevlerinizi yönetmek için tasarlanmış güçlü bir üretkenlik uygulamasıdır.

Özellikler:
• Kategori bazlı görev yönetimi
• Hatırlatıcı ve bildirimler
• İlerleme takibi
• Widget desteği
• Bulut senkronizasyonu
• Özelleştirilebilir temalar`,
    rating: 4.8,
    downloads: '200+',
    status: 'Beta Test',
    color: 'from-green-500 to-emerald-500',
    screenshots: 4,
    playStoreUrl: '#',
  },
];

import { Palette } from 'lucide-react';

export default function Apps() {
  const [selectedApp, setSelectedApp] = useState<typeof apps[0] | null>(null);
  const [currentScreenshot, setCurrentScreenshot] = useState(0);

  const nextScreenshot = () => {
    if (selectedApp) {
      setCurrentScreenshot((prev) => (prev + 1) % selectedApp.screenshots);
    }
  };

  const prevScreenshot = () => {
    if (selectedApp) {
      setCurrentScreenshot((prev) => (prev - 1 + selectedApp.screenshots) % selectedApp.screenshots);
    }
  };

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
            Kullanıcıların günlük hayatlarına değer katan, özenle geliştirilmiş 
            Android uygulamalarımı keşfedin.
          </p>
        </motion.div>

        {/* Apps grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {apps.map((app, index) => (
            <motion.div
              key={app.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <div className="glass rounded-2xl overflow-hidden card-hover h-full flex flex-col">
                {/* App icon area */}
                <div className={`h-48 bg-gradient-to-br ${app.color} relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-black/20" />
                  <motion.div
                    className="absolute inset-0 flex items-center justify-center"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="w-24 h-24 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                      <app.icon className="w-12 h-12 text-white" />
                    </div>
                  </motion.div>
                  
                  {/* Status badge */}
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 rounded-full bg-black/30 backdrop-blur-sm text-white text-xs">
                      {app.status}
                    </span>
                  </div>
                </div>

                {/* App info */}
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-xl font-bold text-white mb-1">{app.name}</h3>
                      <span className="text-sm text-white/50">{app.category}</span>
                    </div>
                  </div>

                  <p className="text-white/60 text-sm mb-4 flex-1">
                    {app.description}
                  </p>

                  {/* Stats */}
                  <div className="flex items-center gap-4 mb-4 text-sm">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                      <span className="text-white/70">{app.rating}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Download className="w-4 h-4 text-white/50" />
                      <span className="text-white/70">{app.downloads}</span>
                    </div>
                  </div>

                  {/* Buttons */}
                  <div className="flex gap-3">
                    <motion.button
                      onClick={() => {
                        setSelectedApp(app);
                        setCurrentScreenshot(0);
                      }}
                      className="flex-1 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-sm font-medium transition-all"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Detaylar
                    </motion.button>
                    <motion.a
                      href={app.playStoreUrl}
                      className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:opacity-90 transition-all"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <ExternalLink className="w-4 h-4" />
                    </motion.a>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Coming soon */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-16 text-center"
        >
          <div className="glass rounded-2xl p-8 inline-block">
            <div className="flex items-center justify-center gap-3 mb-3">
              <Smartphone className="w-6 h-6 text-purple-400" />
              <span className="text-white font-semibold">Yakında</span>
            </div>
            <p className="text-white/60">
              Yeni uygulamalar üzerinde çalışıyorum. Takipte kalın!
            </p>
          </div>
        </motion.div>
      </div>

      {/* App Detail Modal */}
      <Dialog open={!!selectedApp} onOpenChange={() => setSelectedApp(null)}>
        <DialogContent className="max-w-3xl bg-[#0f172a] border-white/10 text-white max-h-[90vh] overflow-y-auto">
          {selectedApp && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${selectedApp.color} flex items-center justify-center`}>
                    <selectedApp.icon className="w-6 h-6 text-white" />
                  </div>
                  {selectedApp.name}
                </DialogTitle>
              </DialogHeader>

              <div className="mt-4">
                {/* Screenshot carousel */}
                <div className="relative mb-6">
                  <div className="aspect-video bg-white/5 rounded-xl overflow-hidden">
                    <div className={`w-full h-full bg-gradient-to-br ${selectedApp.color} opacity-30 flex items-center justify-center`}>
                      <div className="text-center">
                        <selectedApp.icon className="w-16 h-16 text-white/50 mx-auto mb-2" />
                        <span className="text-white/50">Ekran Görüntüsü {currentScreenshot + 1}</span>
                      </div>
                    </div>
                  </div>
                  
                  {selectedApp.screenshots > 1 && (
                    <>
                      <button
                        onClick={prevScreenshot}
                        className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition-all"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>
                      <button
                        onClick={nextScreenshot}
                        className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition-all"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </>
                  )}

                  {/* Dots */}
                  <div className="flex justify-center gap-2 mt-3">
                    {Array.from({ length: selectedApp.screenshots }).map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setCurrentScreenshot(i)}
                        className={`w-2 h-2 rounded-full transition-all ${
                          i === currentScreenshot ? 'bg-purple-500 w-6' : 'bg-white/30'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {/* Stats */}
                <div className="flex gap-6 mb-6">
                  <div className="flex items-center gap-2">
                    <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                    <span className="text-white font-semibold">{selectedApp.rating}</span>
                    <span className="text-white/50">Puan</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Download className="w-5 h-5 text-white/50" />
                    <span className="text-white font-semibold">{selectedApp.downloads}</span>
                    <span className="text-white/50">İndirme</span>
                  </div>
                </div>

                {/* Description */}
                <div className="prose prose-invert max-w-none">
                  <pre className="whitespace-pre-wrap text-white/70 font-sans text-sm leading-relaxed">
                    {selectedApp.fullDescription}
                  </pre>
                </div>

                {/* CTA */}
                <div className="mt-6 flex gap-3">
                  <motion.a
                    href={selectedApp.playStoreUrl}
                    className="flex-1 px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold text-center hover:opacity-90 transition-all flex items-center justify-center gap-2"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <ExternalLink className="w-5 h-5" />
                    Play Store'da Gör
                  </motion.a>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
