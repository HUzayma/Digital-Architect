import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDq0eSs48U4gaXp0q3nawB6rmD62pZm3aM",
  authDomain: "web-sitem-backend.firebaseapp.com",
  projectId: "web-sitem-backend",
  storageBucket: "web-sitem-backend.firebasestorage.app",
  messagingSenderId: "527915804201",
  appId: "1:527915804201:web:a63b4ec2abfde178d55e38",
  measurementId: "G-Z10LYPLYQK"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);