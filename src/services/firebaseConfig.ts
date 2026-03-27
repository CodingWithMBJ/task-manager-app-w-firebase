import { initializeApp } from "firebase/app";
import { getAuth, type Auth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBEiK5s09sIeKqGpQiRRkbWxuqfQfYAmvg",
  authDomain: "task-manager-app-e55bc.firebaseapp.com",
  projectId: "task-manager-app-e55bc",
  storageBucket: "task-manager-app-e55bc.firebasestorage.app",
  messagingSenderId: "82349806450",
  appId: "1:82349806450:web:e34e24489f42b049ad83eb",
};

const app = initializeApp(firebaseConfig);
const auth: Auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
