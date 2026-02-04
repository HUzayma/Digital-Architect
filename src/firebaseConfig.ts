// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDq0eSs48U4gaXp0q3nawB6rmD62pZm3aM",
  authDomain: "web-sitem-backend.firebaseapp.com",
  projectId: "web-sitem-backend",
  storageBucket: "web-sitem-backend.firebasestorage.app",
  messagingSenderId: "527915804201",
  appId: "1:527915804201:web:a63b4ec2abfde178d55e38",
  measurementId: "G-Z10LYPLYQK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);