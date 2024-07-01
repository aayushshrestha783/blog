import React, { useState, useEffect } from "react";
import BlogCard from "../features/blog/blogCard"; // Import your BlogCard component
import axios from "axios";
import Cookies from "js-cookie";
import { useUserId } from "../components/AuthContext"; // Import useAuth hook
import { useNavigate } from "react-router-dom";
import { SearchIcon } from "../components/Icons";

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const [searchType, setSearchType] = useState("blogs");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

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
      } catch (error) {
        console.log("error fetching blogs: ", error);
      }
    };

    if (userID) {
      fetchBlogs();
    }
  }, [userID]);

  const handleSearchTypeChange = (e) => {
    setSearchType(e.target.value);
    setCurrentPage(1); // Reset to first page on new search
  };
  return (
    <div className="bg-lightslategray py-16 px-4 sm:px-6 lg:px-8 min-h-screen flex flex-col relative">
      <div className="absolute top-4 right-4 flex items-center space-x-2">
        <div className="relative">
          <input
            type="text"
            placeholder="Search..."
            className="p-2 rounded border border-gray-300 pr-10"
          />
          <button className="absolute top-1/2 right-2 transform -translate-y-1/2">
            <SearchIcon className="w-5 h-5 text-gray-500" />
          </button>
        </div>
      </div>
      <div className="max-w-7xl mx-auto flex-grow">
        <h1 className="text-4xl sm:text-5xl font-bold mb-4">
          Welcome to Talk.
        </h1>
        <p className="text-lg sm:text-xl mb-8">
          Discover amazing content about various topics.
        </p>

        <div className="container grid gap-8 px-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-12">
          {blogs.length > 0 ? (
            blogs.map((blog) => <BlogCard key={blog._id} card={blog} />)
          ) : (
            <p className="text-center text-lg">No blogs available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
