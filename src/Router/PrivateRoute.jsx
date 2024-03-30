import { Navigate, useLocation } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from 'react';
import { auth } from "../../firebase";

export function PrivateRoute({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
        setTimeout(() => {
          window.location.href = "/";
        }, 500);
      }
      setIsLoading(false);
    });
    return () => unsubscribe();
  }, []); 

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  return children;
}