import React, { useState, useEffect } from 'react';
import { db, auth } from '../firebaseConfig';
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';

interface AppData {
  id: string;
  name: string;
  description: string;
}

const AdminPanel = () => {
  const [user, setUser] = useState<any>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [apps, setApps] = useState<AppData[]>([]);
  const [appName, setAppName] = useState('');
  const [description, setDescription] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) fetchApps();
    });
    return () => unsubscribe();
  }, []);

  const fetchApps = async () => {
    const querySnapshot = await getDocs(collection(db, "apps"));
    const appsList = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as AppData[];
    setApps(appsList);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      alert("Giriş başarısız!");
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
  };

  const handleAddApp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!appName) return alert("Lütfen isim girin");
    try {
      if (editingId) {
        await updateDoc(doc(db, "apps", editingId), { name: appName, description });
        setEditingId(null);
      } else {
        await addDoc(collection(db, "apps"), { name: appName, description });
      }
      setAppName('');
      setDescription('');
      fetchApps();
    } catch (error) {
      alert("Bir hata oluştu.");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Silmek istediğinize emin misiniz?")) return;
    await deleteDoc(doc(db, "apps", id));
    fetchApps();
  };

  const handleEdit = (app: AppData) => {
    setAppName(app.name);
    setDescription(app.description);
    setEditingId(app.id);
  };

  if (!user) {
    return (
      <div className="p-10 bg-slate-900 text-white min-h-screen flex items-center justify-center">
        <form onSubmit={handleLogin} className="bg-slate-800 p-8 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6 text-center">Admin Girişi</h2>
          <div className="mb-4">
            <label className="block mb-2 text-sm">Email</label>
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 rounded bg-slate-700 border border-slate-600 text-white"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block mb-2 text-sm">Şifre</label>
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 rounded bg-slate-700 border border-slate-600 text-white"
              required
            />
          </div>
          <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded font-semibold">
            Giriş Yap
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="p-10 bg-slate-100 text-black min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Admin Paneli</h1>
        <button onClick={handleLogout} className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">
          Çıkış Yap
        </button>
      </div>
      
      <form onSubmit={handleAddApp} className="max-w-md bg-white p-6 rounded shadow mb-8">
        <h2 className="text-xl font-semibold mb-4">{editingId ? 'Düzenle' : 'Yeni Uygulama'}</h2>
        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium">Uygulama Adı</label>
          <input 
            type="text" 
            value={appName} 
            onChange={(e) => setAppName(e.target.value)}
            className="border w-full p-2 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium">Açıklama</label>
          <textarea 
            value={description} 
            onChange={(e) => setDescription(e.target.value)}
            className="border w-full p-2 rounded h-24"
          />
        </div>
        <div className="flex gap-2">
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            {editingId ? 'Güncelle' : 'Ekle'}
          </button>
          {editingId && (
            <button type="button" onClick={() => {setEditingId(null); setAppName(''); setDescription('');}} className="bg-gray-500 text-white px-4 py-2 rounded">
              İptal
            </button>
          )}
        </div>
      </form>

      <div className="bg-white rounded shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-200">
            <tr>
              <th className="p-4 text-left">Uygulama</th>
              <th className="p-4 text-left">Açıklama</th>
              <th className="p-4 text-right">İşlemler</th>
            </tr>
          </thead>
          <tbody>
            {apps.map((app) => (
              <tr key={app.id} className="border-t">
                <td className="p-4">{app.name}</td>
                <td className="p-4">{app.description}</td>
                <td className="p-4 text-right">
                  <button onClick={() => handleEdit(app)} className="text-blue-600 hover:text-blue-800 mr-4">Düzenle</button>
                  <button onClick={() => handleDelete(app.id)} className="text-red-600 hover:text-red-800">Sil</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {apps.length === 0 && <p className="p-8 text-center text-gray-500">Henüz uygulama yok.</p>}
      </div>
    </div>
  );
};

export default AdminPanel;