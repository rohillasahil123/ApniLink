import React from "react";

const UpgradeProButton = () => {
  const handleUpgradeClick = () => {
    window.location.href = "https://payments.cashfree.com/forms/apnilink1";
  };

  return (
    <div className="text-center my-6">
      <button
        onClick={handleUpgradeClick}
        className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition duration-300"
      >
        🚀 Upgrade to Pro – ₹99
      </button>
      <p className="text-sm text-gray-500 mt-2">
        Unlock premium features like analytics, themes, and more!
      </p>
    </div>
  );
};

export default UpgradeProButton;
