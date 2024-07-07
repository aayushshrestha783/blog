import React, { useState, useEffect } from "react";
import axios from "axios";
import { useUserId } from "../../components/AuthContext";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
const api = process.env.REACT_APP_API;
function EditUser() {
  const { userID } = useUserId();
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [occupation, setOccupation] = useState("");
  const [error, setError] = useState("");
  const token = Cookies.get("token");
  const navigate = useNavigate();
  const [successMessage, setSuccessMessage] = useState(""); // State for success message
  const [failedMessage, setFailedMessage] = useState("");

  useEffect(() => {
    if (!token) {
      navigate("/unauthorized");
      return;
    }
    if (userID) {
      const fetchUser = async () => {
        try {
          const response = await axios.get(`${api}/user/${userID}`, {
            headers: {
              Authorization: `${token}`,
            },
          });
          setName(response.data.user.name);
          setBio(response.data.user.bio || "");
          setOccupation(response.data.user.occupation || "");
        } catch (error) {
          setError("Error fetching user data");
        }
      };
      fetchUser();
    }
  }, [userID, token, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!bio || !occupation) {
      setError("Please fill in all required fields");
      return;
    }

    const formData = { bio, occupation };

    try {
      const response = await axios.put(`${api}/user/${userID}`, formData, {
        headers: {
          Authorization: `${token}`,
        },
      });

      if (response.data.success) {
        setSuccessMessage("Profile updated successfully!"); // Set success message
        setTimeout(() => {
          navigate("/profile");
        }, 1000);
      } else {
        setFailedMessage("Update failed!!");
        setError(response.data.error || "An error occurred");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="bg-gradient-to-br from-green-50 to-blue-20 min-h-screen flex flex-col items-center py-16 px-4 sm:px-6 lg:px-8 min-h-screen bg-gray-50">
      <div className="w-full max-w-2xl bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold mb-6 text-gray-900">Edit Profile</h1>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        {successMessage && (
          <div className="text-green-500">{successMessage}</div>
        )}{" "}
        {failedMessage && <div className="text-green-500">{failedMessage}</div>}{" "}
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="name"
            >
              Name
            </label>
            <input
              className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm bg-gray-50 p-2"
              id="name"
              type="text"
              value={name}
              readOnly
            />
          </div>
          <div>
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="bio"
            >
              Bio
            </label>
            <textarea
              className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm bg-gray-50 p-2"
              id="bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              rows="4"
            />
          </div>
          <div>
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="occupation"
            >
              Occupation
            </label>
            <input
              className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm bg-gray-50 p-2"
              id="occupation"
              type="text"
              value={occupation}
              onChange={(e) => setOccupation(e.target.value)}
            />
          </div>
          <div className="flex justify-end">
            <button
              className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              type="submit"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditUser;
