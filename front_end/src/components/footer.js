import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 py-4 px-4 sm:px-6 lg:px-8 text-white text-center w-full">
      <p>&copy; 2024 Simple Blog. All rights reserved.</p>
      <div className="mt-4 flex justify-center">
        <a href="#" className="text-white hover:text-gray-200 mx-2">
          Facebook
        </a>
        <a href="#" className="text-white hover:text-gray-200 mx-2">
          Twitter
        </a>
        <a href="#" className="text-white hover:text-gray-200 mx-2">
          Instagram
        </a>
      </div>
    </footer>
  );
};

export default Footer;
