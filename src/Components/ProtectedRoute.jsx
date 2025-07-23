import React from "react";
import { Navigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";

const ProtectedRoute = ({ children, proOnly = false }) => {
  const [user, loading] = useAuthState(auth);

  if (loading) {
    return <p className="text-center mt-10 text-gray-500">Loading...</p>;
  }

  if (!user) {
    return <Navigate to="/" replace />;
  }

  if (proOnly) {
    const isPro = localStorage.getItem("isPro") === "true";
    if (!isPro) {
      return (
        <div className="min-h-screen flex items-center justify-center text-center p-4">
          <div>
            <h2 className="text-xl font-bold mb-2 text-red-600">Pro Access Required</h2>
            <p className="mb-4 text-gray-600">This page is only for Pro users.</p>
            <a
              href="/pro"
              className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
            >
              Upgrade to Pro
            </a>
          </div>
        </div>
      );
    }
  }

  return children;
};

export default ProtectedRoute;
