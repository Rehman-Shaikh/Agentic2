// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
 
// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "multiagentai-903ab.firebaseapp.com",
  projectId: "multiagentai-903ab",
  storageBucket: "multiagentai-903ab.firebasestorage.app",
  messagingSenderId: "92281975002",
  appId: "1:92281975002:web:1c804bb7217b90a393b5e3"
};
 
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
 
