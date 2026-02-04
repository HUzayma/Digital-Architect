import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ZoomIn, ChevronLeft, ChevronRight, Image as ImageIcon } from 'lucide-react';

// Gallery items with different types
const galleryItems = [
  {
    id: 1,
    type: 'screenshot',
    title: 'Pixel Paint - Ana Ekran',
    description: 'Piksel art çizim uygulamasının ana arayüzü',
    category: 'UI Tasarım',
    color: 'from-pink-500 to-rose-500',
  },
  {
    id: 2,
    type: 'screenshot',
    title: 'Word Rush - Oyun Ekranı',
    description: 'Kelime oyunu oynanış ekranı',
    category: 'Oyun',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    id: 3,
    type: 'screenshot',
    title: 'Task Master - Görev Listesi',
    description: 'Yapılacaklar listesi görünümü',
    category: 'UI Tasarım',
    color: 'from-green-500 to-emerald-500',
  },
  {
    id: 4,
    type: 'design',
    title: 'Uygulama İkon Seti',
    description: 'Tüm uygulamalar için tasarlanan ikonlar',
    category: 'Tasarım',
    color: 'from-purple-500 to-violet-500',
  },
  {
    id: 5,
    type: 'code',
    title: 'Jetpack Compose Kodu',
    description: 'Modern UI geliştirme örneği',
    category: 'Kod',
    color: 'from-orange-500 to-amber-500',
  },
  {
    id: 6,
    type: 'screenshot',
    title: 'Pixel Paint - Renk Paleti',
    description: 'Özelleştirilebilir renk seçici',
    category: 'UI Tasarım',
    color: 'from-pink-500 to-rose-500',
  },
  {
    id: 7,
    type: 'design',
    title: 'Wireframe Çalışması',
    description: 'Uygulama wireframe tasarımı',
    category: 'Tasarım',
    color: 'from-indigo-500 to-blue-500',
  },
  {
    id: 8,
    type: 'code',
    title: 'MVVM Architecture',
    description: 'Uygulama mimarisi örneği',
    category: 'Kod',
    color: 'from-teal-500 to-cyan-500',
  },
  {
    id: 9,
    type: 'screenshot',
    title: 'Word Rush - Seviye Tamamlama',
    description: 'Başarım ekranı tasarımı',
    category: 'Oyun',
    color: 'from-blue-500 to-cyan-500',
  },
];

const categories = ['Tümü', 'UI Tasarım', 'Oyun', 'Tasarım', 'Kod'];

export default function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState('Tümü');
  const [selectedItem, setSelectedItem] = useState<typeof galleryItems[0] | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const filteredItems = selectedCategory === 'Tümü' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === selectedCategory);

  const openLightbox = (item: typeof galleryItems[0], index: number) => {
    setSelectedItem(item);
    setCurrentIndex(index);
  };

  const nextItem = () => {
    const newIndex = (currentIndex + 1) % filteredItems.length;
    setCurrentIndex(newIndex);
    setSelectedItem(filteredItems[newIndex]);
  };

  const prevItem = () => {
    const newIndex = (currentIndex - 1 + filteredItems.length) % filteredItems.length;
    setCurrentIndex(newIndex);
    setSelectedItem(filteredItems[newIndex]);
  };

  return (
    <section id="gallery" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-purple-600/10 border border-purple-500/20 text-purple-400 text-sm mb-4">
            Galeri
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Proje Galerisi
          </h2>
          <p className="text-lg text-white/60 max-w-3xl mx-auto">
            Uygulamalarımdan ekran görüntüleri, tasarım çalışmalarım ve kod örnekleri.
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

        {/* Gallery grid */}
        <motion.div 
          layout
          className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3 }}
                className={`group relative overflow-hidden rounded-2xl cursor-pointer ${
                  index === 0 || index === 3 ? 'md:col-span-2 md:row-span-2' : ''
                }`}
                onClick={() => openLightbox(item, index)}
              >
                <div className={`aspect-square bg-gradient-to-br ${item.color} relative overflow-hidden`}>
                  {/* Placeholder content */}
                  <div className="absolute inset-0 bg-black/20" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <ImageIcon className="w-12 h-12 text-white/30" />
                  </div>
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Content */}
                  <div className="absolute inset-0 p-4 md:p-6 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="text-xs text-white/60 mb-1">{item.category}</span>
                    <h3 className="text-white font-semibold text-sm md:text-lg mb-1">{item.title}</h3>
                    <p className="text-white/60 text-xs md:text-sm hidden md:block">{item.description}</p>
                  </div>

                  {/* Zoom icon */}
                  <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <ZoomIn className="w-4 h-4 text-white" />
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty state */}
        {filteredItems.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-white/50">Bu kategoride henüz içerik yok.</p>
          </motion.div>
        )}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center"
            onClick={() => setSelectedItem(null)}
          >
            {/* Close button */}
            <button
              onClick={() => setSelectedItem(null)}
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-all z-10"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Navigation */}
            {filteredItems.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    prevItem();
                  }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-all"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    nextItem();
                  }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-all"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}

            {/* Content */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="max-w-4xl w-full mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className={`aspect-video bg-gradient-to-br ${selectedItem.color} rounded-2xl overflow-hidden mb-4`}>
                <div className="w-full h-full flex items-center justify-center">
                  <ImageIcon className="w-24 h-24 text-white/30" />
                </div>
              </div>
              
              <div className="text-center">
                <span className="text-sm text-white/50">{selectedItem.category}</span>
                <h3 className="text-2xl font-bold text-white mt-1">{selectedItem.title}</h3>
                <p className="text-white/60 mt-2">{selectedItem.description}</p>
              </div>

              {/* Thumbnails */}
              <div className="flex justify-center gap-2 mt-6">
                {filteredItems.map((item, index) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setCurrentIndex(index);
                      setSelectedItem(item);
                    }}
                    className={`w-16 h-16 rounded-lg overflow-hidden transition-all ${
                      index === currentIndex ? 'ring-2 ring-purple-500' : 'opacity-50 hover:opacity-75'
                    }`}
                  >
                    <div className={`w-full h-full bg-gradient-to-br ${item.color}`} />
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Counter */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/50 text-sm">
              {currentIndex + 1} / {filteredItems.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
