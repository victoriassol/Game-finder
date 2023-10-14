import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB2bdkOEkm8AOruaXj9xwPyoyH6e1EK924",
  authDomain: "gamefinder-e9947.firebaseapp.com",
  projectId: "gamefinder-e9947",
  storageBucket: "gamefinder-e9947.appspot.com",
  messagingSenderId: "261127953037",
  appId: "1:261127953037:web:c984e15d456fab713ae0c4",
  measurementId: "G-Q6YV5WYQD6"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
export const googleProvider = new GoogleAuthProvider(app)

export const database = getFirestore(app);

// onAuthStateChanged(auth, user => {
//   user ? "ok" : "no user";
// })