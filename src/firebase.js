import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDQ-YLMUjJPtCCnO7gQ5u_IbsDL1G53u8c",
  authDomain: "drop-it-f48a2.firebaseapp.com",
  projectId: "drop-it-f48a2",
  storageBucket: "drop-it-f48a2.appspot.com",
  messagingSenderId: "785266804771",
  appId: "1:785266804771:web:69fd25ed7dd5c016588996",
  measurementId: "G-6YKX2XF069"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };