import React from "react";
import { useNavigate } from "react-router-dom";
import UpgradeProButton from "../Components/UpgradeProButton";

const NotPro = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50 px-4 text-center">
      <h2 className="text-3xl font-bold mb-3 text-red-600">🔒 Pro Feature</h2>
      <p className="text-gray-700 text-lg mb-6 max-w-md">
        This feature is available only for <strong>Pro users</strong>. Upgrade now to access analytics, themes, and more powerful tools!
      </p>

      <UpgradeProButton />

      <button
        onClick={() => navigate("/dashboard")}
        className="mt-4 text-blue-600 underline text-sm hover:text-blue-800 transition"
      >
        ← Back to Dashboard
      </button>
    </div>
  );
};

export default NotPro;
