    // src/firebase.ts

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDRgxN92G5rD58_ptPDZpXEgzufcjwnHnE",
  authDomain: "tensorgo1.firebaseapp.com",
  projectId: "tensorgo1",
  storageBucket: "tensorgo1.appspot.com",
  messagingSenderId: "192361764238",
  appId: "1:192361764238:web:e1c70c958131c0ce67c0df",
  measurementId: "G-GHTLTCC5V5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();
export { auth, db };
