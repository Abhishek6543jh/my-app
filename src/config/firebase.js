
import { initializeApp } from "firebase/app";
import { getAuth,GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyCoRTBKFexe9oc1F77KuY_dH9xnM1kS9FE",
  authDomain: "bookexchange-7e8ea.firebaseapp.com",
  projectId: "bookexchange-7e8ea",
  storageBucket: "bookexchange-7e8ea.appspot.com",
  messagingSenderId: "997573455704",
  appId: "1:997573455704:web:0746dcd068175ab0b4ff2d",
  measurementId: "G-5P72MMFS83"
};

// Initialize Firebaseimport { useState, useEffect } from "react";

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const storage = getStorage(app); 
export const db = getFirestore(app);