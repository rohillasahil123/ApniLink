import React from "react";
import UpgradeProButton from "../Components/UpgradeProButton";

const Upgrade = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 px-4 text-center">
      <h2 className="text-3xl font-bold text-red-600 mb-4">🔒 Pro Feature Locked</h2>
      <p className="text-gray-700 text-lg mb-6 max-w-md">
        This feature is available only for <strong>Pro users</strong>. Unlock themes, click analytics, unlimited links, and more.
      </p>

      <UpgradeProButton />
    </div>
  );
};

export default Upgrade;
