// src/pages/Success.jsx

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import generateSlug from "../utils/generateSlug";

const Success = () => {
  const navigate = useNavigate();
  const [user] = useAuthState(auth);
  const [message, setMessage] = useState("⏳ Verifying your payment...");

  useEffect(() => {
    const markUserPro = async () => {
      const params = new URLSearchParams(window.location.search);
      const paymentId = params.get("payment_id");

      if (paymentId && user) {
        try {
          const slug = generateSlug(user.displayName);
          const userRef = doc(db, "users", slug);
          const userSnap = await getDoc(userRef);

          if (userSnap.exists()) {
            const userData = userSnap.data();

            if (userData.isProUser) {
              setMessage("✅ You’re already a Pro user!");
            } else {
              await updateDoc(userRef, {
                isProUser: true,
                paymentId: paymentId,
                proActivatedAt: new Date().toISOString(),
              });
              localStorage.setItem("isPro", "true");
              setMessage("🎉 Payment Successful! Welcome to Pro Plan 🚀");
            }
          } else {
            setMessage("⚠️ User data not found in database.");
          }
        } catch (err) {
          console.error("Failed to mark user as Pro:", err);
          setMessage("❌ Something went wrong while upgrading.");
        }
      } else {
        setMessage("⚠️ Missing payment ID or user not logged in.");
      }

      setTimeout(() => {
        navigate("/dashboard");
      }, 2500);
    };

    markUserPro();
  }, [navigate, user]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4">
      <h1 className="text-2xl font-semibold text-green-600 mb-3">✅ Payment Status</h1>
      <p className="text-lg text-gray-700 text-center">{message}</p>
      <p className="text-sm text-gray-500 mt-2">Redirecting to your dashboard...</p>
    </div>
  );
};

export default Success;
