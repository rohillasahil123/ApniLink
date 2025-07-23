import React, { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { useUser } from "../context/UserContext";
import toast, { Toaster } from "react-hot-toast";

import UpgradeBanner from "../Components/UpgradeBanner";
import { trackClick } from "../utils/analytics";

const Dashboard = () => {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  const { isPro } = useUser();

  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🚀 Load Links
  useEffect(() => {
    if (!user) return;

    const fetchLinks = async () => {
      const q = query(
        collection(db, "links", user.uid, "items"),
        orderBy("createdAt", "desc")
      );
      const snapshot = await getDocs(q);
      const items = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setLinks(items);
      setLoading(false);
    };

    fetchLinks();
  }, [user]);

  // ➕ Add Link
  const handleAddLink = async () => {
    if (!title || !url) {
      toast.error("Both fields required");
      return;
    }

    if (!isPro && links.length >= 3) {
      toast.error("Free users can only add 3 links");
      return;
    }

    try {
      const newLink = {
        title,
        url,
        createdAt: Date.now(),
        clicks: 0,
      };

      const docRef = await addDoc(
        collection(db, "links", user.uid, "items"),
        newLink
      );

      setLinks([{ ...newLink, id: docRef.id }, ...links]);
      setTitle("");
      setUrl("");
      toast.success("Link added!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to add link");
    }
  };

  // ❌ Delete Link
  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "links", user.uid, "items", id));
      setLinks(links.filter((l) => l.id !== id));
      toast.success("Link deleted");
    } catch (err) {
      console.error(err);
      toast.error("Error deleting link");
    }
  };

  // 🔒 Logout
  const handleLogout = async () => {
    await signOut(auth);
    navigate("/");
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <Toaster />

      {/* 🔹 Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">🚀 Dashboard</h2>
   
      </div>

      {/* 🔹 Show Upgrade Banner for Free Users */}
      {!isPro && <UpgradeBanner />}

      {/* 🔹 Add Link Form */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Link title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border rounded mb-2"
        />
        <input
          type="text"
          placeholder="https://yourlink.com"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="w-full p-2 border rounded mb-2"
        />
        <button
          onClick={handleAddLink}
          className="bg-blue-600 text-white w-full py-2 rounded"
        >
          ➕ Add Link
        </button>
      </div>

      {/* 🔹 List of Links */}
      {loading ? (
        <p className="text-center text-gray-500">Loading links...</p>
      ) : (
        <>
          <h3 className="text-lg font-semibold mb-2">Your Links:</h3>
          {links.map((link) => (
            <div
              key={link.id}
              className="flex justify-between items-center bg-white p-3 mb-2 rounded shadow hover:bg-blue-50 transition"
            >
              <div>
                <p className="font-semibold">{link.title}</p>
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 text-sm"
                  onClick={() => trackClick(user.uid, link.id)}
                >
                  {link.url}
                </a>
                {isPro && (
                  <p className="text-xs text-gray-500">
                    Clicks: {link.clicks || 0}
                  </p>
                )}
              </div>
              <button
                onClick={() => handleDelete(link.id)}
                className="text-red-500 hover:text-red-700"
              >
                ❌
              </button>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default Dashboard;
