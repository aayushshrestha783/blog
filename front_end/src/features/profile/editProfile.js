import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";

function EditUser() {
  const [userId, setUserId] = useState("");
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [occupation, setOccupation] = useState("");
  const [error, setError] = useState("");

  // Effect to decode the token and set the user ID
  useEffect(() => {
    try {
      const token = Cookies.get("token");
      if (token) {
        const base64Url = token.split(".")[1];
        const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
        const jsonPayload = decodeURIComponent(
          atob(base64)
            .split("")
            .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
            .join("")
        );

        const userData = JSON.parse(jsonPayload);
        setUserId(userData.id); // Ensure this matches the key used in the payload
        console.warn(userData);
      }
    } catch (err) {
      setError(err.message);
      console.log(err);
    }
  }, []); // Empty dependency array ensures this runs only once

  // Effect to fetch user data once user ID is set
  useEffect(() => {
    if (userId) {
      console.log("Fetching user data with ID: ", userId);
      const fetchUser = async () => {
        try {
          const response = await axios.get(
            `http://localhost:3000/user/${userId}`
          );
          console.warn("API response: ", response.data.user);
          setName(response.data.user.name);
          setBio(response.data.user.bio || "");
          setOccupation(response.data.user.occupation || "");
        } catch (error) {
          console.log("Error fetching user: ", error);
          setError("Error fetching user data");
        }
      };
      fetchUser();
    }
  }, [userId]); // Dependency on userId

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!bio || !occupation) {
      setError("Please fill in all required fields");
      return;
    }

    const formData = { bio, occupation };

    try {
      const response = await axios.put(
        `http://localhost:3000/user/${userId}`,
        formData
      );

      if (response.data.success) {
        console.log("User post updated successfully");
      } else {
        setError(response.data.error || "An error occurred");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex flex-col items-center py-16 px-4 sm:px-6 lg:px-8 min-h-screen">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold mb-6 text-gray-900">Edit Profile</h1>
        {error && <div className="text-red-500">{error}</div>}
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="name"
            >
              Name
            </label>
            <input
              className="mt-1 block w-full h-8 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm bg-gray-50 pl-2"
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
            <input
              className="mt-1 block w-full h-8 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm bg-gray-50 pl-2"
              id="bio"
              type="text"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
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
              className="mt-1 block w-full h-8 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm bg-gray-50 pl-2"
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
