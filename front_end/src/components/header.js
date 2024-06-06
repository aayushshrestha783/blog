import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";

const Header = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      try {
        const base64Url = token.split(".")[1];
        const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
        const jsonPayload = decodeURIComponent(
          atob(base64)
            .split("")
            .map(function (c) {
              return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
            })
            .join("")
        );

        const userData = JSON.parse(jsonPayload);
        setUser(userData);
        console.warn("User data:", userData); // Debugging line
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    } else {
      console.warn("No token found");
    }
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
            <Link
              to={`/profile/${user.id}`}
              className="text-white hover:text-gray-200"
            >
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
