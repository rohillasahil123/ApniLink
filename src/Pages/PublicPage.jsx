import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import logo from "../assets/ApniLink_Logo.png"
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
  const { username } = useParams();
  const [links, setLinks] = useState([]);
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userRef = doc(db, "users", username);
        const userSnap = await getDoc(userRef);

        if (!userSnap.exists()) {
          setUserInfo(null);
          setLoading(false);
          return;
        }

        const userData = userSnap.data();
        setUserInfo(userData);

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

if (loading) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="relative w-24 h-24">
       
        <div className="absolute inset-0 border-4 border-indigo-300 border-t-transparent rounded-full animate-spin"></div>
        <img
          src={logo}
          className="w-16 h-16 rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 object-cover"
        />
      </div>
    </div>
  );
}


  if (!userInfo) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500">⚠️ User not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center p-6 bg-gray-50">
     
      <img
        src={userInfo.photoURL}
        alt={userInfo.name}
        className="w-24 h-24 rounded-full mb-4 border-4 border-indigo-300"
      />
      <h2 className="text-2xl font-bold mb-1">{userInfo.name}</h2>
      <p className="text-gray-600 mb-4 text-center max-w-md">
        {userInfo.bio || "Welcome to my link page!"}
      </p>

      {/* 🟦 Dashboard Button */}
      <Link
        to="/dashboard"
        className="mb-6 px-4 py-2 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700 transition"
      >
        Go to Dashboard
      </Link>

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
