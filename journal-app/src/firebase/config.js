import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite";

const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
  measurementId: ""
};

// Initialize Firebase
export const Firabaseapp = initializeApp(firebaseConfig);
export const FirabaseAuth = getAuth(Firabaseapp);
export const FirabaseDB = getFirestore(Firabaseapp);
