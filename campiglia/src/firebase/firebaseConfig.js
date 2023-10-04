// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD-Drg-KbJZ1N-_kliNMsnepbOaw1H13fQ",
  authDomain: "museoescobar-85f14.firebaseapp.com",
  projectId: "museoescobar-85f14",
  storageBucket: "museoescobar-85f14.appspot.com",
  messagingSenderId: "70609270229",
  appId: "1:70609270229:web:3862bbdba60bacfd58395c"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig)

export const db = getFirestore(app)