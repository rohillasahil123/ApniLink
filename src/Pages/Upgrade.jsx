import UpgradeProButton from "../Components/UpgradeProButton";

const Upgrade = () => {
  return (
    <div className="text-center mt-20">
      <h2 className="text-2xl font-bold text-red-600">🔒 Pro Feature Locked</h2>
      <p className="mt-2">Upgrade to unlock themes, analytics, and more</p>
      <div className="mt-4">
        <UpgradeProButton />
      </div>
    </div>
  );
};

export default Upgrade;
