import React from "react";
import { Navigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import { useUser } from "../context/UserContext";

const ProtectedRoute = ({ children, proOnly = false }) => {
  const [user, loading] = useAuthState(auth);
  const { isPro } = useUser(); // ✅ context-based, safer than localStorage

  if (loading) {
    return <p className="text-center mt-10 text-gray-500">Loading...</p>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (proOnly && !isPro) {
    return (
      <div className="min-h-screen flex items-center justify-center text-center p-4">
        <div>
          <h2 className="text-xl font-bold mb-2 text-red-600">🔒 Pro Access Required</h2>
          <p className="mb-4 text-gray-600">This feature is only available to Pro users.</p>
          <a
            href="/pro"
            className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
          >
            Upgrade to Pro 🚀
          </a>
        </div>
      </div>
    );
  }

  return children;
};

export default ProtectedRoute;
