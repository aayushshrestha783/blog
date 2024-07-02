import React, { useState, useEffect } from "react";
import BlogCard from "../features/blog/blogCard";
import axios from "axios";
import Cookies from "js-cookie";
import { useUserId } from "../components/AuthContext";
import { useNavigate } from "react-router-dom";
import { SearchIcon } from "../components/Icons";

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredBlogs, setFilteredBlogs] = useState([]);

  const { userID } = useUserId();
  const navigate = useNavigate();
  const token = Cookies.get("token");

  useEffect(() => {
    if (!token) {
      navigate("/unauthorized");
      return;
    }
    const fetchBlogs = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/blog/home/${userID}`,
          {
            headers: {
              Authorization: `${token}`,
            },
          }
        );
        setBlogs(response.data.blog);
        setFilteredBlogs(response.data.blog);
      } catch (error) {
        console.log("error fetching blogs: ", error);
      }
    };

    if (userID) {
      fetchBlogs();
    }
  }, [userID, token, navigate]);

  useEffect(() => {
    const filtered = blogs.filter(
      (blog) =>
        blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        blog.author.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredBlogs(filtered);
  }, [searchQuery, blogs]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="bg-gradient-to-br from-green-50 to-blue-20  py-16 px-4 sm:px-6 lg:px-8 min-h-screen flex flex-col relative">
      <div className="absolute top-4 right-4 flex items-center space-x-2">
        <div className="relative">
          <input
            type="text"
            placeholder="Filter..."
            className="p-2 rounded border border-gray-300 pr-10 shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchQuery}
            onChange={handleSearch}
          />
          <button className="absolute top-1/2 right-2 transform -translate-y-1/2">
            <SearchIcon className="w-5 h-5 text-gray-500" />
          </button>
        </div>
      </div>
      <div className="max-w-7xl mx-auto flex-grow">
        <h1 className="text-4xl sm:text-5xl font-bold mb-4 text-blue-900 text-center">
          Welcome to Talk.
        </h1>
        <p className="text-lg sm:text-xl mb-8 text-gray-700 text-center">
          Discover amazing content about various topics.
        </p>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 lg:gap-12">
          {filteredBlogs.length > 0 ? (
            filteredBlogs.map((blog) => <BlogCard key={blog._id} card={blog} />)
          ) : (
            <p className="text-lg text-gray-500 text-center col-span-3">
              No blogs available
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
