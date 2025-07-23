import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-400 text-sm py-6 px-4 text-center mt-10">
      <p>
        &copy; {new Date().getFullYear()} ApniLink. All rights reserved.
      </p>
      <p className="mt-1">
        Built with 💙 by Sahil Rohilla | <a href="#" className="underline">Privacy</a> | <a href="#" className="underline">Contact</a>
      </p>
    </footer>
  );
};

export default Footer;
