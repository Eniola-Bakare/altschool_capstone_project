// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDiPYBJs0rKBug4frLgDeGPnJbgwXRj83I",
  authDomain: "chatter-74742.firebaseapp.com",
  projectId: "chatter-74742",
  storageBucket: "chatter-74742.appspot.com",
  messagingSenderId: "637323237163",
  appId: "1:637323237163:web:34f03ecacfb99b09ef176e",
  measurementId: "G-14BBPPX88R",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
// const analytics = getAnalytics(app);
export const db = getFirestore(app);
