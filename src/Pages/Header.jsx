import React, { useState } from "react";
import { useUser } from "../context/UserContext";
import ProBadge from "../Components/ProBadge";
import { Link, useLocation } from "react-router-dom";
import { LogOut, Menu, X } from "lucide-react";
import logo from "../assets/ApniLink_Logo.png";

const Header = () => {
  const context = useUser();

  if (!context) return null;

  const { user, isPro } = context;
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("isPro");
    window.location.href = "/login";
  };

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex justify-between items-center">
        {/* 🔷 Left - Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="logo" className="w-12 h-12 sm:w-16 sm:h-16" />
        </Link>

        {/* 📱 Mobile Menu Button */}
        <button onClick={toggleMenu} className="md:hidden text-gray-700">
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        {/* 🔗 Center - Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-700">
          <Link to="/" className={navClass(location.pathname === "/")}>Home</Link>
          <Link to="/dashboard" className={navClass(location.pathname === "/dashboard")}>My Links</Link>
          <Link to="/analytics" className={navClass(location.pathname === "/analytics")}>Analytics</Link>
          {!isPro && (
            <Link to="/upgrade" className="text-purple-600 font-semibold hover:underline">
              Upgrade to Pro 💎
            </Link>
          )}
        </nav>

        {/* 👤 Right - User Info (Desktop) */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            to={`/${user?.username}`}
            className="hidden sm:block font-medium text-gray-800 hover:text-blue-600 transition"
          >
            {user?.name || "Welcome"}
          </Link>
          {isPro && <ProBadge />}
          <button onClick={handleLogout} title="Logout" className="text-red-500 hover:text-red-700">
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* 📱 Mobile Nav Drawer */}
      {menuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-md px-4 py-4 space-y-3 text-sm text-gray-700 z-40">
          <Link to="/" onClick={toggleMenu} className={navClass(location.pathname === "/")}>Home</Link>
          <Link to="/dashboard" onClick={toggleMenu} className={navClass(location.pathname === "/dashboard")}>My Links</Link>
          <Link to="/analytics" onClick={toggleMenu} className={navClass(location.pathname === "/analytics")}>Analytics</Link>
          {!isPro && (
            <Link to="/upgrade" onClick={toggleMenu} className="text-purple-600 font-semibold hover:underline">
              Upgrade to Pro 💎
            </Link>
          )}
          <div className="flex items-center justify-between pt-3 border-t">
            <Link
              to={`/${user?.username}`}
              onClick={toggleMenu}
              className="text-gray-800 hover:text-blue-600 transition"
            >
              {user?.name || "Welcome"}
            </Link>
            <button onClick={handleLogout} title="Logout" className="text-red-500 hover:text-red-700">
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

const navClass = (isActive) =>
  isActive
    ? "text-blue-600 font-semibold"
    : "hover:text-blue-600 transition";

export default Header;
