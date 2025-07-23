import React from "react";

const UpgradeBanner = () => {
  const handleUpgrade = () => {
    window.location.href =  "https://imjo.in/dbRNg5";
  };

  return (
    <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-800 p-4 rounded-lg shadow mb-4">
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-3">
        <div>
          <h3 className="text-lg font-bold">🚀 Upgrade to Pro</h3>
          <p className="text-sm">
            Unlock link click analytics, custom themes, and more premium features.
          </p>
        </div>
        <button
          onClick={handleUpgrade}
          className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold text-sm px-4 py-2 rounded-md transition"
        >
          Upgrade Now
        </button>
      </div>
    </div>
  );
};

export default UpgradeBanner;
