import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";

const Header = () => {
  const api = process.env.REACT_APP_API;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const token = Cookies.get("token");
  const navigate = useNavigate();

  const handleLogOut = async () => {
    console.warn("inside logout");
    try {
      const response = await axios.get(`${api}/auth/logout`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
      });
      console.warn(response);

      if (response.data.success) {
        Cookies.remove("token");
        navigate("/");
      }
    } catch (error) {
      console.warn("Error while Logout: ", error);
    } finally {
      setIsModalOpen(false);
    }
  };

  return (
    <header className="bg-gray-800 py-4 px-4 sm:px-6 lg:px-8 flex items-center justify-between">
      <div className="flex items-center">
        <Link to="/home" className="text-white hover:text-gray-200">
          <img
            src={`${process.env.PUBLIC_URL}/Talk_logo_1.png`} // Use absolute path
            alt="Logo"
            className="h-custom sm:h-10 md:h-14 object-cover mr-4"
          />
        </Link>
      </div>
      <nav>
        <ul className="flex space-x-4">
          <li>
            <Link to="/home" className="text-white hover:text-gray-200">
              Home
            </Link>
          </li>
          <li>
            <Link to="#" className="text-white hover:text-gray-200">
              About
            </Link>
          </li>
          <li>
            <Link to={"/profile"} className="text-white hover:text-gray-200">
              Profile
            </Link>
          </li>
          <li>
            <button
              onClick={() => setIsModalOpen(true)}
              className="text-white hover:text-gray-200"
            >
              Logout
            </button>

            {isModalOpen && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                <div className="bg-white p-6 rounded-md shadow-md">
                  <h2 className="text-lg font-semibold">
                    Are you sure you want to logout?
                  </h2>
                  <div className="flex justify-end gap-4 mt-4">
                    <button
                      onClick={() => setIsModalOpen(false)}
                      className="px-4 py-2 border border-gray-500 text-gray-500 rounded-md"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleLogOut}
                      className="px-4 py-2 bg-red-500 text-white rounded-md"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
