import React, { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import BlogCard from "../features/blog/blogCard";
import { useUserId } from "../components/AuthContext";
import { useNavigate } from "react-router-dom";
import { SearchIcon } from "../components/Icons";
import axios from "axios";
import Cookies from "js-cookie";
import Select from "react-select";

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const { userID } = useUserId();
  const navigate = useNavigate();
  const api = process.env.REACT_APP_API;
  const [hasMore, setHasMore] = useState(true);
  const token = Cookies.get("token");
  const [page, setPage] = useState(1); // Page state for pagination

  const [allCategories, setAllCategories] = useState([
    "Back End",
    "Books",
    "Data Engineering",
    "Data Analysis",
    "Design",
    "Database",
    "Front End",
    "Literature",
    "Machine Learning",
    "Movies",
    "Philosophy",
    "Technology",
    "Web Development",
  ]);
  useEffect(() => {
    if (!token) {
      navigate("/unauthorized");
      return;
    }
    const fetchInitialBlogs = async () => {
      try {
        const response = await axios.get(`${api}/blog/home/${userID}?page=1`);
        setBlogs(response.data.blog);
        setFilteredBlogs(response.data.blog);
        setPage(2); // Next page to load
        if (response.data.blog.length < 9) {
          setHasMore(false);
        }
      } catch (error) {
        console.log("error fetching blogs: ", error);
      }
    };

    if (userID) {
      fetchInitialBlogs();
    }
  }, [userID, navigate, token]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleCategoriesChange = (selectedOptions) => {
    setCategories(
      selectedOptions ? selectedOptions.map((option) => option.value) : []
    );
  };

  return (
    <div className="bg-gradient-to-br from-green-50 to-blue-50 py-16 px-4 sm:px-6 lg:px-8 min-h-screen flex flex-col items-center">
      <div className="max-w-7xl w-full">
        <h1 className="text-4xl sm:text-5xl font-bold text-blue-900 text-center mb-8">
          Welcome to Talk.
        </h1>
        <div className="flex justify-center mb-8">
          <div className="relative w-full max-w-xl">
            <div className="relative flex items-center">
              {" "}
              {/* Added flex items-center */}
              <Select
                isMulti
                name="categories"
                options={allCategories.map((category) => ({
                  label: category,
                  value: category,
                }))}
                value={categories.map((category) => ({
                  label: category,
                  value: category,
                }))}
                onChange={handleCategoriesChange}
                closeMenuOnSelect={false}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm bg-gray-50"
              />
            </div>
          </div>
          <button className="flex items-center justify-center mt-1">
            <SearchIcon className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 lg:gap-12">
          {blogs.map((blog) => (
            <BlogCard key={blog._id} card={blog} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
