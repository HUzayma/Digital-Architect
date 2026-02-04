import React, { useState } from 'react';
import { db } from '../firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';

const AdminPanel = () => {
  const [appName, setAppName] = useState('');
  const [description, setDescription] = useState('');

  const handleAddApp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!appName) return alert("Lütfen isim girin");
    try {
      await addDoc(collection(db, "apps"), { 
        name: appName,
        description: description 
      });
      setAppName('');
      setDescription('');
      alert("Başarıyla eklendi!");
    } catch (error) {
      alert("Bir hata oluştu.");
    }
  };

  return (
    <div className="p-10 bg-slate-100 text-black min-h-screen">
      <h1 className="text-3xl font-bold mb-8">Admin Paneli</h1>
      <form onSubmit={handleAddApp} className="max-w-md bg-white p-6 rounded shadow">
        <div className="mb-4">
          <label className="block mb-2">Uygulama Adı</label>
          <input 
            type="text" 
            value={appName} 
            onChange={(e) => setAppName(e.target.value)}
            className="border w-full p-2 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Açıklama</label>
          <textarea 
            value={description} 
            onChange={(e) => setDescription(e.target.value)}
            className="border w-full p-2 rounded"
          />
        </div>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Uygulama Ekle
        </button>
      </form>
    </div>
  );
};

export default AdminPanel;