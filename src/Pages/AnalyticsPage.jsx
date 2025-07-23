import React, { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import {
  collection,
  getDocs,
  orderBy,
  query
} from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { useUser } from "../context/UserContext";
import { motion } from "framer-motion";
import { Navigate } from "react-router-dom";

const AnalyticsPage = () => {
  const [user] = useAuthState(auth);
  const { isPro } = useUser();
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(true);

  if (!isPro) {
    return <Navigate to="/pro" replace />;
  }

  useEffect(() => {
    const fetchLinks = async () => {
      if (!user) return;

      const q = query(
        collection(db, "links", user.uid, "items"),
        orderBy("createdAt", "desc")
      );

      const snapshot = await getDocs(q);
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setLinks(data);
      setLoading(false);
    };

    fetchLinks();
  }, [user]);

  if (loading) {
    return <p className="text-center mt-10 text-gray-500">Loading...</p>;
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">📊 Link Click Analytics</h2>

      {links.length === 0 ? (
        <p className="text-gray-500">No links to show</p>
      ) : (
        <div className="space-y-4">
          {links.map((link, index) => (
            <motion.div
              key={link.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="p-4 bg-white shadow rounded flex justify-between items-center hover:shadow-md transition"
            >
              <div>
                <p className="font-semibold text-gray-800">{link.title}</p>
                <p className="text-sm text-gray-500">{link.url}</p>
              </div>
              <div className="text-right">
                <p className="text-blue-600 font-bold text-lg">
                  {link.clicks || 0}
                </p>
                <p className="text-xs text-gray-400">clicks</p>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AnalyticsPage;
