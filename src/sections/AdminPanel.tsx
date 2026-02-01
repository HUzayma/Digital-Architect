import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, 
  Image, 
  Newspaper, 
  Smartphone, 
  LogOut, 
  Plus,
  Edit,
  Trash2,
  Eye,
  Save,
  X,
  Upload
} from 'lucide-react';
import { toast } from 'sonner';

interface AdminPanelProps {
  onLogout: () => void;
}

type TabType = 'dashboard' | 'apps' | 'gallery' | 'news';

export default function AdminPanel({ onLogout }: AdminPanelProps) {
  const [activeTab, setActiveTab] = useState<TabType>('dashboard');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);

  const tabs = [
    { id: 'dashboard' as TabType, label: 'Dashboard', icon: LayoutDashboard },
    { id: 'apps' as TabType, label: 'Uygulamalar', icon: Smartphone },
    { id: 'gallery' as TabType, label: 'Galeri', icon: Image },
    { id: 'news' as TabType, label: 'Haberler', icon: Newspaper },
  ];

  const handleSave = () => {
    toast.success('Değişiklikler kaydedildi!');
    setShowAddModal(false);
    setEditingItem(null);
  };



  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardContent />;
      case 'apps':
        return (
          <AppsContent 
            onAdd={() => setShowAddModal(true)} 
            onEdit={(item) => setEditingItem(item)}
          />
        );
      case 'gallery':
        return (
          <GalleryContent 
            onAdd={() => setShowAddModal(true)} 
            onEdit={(item) => setEditingItem(item)}
          />
        );
      case 'news':
        return (
          <NewsContent 
            onAdd={() => setShowAddModal(true)} 
            onEdit={(item) => setEditingItem(item)}
          />
        );
      default:
        return <DashboardContent />;
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0f1c] flex">
      {/* Sidebar */}
      <aside className="w-64 admin-sidebar border-r border-white/10 fixed h-full">
        <div className="p-6">
          <div className="flex items-center gap-2 mb-8">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center">
              <LayoutDashboard className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold gradient-text">Admin</span>
          </div>

          <nav className="space-y-2">
            {tabs.map((tab) => (
              <motion.button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  activeTab === tab.id
                    ? 'nav-active text-white'
                    : 'text-white/60 hover:bg-white/5 hover:text-white'
                }`}
                whileHover={{ x: 5 }}
                whileTap={{ scale: 0.98 }}
              >
                <tab.icon className="w-5 h-5" />
                {tab.label}
              </motion.button>
            ))}
          </nav>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-6">
          <motion.button
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 transition-all"
            whileHover={{ x: 5 }}
            whileTap={{ scale: 0.98 }}
          >
            <LogOut className="w-5 h-5" />
            Çıkış Yap
          </motion.button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 ml-64 p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {renderContent()}
        </motion.div>
      </main>

      {/* Add/Edit Modal */}
      {(showAddModal || editingItem) && (
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
            className="glass rounded-2xl p-6 max-w-lg w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-white">
                {editingItem ? 'Düzenle' : 'Yeni Ekle'}
              </h3>
              <button
                onClick={() => {
                  setShowAddModal(false);
                  setEditingItem(null);
                }}
                className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-white/60 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm text-white/70 mb-2">Başlık</label>
                <input
                  type="text"
                  placeholder="Başlık girin"
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30"
                />
              </div>

              <div>
                <label className="block text-sm text-white/70 mb-2">Açıklama</label>
                <textarea
                  rows={3}
                  placeholder="Açıklama girin"
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 resize-none"
                />
              </div>

              {activeTab === 'gallery' && (
                <div>
                  <label className="block text-sm text-white/70 mb-2">Görsel</label>
                  <div className="border-2 border-dashed border-white/20 rounded-xl p-8 text-center">
                    <Upload className="w-8 h-8 text-white/40 mx-auto mb-2" />
                    <p className="text-white/60 text-sm">Görsel yüklemek için tıklayın</p>
                  </div>
                </div>
              )}

              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => {
                    setShowAddModal(false);
                    setEditingItem(null);
                  }}
                  className="flex-1 px-4 py-3 rounded-xl bg-white/5 text-white hover:bg-white/10 transition-all"
                >
                  İptal
                </button>
                <button
                  onClick={handleSave}
                  className="flex-1 px-4 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium flex items-center justify-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  Kaydet
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}

// Dashboard Content
function DashboardContent() {
  const stats = [
    { label: 'Toplam Uygulama', value: '3', icon: Smartphone, color: 'from-purple-600 to-pink-600' },
    { label: 'Toplam İndirme', value: '1,000+', icon: Eye, color: 'from-blue-600 to-cyan-600' },
    { label: 'Galeri Öğesi', value: '9', icon: Image, color: 'from-green-600 to-emerald-600' },
    { label: 'Haber/Blog', value: '4', icon: Newspaper, color: 'from-orange-600 to-amber-600' },
  ];

  return (
    <div>
      <h2 className="text-3xl font-bold text-white mb-8">Dashboard</h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="glass rounded-2xl p-6"
          >
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-4`}>
              <stat.icon className="w-6 h-6 text-white" />
            </div>
            <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
            <div className="text-white/60 text-sm">{stat.label}</div>
          </motion.div>
        ))}
      </div>

      <div className="glass rounded-2xl p-6">
        <h3 className="text-xl font-bold text-white mb-4">Son Aktiviteler</h3>
        <div className="space-y-4">
          {[
            { action: 'Pixel Paint güncellendi', time: '2 saat önce', type: 'update' },
            { action: 'Yeni haber eklendi', time: '5 saat önce', type: 'add' },
            { action: 'Galeri öğesi silindi', time: '1 gün önce', type: 'delete' },
            { action: 'Word Rush beta yayınlandı', time: '2 gün önce', type: 'publish' },
          ].map((activity, index) => (
            <div key={index} className="flex items-center gap-4 p-4 rounded-xl bg-white/5">
              <div className={`w-2 h-2 rounded-full ${
                activity.type === 'update' ? 'bg-blue-500' :
                activity.type === 'add' ? 'bg-green-500' :
                activity.type === 'delete' ? 'bg-red-500' : 'bg-purple-500'
              }`} />
              <div className="flex-1">
                <p className="text-white">{activity.action}</p>
                <p className="text-white/50 text-sm">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Apps Content
function AppsContent({ onAdd, onEdit }: { onAdd: () => void; onEdit: (item: any) => void }) {
  const apps = [
    { id: 1, name: 'Pixel Paint', status: 'Beta', downloads: '500+' },
    { id: 2, name: 'Word Rush', status: 'Beta', downloads: '300+' },
    { id: 3, name: 'Task Master', status: 'Beta', downloads: '200+' },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold text-white">Uygulamalar</h2>
        <motion.button
          onClick={onAdd}
          className="px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 text-white flex items-center gap-2"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Plus className="w-5 h-5" />
          Yeni Uygulama
        </motion.button>
      </div>

      <div className="space-y-4">
        {apps.map((app) => (
          <motion.div
            key={app.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass rounded-2xl p-6 flex items-center justify-between"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center">
                <Smartphone className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-white font-semibold">{app.name}</h3>
                <div className="flex items-center gap-3 text-sm text-white/50">
                  <span>{app.status}</span>
                  <span>•</span>
                  <span>{app.downloads} indirme</span>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <motion.button
                onClick={() => onEdit(app)}
                className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Edit className="w-4 h-4" />
              </motion.button>
              <motion.button
                className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-red-400 hover:bg-red-500/10"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Trash2 className="w-4 h-4" />
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// Gallery Content
function GalleryContent({ onAdd, onEdit }: { onAdd: () => void; onEdit: (item: any) => void }) {
  const items = [
    { id: 1, title: 'Pixel Paint - Ana Ekran', category: 'UI Tasarım' },
    { id: 2, title: 'Word Rush - Oyun Ekranı', category: 'Oyun' },
    { id: 3, title: 'Task Master - Görev Listesi', category: 'UI Tasarım' },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold text-white">Galeri</h2>
        <motion.button
          onClick={onAdd}
          className="px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 text-white flex items-center gap-2"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Plus className="w-5 h-5" />
          Yeni Ekle
        </motion.button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((item) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass rounded-2xl p-4 group"
          >
            <div className="aspect-video bg-gradient-to-br from-purple-600/30 to-blue-600/30 rounded-xl mb-4 flex items-center justify-center">
              <Image className="w-8 h-8 text-white/30" />
            </div>
            <h3 className="text-white font-medium mb-1">{item.title}</h3>
            <p className="text-white/50 text-sm mb-4">{item.category}</p>
            <div className="flex gap-2">
              <motion.button
                onClick={() => onEdit(item)}
                className="flex-1 py-2 rounded-lg bg-white/5 text-white/60 hover:text-white hover:bg-white/10 text-sm"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Düzenle
              </motion.button>
              <motion.button
                className="px-3 py-2 rounded-lg bg-white/5 text-red-400 hover:bg-red-500/10"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Trash2 className="w-4 h-4" />
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// News Content
function NewsContent({ onAdd, onEdit }: { onAdd: () => void; onEdit: (item: any) => void }) {
  const news = [
    { id: 1, title: 'Pixel Paint Beta Sürümü Yayında!', date: '2024-01-15', views: 245 },
    { id: 2, title: 'Word Rush 1000+ Seviye Güncellemesi', date: '2024-01-10', views: 189 },
    { id: 3, title: 'Jetpack Compose İpuçları', date: '2024-01-05', views: 312 },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold text-white">Haberler</h2>
        <motion.button
          onClick={onAdd}
          className="px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 text-white flex items-center gap-2"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Plus className="w-5 h-5" />
          Yeni Haber
        </motion.button>
      </div>

      <div className="space-y-4">
        {news.map((item) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass rounded-2xl p-6 flex items-center justify-between"
          >
            <div>
              <h3 className="text-white font-semibold mb-1">{item.title}</h3>
              <div className="flex items-center gap-3 text-sm text-white/50">
                <span>{item.date}</span>
                <span>•</span>
                <span>{item.views} görüntülenme</span>
              </div>
            </div>
            <div className="flex gap-2">
              <motion.button
                onClick={() => onEdit(item)}
                className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Edit className="w-4 h-4" />
              </motion.button>
              <motion.button
                className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-red-400 hover:bg-red-500/10"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Trash2 className="w-4 h-4" />
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
