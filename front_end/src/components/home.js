import React, { useState, useEffect } from "react";
import BlogCard from "../features/blog/blogCard"; // Import your BlogCard component
import { Link } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import { useUserId } from "../components/AuthContext"; // Import useAuth hook

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const { setUserId } = useUserId();

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
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

      const fetchBlogs = async () => {
        try {
          setUserId(userData.id);
          const response = await axios.get(
            `http://localhost:3000/blog/home/${userData.id}`
          );
          setBlogs(response.data.blog);
        } catch (error) {
          console.log("error fetching blogs: ", error);
        }
      };
      fetchBlogs();
    } else {
      console.warn("No token found");
    }
  }, []);
  return (
    <div className="bg-gray-900 text-white py-16 px-4 sm:px-6 lg:px-8 min-h-screen flex flex-col">
      <div className="max-w-7xl mx-auto flex-grow">
        <h1 className="text-4xl sm:text-5xl font-bold mb-4">
          Welcome to My Blog
        </h1>
        <p className="text-lg sm:text-xl mb-8">
          Discover amazing content about various topics.
        </p>
        <div className="container grid gap-8 px-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-12">
          {blogs &&
            blogs.map((blog) => <BlogCard key={blog._id} card={blog} />)}
        </div>
      </div>
    </div>
  );
};

export default Home;
