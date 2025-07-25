import React, { createContext, useContext, useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const UserContext = createContext();
export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isPro, setIsPro] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = getAuth();

    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        const { displayName, email, uid } = firebaseUser;

        const userInfo = {
          name: displayName,
          email,
          id: uid,
        };

        setUser(userInfo);
        localStorage.setItem("user", JSON.stringify(userInfo)); // Optional
      } else {
        setUser(null);
      }

      const pro = localStorage.getItem("isPro");
      setIsPro(pro === "true");

      setLoading(false);
    });

    return () => unsubscribe(); // cleanup on unmount
  }, []);

  if (loading) return null;

  return (
    <UserContext.Provider value={{ user, isPro }}>
      {children}
    </UserContext.Provider>
  );
};
