import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../firebase";
import {
  collection,
  getDoc,
  getDocs,
  doc,
  query,
  orderBy,
} from "firebase/firestore";
import LinkCard from "../Components/LinkCard";

const PublicPage = () => {
  const { username } = useParams(); // e.g. sahilrohilla
  const [links, setLinks] = useState([]);
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // ✅ Step 1: Get user document by slug (username)
        const userRef = doc(db, "users", username);
        const userSnap = await getDoc(userRef);

        if (!userSnap.exists()) {
          setUserInfo(null);
          setLoading(false);
          return;
        }

        const userData = userSnap.data();
        setUserInfo(userData);

        // ✅ Step 2: Get all links of that user using UID
        const q = query(
          collection(db, "links", userData.uid, "items"),
          orderBy("createdAt", "desc")
        );
        const snapshot = await getDocs(q);
        const linksData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setLinks(linksData);
      } catch (error) {
        console.error("Error loading public page:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [username]);

  // 🔁 Loader
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  // ❌ User Not Found
  if (!userInfo) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500">⚠️ User not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center p-6 bg-gray-50">
      {/* 🔹 User Info */}
      <img
        src={userInfo.photoURL}
        alt={userInfo.name}
        className="w-24 h-24 rounded-full mb-4 border-4 border-indigo-300"
      />
      <h2 className="text-2xl font-bold mb-1">{userInfo.name}</h2>
      <p className="text-gray-600 mb-6 text-center max-w-md">
        {userInfo.bio || "Welcome to my link page!"}
      </p>

      {/* 🔗 Links */}
      <div className="w-full max-w-md">
        {links.length > 0 ? (
          links.map((link) => (
            <LinkCard key={link.id} link={link} username={username} />
          ))
        ) : (
          <p className="text-gray-400 text-center">No links added yet!</p>
        )}
      </div>
    </div>
  );
};

export default PublicPage;
