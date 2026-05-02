import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; 

const firebaseConfig = {
  apiKey: "AIzaSyDtQpyFQUoAGLf70x4ahfSnoRRP54-pkD0",
  authDomain: "circleup-2f4b3.firebaseapp.com",
  projectId: "circleup-2f4b3",
  storageBucket: "circleup-2f4b3.firebasestorage.app",
  messagingSenderId: "98731543542",
  appId: "1:98731543542:web:dfa22dd08de3fd39c755d7"
};

const app = initializeApp(firebaseConfig);
// const { login } = useAuth();
export const db = getFirestore(app);
export const auth = getAuth(app);
