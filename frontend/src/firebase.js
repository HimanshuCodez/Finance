// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"; // Import Firestore

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDpclrVo82G3jV7_CwZjz3_o9BE7PeQqrk",
  authDomain: "finance-8703f.firebaseapp.com",
  projectId: "finance-8703f",
  storageBucket: "finance-8703f.firebasestorage.app",
  messagingSenderId: "1000567762064",
  appId: "1:1000567762064:web:f1a8a5d7426da47254bc15",
  measurementId: "G-S713YDZ7WZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app); // Initialize Firestore and export it

export { app, analytics, db }; // Export db along with app and analytics