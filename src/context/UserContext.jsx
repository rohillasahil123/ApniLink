import React, { createContext, useContext, useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";

const UserContext = createContext();
export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isPro, setIsPro] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = getAuth();

    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const { displayName, email, uid, photoURL } = firebaseUser;

        // 🔹 Generate username from email (before @)
        const username = email.split("@")[0].toLowerCase();

        // 🔹 Create user info object
        const userInfo = {
          name: displayName,
          email,
          id: uid,
          photoURL,
          username,
        };

        setUser(userInfo);
        localStorage.setItem("user", JSON.stringify(userInfo));

        // 🔹 Save public profile to Firestore
        try {
          const userDocRef = doc(db, "users", username);
          await setDoc(userDocRef, {
            name: displayName,
            email,
            uid,
            photoURL,
            bio: "Welcome to my link page!",
          });
        } catch (err) {
          console.error("❌ Error saving public profile:", err);
        }

        const pro = localStorage.getItem("isPro");
        setIsPro(pro === "true");
      } else {
        setUser(null);
      }

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
