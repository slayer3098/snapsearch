// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCzy-wUuef-kKnC6YZmRNOSgeWgS1eLccM",
  authDomain: "http://snapsearch-d7304.firebaseapp.com",
  projectId: "snapsearch-d7304",
  appId: "1:185734539229:web:1bf51b90903d7041e0b834",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);