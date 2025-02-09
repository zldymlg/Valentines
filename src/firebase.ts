
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, collection, addDoc } from "firebase/firestore"; // Import Firestore functions

const firebaseConfig = {
  apiKey: "AIzaSyDwVNleqATzI0Vn4e8H6p12_3dxZgquRAM",
  authDomain: "valenti-b50a0.firebaseapp.com",
  projectId: "valenti-b50a0",
  storageBucket: "valenti-b50a0.firebasestorage.app",
  messagingSenderId: "603182981110",
  appId: "1:603182981110:web:d37a2e717405f37a5771d7",
  measurementId: "G-25LM9GNJVD"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app); 
const db = getFirestore(app);
export { auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, db, addDoc, collection };
