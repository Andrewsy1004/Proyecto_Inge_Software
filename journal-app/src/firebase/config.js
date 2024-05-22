import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite";

const firebaseConfig = {
  apiKey: "AIzaSyDyUhtbnrkjOwB-aswONCPe-tiUqhITRo4",
  authDomain: "react-course-d7694.firebaseapp.com",
  projectId: "react-course-d7694",
  storageBucket: "react-course-d7694.appspot.com",
  messagingSenderId: "446496076835",
  appId: "1:446496076835:web:a361d75b0c5cf52a756d96",
  measurementId: "G-LWSVYH5NKM"
};

// Initialize Firebase
export const Firabaseapp = initializeApp(firebaseConfig);
export const FirabaseAuth = getAuth(Firabaseapp);
export const FirabaseDB = getFirestore(Firabaseapp);