import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// `firebase accaunt email mygame75484@gmail.com`
const firebaseConfig = {
  apiKey: "AIzaSyAzXw4oXhvFzQ_FWRwEuC-CCuoheZNuX3w",
  authDomain: "my-yelp-aditional.firebaseapp.com",
  projectId: "my-yelp-aditional",
  storageBucket: "my-yelp-aditional.appspot.com",
  messagingSenderId: "447635856589",
  appId: "1:447635856589:web:5a60dcf99b7a61b3db1d84",
  measurementId: "G-8ZXMB6K4JC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;
export const db = getFirestore(app);
