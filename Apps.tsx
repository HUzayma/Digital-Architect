import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../components/ui/dialog';

const Apps = () => {
  const [apps, setApps] = useState<any[]>([]);

  useEffect(() => {
    const fetchApps = async () => {
      const querySnapshot = await getDocs(collection(db, "apps"));
      const appsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setApps(appsData);
    };
    fetchApps();
  }, []);

  return (
    <section id="apps" className="py-20 bg-slate-900 text-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold mb-10 text-center">Uygulamalarımız</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {apps.map((app) => (
            <div key={app.id} className="bg-slate-800 p-6 rounded-lg">
              <h3 className="text-2xl font-semibold mb-2">{app.name}</h3>
              <p className="text-slate-400">{app.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Apps;