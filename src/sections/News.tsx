import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Calendar, 
  Clock, 
  ArrowRight, 
  Tag,
  TrendingUp,
  Sparkles,
  Code,
  Trophy
} from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

const newsItems = [
  {
    id: 1,
    title: 'Pixel Paint Beta Sürümü Yayında!',
    excerpt: 'Uzun süredir üzerinde çalıştığım piksel art uygulamam Pixel Paint\'in beta sürümü Play Store\'da yayınlandı.',
    content: `Pixel Paint'in beta sürümü sonunda Play Store'da yayında! 🎉

Bu sürümde neler var:
• Temel çizim araçları (kalem, silgi, doldur)
• Çok katmanlı çizim desteği
• Özelleştirilebilir renk paleti
• PNG ve JPG formatlarında dışa aktar
• Dokunmatik ve kalem desteği

Geri bildirimlerinizi bekliyorum. Uygulamayı indirip deneyin ve düşüncelerinizi paylaşın!

Gelecek güncellemelerde:
• Animasyon desteği
• Daha fazla fırça seçeneği
• Topluluk galerisi
• Eğitim modu`,
    date: '2024-01-15',
    readTime: '3 dk',
    category: 'Yeni Sürüm',
    icon: Sparkles,
    color: 'from-pink-500 to-rose-500',
  },
  {
    id: 2,
    title: 'Word Rush 1000+ Seviye Güncellemesi',
    excerpt: 'Word Rush artık 1000\'den fazla seviye ile çok daha eğlenceli!',
    content: `Word Rush'e büyük bir güncelleme daha! Artık 1000+ seviye mevcut.

Yeni özellikler:
• 500 yeni seviye eklendi
• Günlük görevler sistemi
• Yeni başarımlar
• İyileştirilmiş liderlik tablosu
• Performans optimizasyonları

Oyuncularımızdan gelen geri bildirimler doğrultusunda oyunu sürekli geliştiriyoruz. Yeni seviyelerde daha zorlu bulmacalar ve özel ödüller sizi bekliyor!`,
    date: '2024-01-10',
    readTime: '2 dk',
    category: 'Güncelleme',
    icon: Trophy,
    color: 'from-blue-500 to-cyan-500',
  },
  {
    id: 3,
    title: 'Jetpack Compose ile UI Geliştirme İpuçları',
    excerpt: 'Modern Android UI geliştirmede edindiğim deneyimleri ve en iyi pratikleri paylaşıyorum.',
    content: `Jetpack Compose kullanarak UI geliştirirken edindiğim bazı ipuçları:

1. State Yönetimi
   • remember ve mutableStateOf kullanımı
   • ViewModel ile state hoisting
   • Derived state kullanımı

2. Performans Optimizasyonu
   • LazyColumn/Row kullanımı
   • key parametresi önemi
   • remember ve derivedStateOf

3. Animasyonlar
   • animate*AsState kullanımı
   • AnimatedVisibility
   • Crossfade geçişleri

4. Custom Composable'lar
   • Modüler UI tasarımı
   • Preview kullanımı
   • Parametre yapılandırması

Bu konularda daha detaylı yazılar yazmayı planlıyorum. Takipte kalın!`,
    date: '2024-01-05',
    readTime: '5 dk',
    category: 'Teknik',
    icon: Code,
    color: 'from-purple-500 to-violet-500',
  },
  {
    id: 4,
    title: '2024 Yılı Hedeflerim',
    excerpt: 'Yeni yılda uygulamalarım ve kendim için belirlediğim hedefleri paylaşıyorum.',
    content: `2024 yılı için belirlediğim bazı hedefler:

Uygulama Geliştirme:
• 3 yeni uygulama yayınlamak
• Mevcut uygulamaları 1M+ indirmeye ulaştırmak
• Tüm uygulamalara premium özellikler eklemek

Teknik Gelişim:
• Kotlin Multiplatform öğrenmek
• Flutter deneyimi kazanmak
• CI/CD süreçlerini otomatikleştirmek

Topluluk:
• Medium'da düzenli yazılar yazmak
• YouTube kanalı açmak
• Açık kaynak projelere katkıda bulunmak

Bu hedeflere ulaşmak için çalışmaya devam! 💪`,
    date: '2024-01-01',
    readTime: '4 dk',
    category: 'Genel',
    icon: TrendingUp,
    color: 'from-green-500 to-emerald-500',
  },
];

const categories = ['Tümü', 'Yeni Sürüm', 'Güncelleme', 'Teknik', 'Genel'];

export default function News() {
  const [selectedCategory, setSelectedCategory] = useState('Tümü');
  const [selectedNews, setSelectedNews] = useState<typeof newsItems[0] | null>(null);

  const filteredNews = selectedCategory === 'Tümü'
    ? newsItems
    : newsItems.filter(item => item.category === selectedCategory);

  return (
    <section id="news" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-cyan-600/10 border border-cyan-500/20 text-cyan-400 text-sm mb-4">
            Haberler & Blog
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Son Güncellemeler
          </h2>
          <p className="text-lg text-white/60 max-w-3xl mx-auto">
            Uygulamalarımdaki son gelişmeler, teknik yazılarım ve duyurular.
          </p>
        </motion.div>

        {/* Category filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-wrap justify-center gap-2 mb-12"
        >
          {categories.map((category) => (
            <motion.button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                selectedCategory === category
                  ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white'
                  : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>

        {/* News grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {filteredNews.map((item, index) => (
            <motion.article
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass rounded-2xl overflow-hidden card-hover group cursor-pointer"
              onClick={() => setSelectedNews(item)}
            >
              <div className="p-6">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center`}>
                    <item.icon className="w-6 h-6 text-white" />
                  </div>
                  <span className="px-3 py-1 rounded-full bg-white/5 text-white/60 text-xs">
                    {item.category}
                  </span>
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-400 transition-colors">
                  {item.title}
                </h3>
                <p className="text-white/60 text-sm mb-4 line-clamp-2">
                  {item.excerpt}
                </p>

                {/* Footer */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-sm text-white/50">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {item.date}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {item.readTime}
                    </div>
                  </div>
                  <motion.div
                    className="flex items-center gap-1 text-purple-400 text-sm font-medium"
                    whileHover={{ x: 5 }}
                  >
                    Devamını Oku
                    <ArrowRight className="w-4 h-4" />
                  </motion.div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Empty state */}
        {filteredNews.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-white/50">Bu kategoride henüz haber yok.</p>
          </motion.div>
        )}

        {/* Subscribe CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-16 glass rounded-2xl p-8 text-center"
        >
          <h3 className="text-2xl font-bold text-white mb-3">
            Güncellemelerden Haberdar Ol
          </h3>
          <p className="text-white/60 mb-6 max-w-lg mx-auto">
            Yeni uygulamalarım ve güncellemelerim hakkında ilk sen haberdar olmak için 
            bültenime abone ol.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="E-posta adresin"
              className="flex-1 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/50 focus:outline-none focus:border-purple-500"
            />
            <motion.button
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold hover:opacity-90 transition-all"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Abone Ol
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* News Detail Modal */}
      <Dialog open={!!selectedNews} onOpenChange={() => setSelectedNews(null)}>
        <DialogContent className="max-w-2xl bg-[#0f172a] border-white/10 text-white max-h-[90vh] overflow-y-auto">
          {selectedNews && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${selectedNews.color} flex items-center justify-center`}>
                    <selectedNews.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <span className="text-sm text-white/50">{selectedNews.category}</span>
                    <DialogTitle className="text-xl font-bold text-white mt-1">
                      {selectedNews.title}
                    </DialogTitle>
                  </div>
                </div>
              </DialogHeader>

              <div className="mt-4">
                {/* Meta */}
                <div className="flex items-center gap-4 text-sm text-white/50 mb-6">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {selectedNews.date}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {selectedNews.readTime} okuma
                  </div>
                </div>

                {/* Content */}
                <div className="prose prose-invert max-w-none">
                  <pre className="whitespace-pre-wrap text-white/70 font-sans text-sm leading-relaxed">
                    {selectedNews.content}
                  </pre>
                </div>

                {/* Tags */}
                <div className="mt-6 flex items-center gap-2">
                  <Tag className="w-4 h-4 text-white/50" />
                  <div className="flex gap-2">
                    <span className="px-3 py-1 rounded-full bg-white/5 text-white/60 text-xs">
                      {selectedNews.category}
                    </span>
                    <span className="px-3 py-1 rounded-full bg-white/5 text-white/60 text-xs">
                      Android
                    </span>
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
