import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth } from '../utils/firebaseConfig';
import { onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth';

// lets me store users globally
const AuthContext = createContext(null); // builds a data container to access from anywhere in the component tree

export function AuthProvider({ children }) { 
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const sub = onAuthStateChanged(auth, u => {
      setUser(u); // sets users if logged in, otherwise return null if logged out
      setReady(true); // Firebase checker for session
    });
    return () => sub(); // clean up
  }, []);

  const signIn = (email, password) => // similar to in class, except they don't live inside screen
  // doesn't manage ui states and only calls Firebase
    signInWithEmailAndPassword(auth, email.trim(), password);

  const signUp = (email, password) =>
    createUserWithEmailAndPassword(auth, email.trim(), password);

  const signOutAll = () => signOut(auth);

  // gives auth state and actions to ANY component in the app
  return (
    <AuthContext.Provider value={{ user, ready, signIn, signUp, signOutAll }}>
      {children}
    </AuthContext.Provider>
  );
}

// gives quick access to everything in AuthProvider, helper function
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    return null;
  }
  return context;
}