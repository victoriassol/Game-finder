// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB2bdkOEkm8AOruaXj9xwPyoyH6e1EK924",
  authDomain: "gamefinder-e9947.firebaseapp.com",
  projectId: "gamefinder-e9947",
  storageBucket: "gamefinder-e9947.appspot.com",
  messagingSenderId: "261127953037",
  appId: "1:261127953037:web:c984e15d456fab713ae0c4",
  measurementId: "G-Q6YV5WYQD6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
export const googleProvider = new GoogleAuthProvider(app)

export const database = getFirestore(app);

// onAuthStateChanged(auth, user => {
//   user ? "ok" : "no user";
// })