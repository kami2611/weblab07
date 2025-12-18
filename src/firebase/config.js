// Firebase configuration file
// Replace the values below with your Firebase project configuration
// Get these values from: Firebase Console > Project Settings > Your Apps > Web App

import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

// Your web app's Firebase configuration
// TODO: Replace these placeholder values with your actual Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyCIcwoCLd3mvw8qNL1BB4RKCbsrg2ZhkWw",
  authDomain: "myfirebaselab-d7dcd.firebaseapp.com",
  projectId: "myfirebaselab-d7dcd",
  storageBucket: "myfirebaselab-d7dcd.firebasestorage.app",
  messagingSenderId: "544639643548",
  appId: "1:544639643548:web:976bf65de7b7f450ece259",
  measurementId: "G-KXN7DMMKL6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Initialize Firestore
const db = getFirestore(app)

export { db }
