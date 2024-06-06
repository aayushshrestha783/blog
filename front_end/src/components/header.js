import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";

const Header = () => {
  const [userId, setUserId] = useState(null);
  useEffect(() => {
    const allCookies = Cookies.get();
    //setUserId(id);
    console.warn(allCookies);
  }, []);
  return (
    <header className="bg-gray-800 py-4 px-4 sm:px-6 lg:px-8 flex items-center justify-between">
      <div className="flex items-center">
        <img src="logo.png" alt="Logo" className="h-8 mr-4" />
        <h1 className="text-white text-lg font-semibold">
          <Link to="/home" className="text-white hover:text-gray-200">
            Blog
          </Link>
        </h1>
      </div>
      <nav>
        <ul className="flex space-x-4">
          <li>
            <Link to="/home" className="text-white hover:text-gray-200">
              Home
            </Link>
          </li>
          <li>
            <Link to="/about" className="text-white hover:text-gray-200">
              About
            </Link>
          </li>
          <li>
            <Link to="/profile" className="text-white hover:text-gray-200">
              Profile
            </Link>
          </li>
          <li>
            <Link
              to="http://localhost:3000/auth/logout"
              className="text-white hover:text-gray-200"
            >
              Logout
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
