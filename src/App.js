import React, {useEffect, useState} from 'react';
import { Routes, Route,useNavigate } from "react-router-dom";
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import {
  doc,
  setDoc,
  // // getDoc,
  // // getCountFromServer,
  // collection,
  // where,
  // getDocs,
  // query,
} from "firebase/firestore";
import { auth, db } from "./firebase";
import Login from './components/Login';
import Home from './components/Home';




function App() {
  const navigate = useNavigate();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
  const googleProvider = new GoogleAuthProvider();

  
  const onSignin = () => {
    signInWithPopup(auth, googleProvider)
      .then(async (user) => {
         setDoc(
            doc(db, "users", user?.user.uid),
            {
              name: user?.user.displayName,
              email: user?.user.email,
              photoUrl: user?.user.photoURL,
              uid: user?.user.uid,
            },
            { merge: true }
          ).then(async () => {
            navigate("/home");
              window.localStorage.setItem(
                "user",
                JSON.stringify({
                  name: user?.user.displayName,
                  email: user?.user.email,
                  photoUrl: user?.user.photoURL,
                  uid: user?.user.uid,
                })
              );
            setUser({
              name: user?.user.displayName,
              email: user?.user.email,
              photoUrl: user?.user.photoURL,
              uid: user?.user.uid,
            });
          });
        // setUser(user);
      })
      .catch((error) => alert(error.message));
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(false);
      }
    });
  }, []);

  return ( 
    <Routes>
      <Route path="/" element={<Login  user={user} setUser={setUser} signIn={onSignin}/>}>
        <Route index element={<Home  signOut={signOut}/>} />
      </Route>
    </Routes>
  );
}

export default App;
