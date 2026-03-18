import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDpclrVo82G3jV7_CwZjz3_o9BE7PeQqrk",
  authDomain: "finance-8703f.firebaseapp.com",
  projectId: "finance-8703f",
  storageBucket: "finance-8703f.firebasestorage.app",
  messagingSenderId: "1000567762064",
  appId: "1:1000567762064:web:f1a8a5d7426da47254bc15",
  measurementId: "G-S713YDZ7WZ"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { app, analytics, db, storage };