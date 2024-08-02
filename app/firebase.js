// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDYOi5i8KpI9SOVjn0Ul1G6yiLwOrti3oc",
  authDomain: "pantry-tracker-5ec85.firebaseapp.com",
  projectId: "pantry-tracker-5ec85",
  storageBucket: "pantry-tracker-5ec85.appspot.com",
  messagingSenderId: "413362851175",
  appId: "1:413362851175:web:e8a189d607535a673c73c2",
  measurementId: "G-PM2704K71G",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const db = getFirestore(app);
