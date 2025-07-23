import React from "react";
import { doc, updateDoc, increment, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { motion } from "framer-motion";
import { useUser } from "../context/UserContext";

const LinkCard = ({ link, username, showDelete = false, onDelete }) => {
  const { isPro } = useUser();

  const handleClick = async () => {
    try {
      // 🔐 Step 1: Get UID from username
      const userRef = doc(db, "users", username);
      const userSnap = await getDoc(userRef);
      if (!userSnap.exists()) return;

      const uid = userSnap.data().uid;

      // 📊 Step 2: Track Clicks
      await updateDoc(doc(db, "links", uid, "items", link.id), {
        clicks: increment(1),
      });

      // 🌐 Step 3: Open Link
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
      className="flex justify-between items-center bg-white p-4 mb-3 rounded-xl shadow hover:shadow-md hover:bg-blue-50 transition-all cursor-pointer"
    >
      {/* 🔗 Link Content */}
      <div onClick={handleClick} className="flex-1">
        <p className="font-semibold text-gray-800">{link.title}</p>
        <p className="text-blue-500 text-sm truncate">{link.url}</p>

        {isPro && (
          <p className="text-xs text-gray-500 mt-1">
            🔥 Clicks: {link.clicks || 0}
          </p>
        )}
      </div>

      {/* ❌ Delete Button (if allowed) */}
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
