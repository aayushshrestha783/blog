import React from "react";

const Header = () => {
  return (
    <header className="bg-gray-800 py-4 px-4 sm:px-6 lg:px-8 flex items-center justify-between">
      <div className="flex items-center">
        <img src="logo.png" alt="Logo" className="h-8 mr-4" />
        <h1 className="text-white text-lg font-semibold">Simple Blog</h1>
      </div>
      <nav>
        <ul className="flex space-x-4">
          <li>
            <a href="#" className="text-white hover:text-gray-200">
              Home
            </a>
          </li>
          <li>
            <a href="#" className="text-white hover:text-gray-200">
              About
            </a>
          </li>
          <li>
            <a href="#" className="text-white hover:text-gray-200">
              Contact
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
