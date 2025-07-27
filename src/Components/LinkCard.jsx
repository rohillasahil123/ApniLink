// src/Components/LinkCard.jsx

import React from "react";
import { doc, updateDoc, increment } from "firebase/firestore";
import { db } from "../firebase";
import { motion } from "framer-motion";
import { useUser } from "../context/UserContext";
import { useTheme } from "../context/ThemeContext";

const LinkCard = ({ link, uid, showDelete = false, onDelete }) => {
  const { isPro } = useUser();
  const { theme } = useTheme();

  const handleClick = async () => {
    try {
      const ref = doc(db, "links", uid, "items", link.id);
      await updateDoc(ref, {
        clicks: increment(1),
      });
      window.open(link.url, "_blank");
    } catch (error) {
      console.error("Error tracking click:", error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={`flex justify-between items-center p-4 mb-3 rounded-xl shadow cursor-pointer transition-all
        ${theme === "dark" ? "bg-zinc-800 text-white hover:bg-zinc-700" : "bg-white text-gray-800 hover:bg-blue-50"}`}
    >
      <div onClick={handleClick} className="flex-1">
        <p className="font-semibold">{link.title}</p>
        <p className="text-sm truncate text-blue-500">{link.url}</p>

        {isPro && (
          <p className="text-xs mt-1 text-gray-500 dark:text-gray-400">
            🔥 Clicks: {link.clicks || 0}
          </p>
        )}
      </div>

      {showDelete && (
        <button
          onClick={onDelete}
          className="text-red-500 hover:text-red-700 ml-4"
          title="Delete link"
        >
          ❌
        </button>
      )}
    </motion.div>
  );
};

export default LinkCard;
