// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyB8taDP9jaKzU3yCp_hv8uxurcFHJZ7RLQ",
  authDomain: "clone-7eb96.firebaseapp.com",
  projectId: "clone-7eb96",
  storageBucket: "clone-7eb96.appspot.com",
  messagingSenderId: "38643466040",
  appId: "1:38643466040:web:cb284199c819db43aa4bcd",
  measurementId: "G-ZZLLLQXNDY",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
// const analytics = getAnalytics(app);
