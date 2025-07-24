// src/components/Header.jsx

import React from "react";
import { useUser } from "../context/UserContext";
import ProBadge from "../Components/ProBadge";
import { Link, useLocation } from "react-router-dom";
import { LogOut } from "lucide-react";
import logo from "../assets/ApniLink_Logo.png"

const Header = () => {
  const { user, isPro } = useUser();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("isPro");
    window.location.href = "/login";
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        
        {/* 🔷 Left - Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="logo" className="w-16 h-16" />
          {/* <span className="text-xl font-bold text-blue-600">ApniLink</span> */}
        </Link>

        {/* 🔗 Center - Nav Links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-700">
          <Link to="/" className={navClass(location.pathname === "/")}>Home</Link>
          <Link to="/dashboard" className={navClass(location.pathname.includes("dash"))}>My Links</Link>
          <Link to="/analytics" className={navClass(location.pathname.includes("analytics"))}>Analytics</Link>
          {!isPro && (
            <Link to="/upgrade" className="text-purple-600 font-semibold hover:underline">
              Upgrade to Pro 💎
            </Link>
          )}
        </nav>

        {/* 👤 Right - User Info */}
        <div className="flex items-center gap-3">
          <span className="hidden sm:block font-medium text-gray-800">
            {user?.name || "Welcome"}
          </span>
          {isPro && <ProBadge />}

          <Link
            to="/settings"
            className="text-gray-600 text-sm hover:text-blue-600"
          >
            Settings
          </Link>

          <button
            onClick={handleLogout}
            title="Logout"
            className="text-red-500 hover:text-red-700"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  );
};

const navClass = (isActive) =>
  isActive
    ? "text-blue-600 border-b-2 border-blue-600 pb-1"
    : "hover:text-blue-600 transition";

export default Header;
