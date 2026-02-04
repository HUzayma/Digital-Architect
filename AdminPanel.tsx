import React, { useState } from 'react';
import { db } from '../firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';

const AdminPanel = () => {
  const [appName, setAppName] = useState('');

  const handleAddApp = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "apps"), { name: appName });
      setAppName('');
      alert("Başarıyla eklendi!");
    } catch (e) {
      alert("Hata oluştu.");
    }
  };

  return (
    <div className="p-10 bg-white text-black min-h-screen">
      <h1 className="text-2xl font-bold mb-5">Admin Paneli</h1>
      <form onSubmit={handleAddApp}>
        <input 
          type="text" 
          value={appName} 
          onChange={(e) => setAppName(e.target.value)}
          placeholder="Uygulama Adı"
          className="border p-2 mr-2"
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">Ekle</button>
      </form>
    </div>
  );
};

export default AdminPanel;