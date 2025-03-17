// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB-aY5390kZJJFa2gcGvWoFlY9he0yGFkg",
  authDomain: "fureverstore-1ee65.firebaseapp.com",
  projectId: "fureverstore-1ee65",
  storageBucket: "fureverstore-1ee65.firebasestorage.app",
  messagingSenderId: "871641876678",
  appId: "1:871641876678:web:8205e52f5373daf9efefc7",
  measurementId: "G-YCZX0MCGKE",
};

//need firebase with storage

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const storage = getStorage(app);
