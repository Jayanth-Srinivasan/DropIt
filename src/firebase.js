import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCLqBHePmOTTPZ-h8v76y3tsZCrUK-KnsU",
  authDomain: "fsd-chat-e351e.firebaseapp.com",
  projectId: "fsd-chat-e351e",
  storageBucket: "fsd-chat-e351e.appspot.com",
  messagingSenderId: "213272002159",
  appId: "1:213272002159:web:25350c9c2cbd3d260f179a",
  measurementId: "G-5RJSQ84503"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };