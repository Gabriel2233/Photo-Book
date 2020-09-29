import React, { useState, useEffect, useContext, createContext } from "react";
import firebase from "firebase/app";
import "firebase/auth";

if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: "AIzaSyCHOv9WV823VHe6CvNR8CbP_LNCOk16Lzs",
    authDomain: "photoalbum-46a17.firebaseapp.com",
    databaseURL: "https://photoalbum-46a17.firebaseio.com",
    projectId: "photoalbum-46a17",
    storageBucket: "photoalbum-46a17.appspot.com",
    messagingSenderId: "60689065638",
    appId: "1:60689065638:web:ca3aa399dfd6e547763667",
    measurementId: "G-DT4LK9CT8R",
  });
}

interface User {
  email: string;
  password: string;
}

interface Auth {
  signIn(email: string, password: string): void;
  signUp(email: string, password: string): void;
  signOut(): void;
  user: User;
}

const AuthContext = createContext({});

export const ProvideAuth: React.FC = ({ children }) => {
  const auth: Auth = useProvideAuth();

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const auth = useContext(AuthContext) as Auth;

  return auth;
};

function useProvideAuth() {
  const [user, setUser] = useState<User>(null as User);

  const signIn = async (email: string, password: string) => {
    const response = await firebase
      .auth()
      .signInWithEmailAndPassword(email, password);

    const userData: User = {
      email,
      password,
    };

    setUser(userData);
    return response.user;
  };

  const signUp = async (email: string, password: string) => {
    const response = await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password);

    const userData: User = {
      email,
      password,
    };

    setUser(userData);
    return response.user;
  };

  const signOut = async () => {
    await firebase.auth().signOut();

    setUser(null);
  };

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log(user);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return { signIn, signUp, signOut, user };
}
