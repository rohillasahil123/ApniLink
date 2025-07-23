import React from "react";
import { auth, provider, db } from "../firebase";
import { signInWithPopup } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import generateSlug from "../utils/generateSlug";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      // 1. Google Sign-In
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // 2. Create slug from name
      const slug = generateSlug(user.displayName);

      // 3. Check if user already exists
      const userRef = doc(db, "users", slug);
      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) {
        // 4. New user → Save in Firestore
        await setDoc(userRef, {
          uid: user.uid,
          name: user.displayName,
          photoURL: user.photoURL,
          slug: slug,
          isProUser: false,
          bio: "",
        });
      }

      // 5. Save Pro status in localStorage
      const isPro = userSnap.exists() && userSnap.data().isProUser;
      localStorage.setItem("isPro", isPro ? "true" : "false");

      // 6. Redirect
      navigate("/dashboard");
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <button
        onClick={handleLogin}
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md text-lg font-semibold shadow"
      >
        Sign in with Google
      </button>
    </div>
  );
};

export default Login;
