import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { db } from '../firebaseConfig'; 
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import {
  LayoutDashboard,
  Image,
  Newspaper,
  Smartphone,
  LogOut,
  Plus,
  Edit,
  Trash2,
  Save,
  X
} from 'lucide-react';

export default function AdminPanel({ onLogout }: { onLogout: () => void }) {
  const [apps, setApps] = useState<any[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentApp, setCurrentApp] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Verileri Firebase'den Çekme
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

  useEffect(() => {
    fetchApps();
  }, []);

  // Yeni Veri Ekleme veya Güncelleme
  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const appData = {
      title: formData.get('title'),
      description: formData.get('description'),
      category: formData.get('category'),
      image: formData.get('image'),
      link: formData.get('link'),
    };

    if (currentApp?.id) {
      // Güncelleme
      await updateDoc(doc(db, "applications", currentApp.id), appData);
    } else {
      // Yeni Ekleme
      await addDoc(collection(db, "applications"), appData);
    }

    setIsEditing(false);
    setCurrentApp(null);
    fetchApps();
  };

  // Veri Silme
  const handleDelete = async (id: string) => {
    if (window.confirm('Bu veriyi silmek istediğinize emin misiniz?')) {
      await deleteDoc(doc(db, "applications", id));
      fetchApps();
    }
  };

  if (loading) return <div className="p-8 text-center">Yükleniyor...</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-3">
            <LayoutDashboard className="w-8 h-8 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-800">Admin Paneli</h1>
          </div>
          <div className="flex gap-4">
            <button
              onClick={() => { setCurrentApp(null); setIsEditing(true); }}
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              <Plus className="w-5 h-5" /> Yeni Ekle
            </button>
            <button
              onClick={onLogout}
              className="flex items-center gap-2 bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition"
            >
              <LogOut className="w-5 h-5" /> Çıkış
            </button>
          </div>
        </div>

        {/* Tablo */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-4">Görsel</th>
                <th className="p-4">Başlık</th>
                <th className="p-4">Kategori</th>
                <th className="p-4 text-right">İşlemler</th>
              </tr>
            </thead>
            <tbody>
              {apps.map((app) => (
                <tr key={app.id} className="border-t">
                  <td className="p-4">
                    <img src={app.image} alt="" className="w-12 h-12 object-cover rounded" />
                  </td>
                  <td className="p-4 font-medium">{app.title}</td>
                  <td className="p-4 text-gray-600">{app.category}</td>
                  <td className="p-4 text-right flex justify-end gap-2">
                    <button 
                      onClick={() => { setCurrentApp(app); setIsEditing(true); }}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded"
                    >
                      <Edit className="w-5 h-5" />
                    </button>
                    <button 
                      onClick={() => handleDelete(app.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Ekleme/Düzenleme Modal */}
        {isEditing && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-2xl p-6 w-full max-w-md shadow-xl"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">{currentApp ? 'Düzenle' : 'Yeni Ekle'}</h2>
                <button onClick={() => setIsEditing(false)}><X /></button>
              </div>
              <form onSubmit={handleSave} className="space-y-4">
                <input name="title" defaultValue={currentApp?.title} placeholder="Başlık" className="w-full p-2 border rounded" required />
                <input name="category" defaultValue={currentApp?.category} placeholder="Kategori (Haber/Uygulama)" className="w-full p-2 border rounded" required />
                <input name="image" defaultValue={currentApp?.image} placeholder="Görsel URL" className="w-full p-2 border rounded" required />
                <input name="link" defaultValue={currentApp?.link} placeholder="Yönlendirme Linki" className="w-full p-2 border rounded" required />
                <textarea name="description" defaultValue={currentApp?.description} placeholder="Açıklama" className="w-full p-2 border rounded" rows={3} required />
                <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700">
                  <Save className="w-5 h-5 inline-block mr-2" /> Kaydet
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}