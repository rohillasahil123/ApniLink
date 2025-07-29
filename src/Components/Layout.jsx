// src/components/Layout.jsx

import React from "react";
import Header from "../Pages/Header";
import Footer from "../Pages/Footer";

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-white">

      <Header />

    
      <main className="flex-grow px-4 md:px-20 py-10">
        {children}
      </main>


      <Footer />
    </div>
  );
};

export default Layout;
