import React, { useState, useEffect, useContext, createContext } from "react";
import firebase from "../appUtils/initFirebase";
import "firebase/auth";
import {
  setUserCookie,
  getUserFromCookie,
  removeUserCookie,
} from "../appUtils/userCookies";
import { mapUserData } from "../appUtils/mapUserData";

export interface IUser {
  email: string;
  id: string;
  token: string;
}

interface Auth {
  signIn(email: string, password: string): Promise<IUser>;
  signUp(email: string, password: string): Promise<IUser>;
  signOut(): void;
  user: IUser;
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
  const [user, setUser] = useState<IUser>(null as IUser);

  const signIn = async (email: string, password: string) => {
    try {
      const res = await firebase
        .auth()
        .signInWithEmailAndPassword(email, password);

      const data = mapUserData(res.user);

      setUserCookie(data);

      setUser(data);

      return data;
    } catch (error) {
      console.log(error.message);
    }
  };

  const signUp = async (email: string, password: string) => {
    try {
      const res = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password);

      const data = mapUserData(res.user);

      setUserCookie(data);

      setUser(data);

      return data;
    } catch (error) {
      console.log(error.message);
    }
  };

  const signOut = async () => {
    try {
      await firebase.auth().signOut();

      removeUserCookie();
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    const cancelAuthListener = firebase
      .auth()
      .onIdTokenChanged((user: firebase.User) => {
        if (user) {
          const userData = mapUserData(user);
          setUserCookie(userData);
          setUser(userData);
        } else {
          removeUserCookie();
          setUser(null);
        }
      });

    const userFromCookie = getUserFromCookie();
    if (!userFromCookie) {
      return;
    }
    setUser(userFromCookie);

    return () => {
      cancelAuthListener();
    };
  }, []);

  return { signIn, signUp, signOut, user };
}
