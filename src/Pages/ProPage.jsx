// src/pages/ProPage.jsx

import React from "react";
import { useNavigate } from "react-router-dom";
import UpgradeProButton from "../Components/UpgradeProButton"; // ✅ Lowercase path

const ProPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center justify-center text-center">
      <h1 className="text-4xl font-bold mb-4 text-indigo-700">
        Upgrade to Pro 🚀
      </h1>
      <p className="text-lg mb-6 max-w-md text-gray-600">
        Unlock unlimited links, click analytics, and remove branding from your public page.
      </p>

      <div className="bg-white shadow-lg p-6 rounded-md max-w-md w-full">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          💳 Pro Plan – ₹99 Only
        </h2>

        <ul className="text-left text-gray-600 mb-6 list-disc list-inside">
          <li>Unlimited Links</li>
          <li>View Click Analytics</li>
          <li>Remove Branding</li>
          <li>Priority Support</li>
        </ul>

        {/* ✅ Payment Button */}
        <UpgradeProButton />

        <button
          onClick={() => navigate("/dashboard")}
          className="mt-4 text-indigo-600 underline hover:text-indigo-800"
        >
          ← Back to Dashboard
        </button>
      </div>
    </div>
  );
};

export default ProPage;
