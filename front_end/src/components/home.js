import React, { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import BlogCard from "../features/blog/blogCard";
import { useUserId } from "../components/AuthContext";
import { useNavigate } from "react-router-dom";
import { SearchIcon } from "../components/Icons";
import axios from "axios";
import Cookies from "js-cookie";

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const { userID } = useUserId();
  const navigate = useNavigate();
  const api = process.env.REACT_APP_API;
  const [hasMore, setHasMore] = useState(true); // Manage whether more blogs are available to load
  const token = Cookies.get("token");

  useEffect(() => {
    if (!token) {
      navigate("/unauthorized");
      return;
    }
    const fetchBlogs = async () => {
      try {
        const response = await axios.get(`${api}/blog/home/${userID}`);
        setBlogs(response.data.blog);
        setFilteredBlogs(response.data.blog);
        // Check if there are more blogs to load initially
        if (response.data.blog.length === 0) {
          setHasMore(false);
        }
      } catch (error) {
        console.log("error fetching blogs: ", error);
      }
    };

    if (userID) {
      fetchBlogs();
    }
  }, [userID, navigate, token]);

  useEffect(() => {
    const filtered = blogs.filter(
      (blog) =>
        blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        blog.author.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredBlogs(filtered);
    // Update hasMore based on filtered blogs length
    setHasMore(filtered.length < blogs.length);
  }, [searchQuery, blogs]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const fetchMoreBlogs = async () => {
    try {
      const response = await axios.get(
        `${api}/blog/home/${userID}?start=${filteredBlogs.length}&limit=10`
      );
      setBlogs([...blogs, ...response.data.blog]);
      setFilteredBlogs([...filteredBlogs, ...response.data.blog]);
      // Check if there are more blogs to load
      if (response.data.blog.length === 0) {
        setHasMore(false);
      }
    } catch (error) {
      console.log("error fetching more blogs: ", error);
    }
  };

  return (
    <div className="bg-gradient-to-br from-green-50 to-blue-50 py-16 px-4 sm:px-6 lg:px-8 min-h-screen flex flex-col items-center">
      <div className="max-w-7xl w-full">
        <h1 className="text-4xl sm:text-5xl font-bold text-blue-900 text-center mb-8">
          Welcome to Talk.
        </h1>
        <div className="flex justify-center mb-8">
          <div className="relative w-full max-w-xl">
            <input
              type="text"
              placeholder="Filter..."
              className="w-full p-2 rounded-full border border-gray-300 pr-10 shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchQuery}
              onChange={handleSearch}
            />
            <button className="absolute top-1/2 right-3 transform -translate-y-1/2">
              <SearchIcon className="w-5 h-5 text-gray-500" />
            </button>
          </div>
        </div>
        <InfiniteScroll
          dataLength={filteredBlogs.length}
          next={fetchMoreBlogs}
          hasMore={hasMore} // Pass hasMore state to manage when to stop loading more blogs
          loader={<h4>Loading...</h4>}
        >
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 lg:gap-12">
            {filteredBlogs.map((blog) => (
              <BlogCard key={blog._id} card={blog} />
            ))}
          </div>
        </InfiniteScroll>
      </div>
    </div>
  );
};

export default Home;
