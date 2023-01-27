// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBgkjFixHFtSYNLoOCGWEnNhnMWLHGqGhw",
  authDomain: "fir-practice-b87d4.firebaseapp.com",
  projectId: "fir-practice-b87d4",
  storageBucket: "fir-practice-b87d4.appspot.com",
  messagingSenderId: "79815112115",
  appId: "1:79815112115:web:87bfc382a20c6ae0bc07c6",
  measurementId: "G-2TZN7TBYEN",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore();
