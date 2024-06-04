import React, { useState, useEffect } from "react";
import BlogCard from "../features/blog/blogCard"; // Import your BlogCard component
import { Link } from "react-router-dom";
import axios from "axios";

const Home = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get("http://localhost:3000/blog");
        setBlogs(response.data.blog);
      } catch (error) {
        console.log("error fetching blogs: ", error);
      }
    };
    fetchBlogs();
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
