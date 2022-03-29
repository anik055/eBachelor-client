/* eslint-disable no-unreachable */
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import React, { useContext, useEffect, useState } from "react";
import "./firebase.config";
import IsAdmin from "./IsAdmin";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [loading, setLoading] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(
    localStorage.getItem("userDetails")
  );

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setLoggedInUser(user);
      localStorage.setItem("userDetails", user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  // signup function
  async function signup(email, password, username) {
    const auth = getAuth();
    await createUserWithEmailAndPassword(auth, email, password);

    // update profile
    await updateProfile(auth.currentUser, {
      displayName: username,
    });

    const user = auth.currentUser;
    localStorage.setItem("userDetails", user);
    setLoggedInUser({
      ...user,
    });
    storeAuthToken();
  }

  //auth token
  const storeAuthToken = (currentUser) => {
    getAuth()
      .currentUser.getIdToken(/* forceRefresh */ true)
      .then(function (idToken) {
        sessionStorage.setItem("token", idToken);
      })
      .catch(function (error) {});
  };

  // login function
  function login(email, password) {
    const auth = getAuth();
    return signInWithEmailAndPassword(auth, email, password);
  }

  // logout function
  function logout() {
    const auth = getAuth();
    sessionStorage.setItem("token", "");
    localStorage.setItem("userDetails", "");
    return signOut(auth);
  }

  //check the user whether admin or not
  const isAdmin = () => {
    return IsAdmin();
  };

  const value = {
    loggedInUser,
    signup,
    login,
    logout,
    isAdmin,
    storeAuthToken,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
