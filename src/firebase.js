import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAfmSltqXP6NOI7HeWOoYZ4Sz_S2078sgw",
  authDomain: "biolinker-ba1a9.firebaseapp.com",
  projectId: "biolinker-ba1a9",
  storageBucket: "biolinker-ba1a9.firebasestorage.app",
  messagingSenderId: "831531161417",
  appId: "1:831531161417:web:101eb19a91556ee8c9ec98"
};

const app = initializeApp(firebaseConfig);
 const auth = getAuth(app);
 const provider = new GoogleAuthProvider();
 const db = getFirestore(app);
export { auth, provider , db };
