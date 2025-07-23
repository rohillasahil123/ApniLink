// src/pages/Success.jsx

import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import generateSlug from "../utils/generateSlug";

const Success = () => {
  const navigate = useNavigate();
  const [user] = useAuthState(auth);

  useEffect(() => {
    const markUserPro = async () => {
      const params = new URLSearchParams(window.location.search);
      const paymentId = params.get("payment_id");

      if (paymentId && user) {
        try {
          // 🔐 Step 1: Get user doc from Firestore
          const slug = generateSlug(user.displayName);
          const userRef = doc(db, "users", slug);
          const userSnap = await getDoc(userRef);

          if (userSnap.exists() && !userSnap.data().isProUser) {
            // ✅ Step 2: Update Firestore only if not already Pro
            await updateDoc(userRef, {
              isProUser: true,
            });
          }

          // 💾 Step 3: Update localStorage
          localStorage.setItem("isPro", "true");
        } catch (err) {
          console.error("Failed to mark user as Pro:", err);
        }
      }

      // 🔁 Step 4: Redirect to dashboard
      setTimeout(() => {
        navigate("/dashboard");
      }, 2500);
    };

    markUserPro();
  }, [navigate, user]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4">
      <h1 className="text-3xl font-bold text-green-600 mb-4">🎉 Payment Successful!</h1>
      <p className="text-lg text-gray-700 mb-2">
        Welcome to the <strong>Pro Plan</strong> 🚀
      </p>
      <p className="text-sm text-gray-500">Redirecting to your dashboard...</p>
    </div>
  );
};

export default Success;
