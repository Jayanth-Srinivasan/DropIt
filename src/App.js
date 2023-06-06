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
} from "firebase/firestore";
import { auth, db } from "./firebase";
import Home from './components/Home';
import Hero from './components/Hero';
import Send from './components/Send';
import Receive from './components/Receive';




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

  const onSignout = () => {
    signOut(auth)
    .then(() => {
      navigate('/');
      setUser(null);
      localStorage.removeItem("user");
    })
    .catch(() => {
      alert("Error occured while logging out!");
    })
  }

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
      <Route path="/" element={<Hero  user={user} setUser={setUser} signIn={onSignin}/>}/>
      <Route path="/home" element={<Home  signOut={onSignout}/>} />
      <Route path="/send" element={<Send />} />
      <Route path="/receive" element={<Receive  />} />
    </Routes>
  );
}

export default App;
