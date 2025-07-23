// utils/analytics.js
import { db } from "../firebase";
import { doc, updateDoc, increment } from "firebase/firestore";

/**
 * 🔥 Tracks a link click in Firestore
 * @param {string} userId - The UID of the user who owns the link
 * @param {string} linkId - The document ID of the link inside Firestore
 */
export const trackClick = async (userId, linkId) => {
  if (!userId || !linkId) {
    console.warn("trackClick: Missing userId or linkId");
    return;
  }

  try {
    const linkRef = doc(db, "links", userId, "items", linkId);
    
    // Increment the clicks count by 1
    await updateDoc(linkRef, {
      clicks: increment(1),
    });

    console.log(`✅ Click tracked for link ${linkId}`);
  } catch (error) {
    console.error("❌ Error tracking click:", error);
  }
};
