import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API,
  authDomain: "universal-medical-record.firebaseapp.com",
  projectId: "universal-medical-record",
  storageBucket: "universal-medical-record.appspot.com",
  messagingSenderId: "188442213702",
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: "G-PTRTCY3V7C",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();
export const db = getFirestore();
export const storage = getStorage();
