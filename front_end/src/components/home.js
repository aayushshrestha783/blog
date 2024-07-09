import React, { useState, useEffect } from "react";
import BlogCard from "../features/blog/blogCard";
import { useUserId } from "../components/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Select from "react-select";
import Pagination from "./Pagination";

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const [categories, setCategories] = useState([]);
  const { userID } = useUserId();
  const navigate = useNavigate();
  const api = process.env.REACT_APP_API;
  const [page, setPage] = useState(1); // Page state for pagination
  const [totalPages, setTotalPages] = useState(1); // Total pages state
  const [allCategories] = useState([
    "Anime",
    "Art",
    "Artist",
    "Back End",
    "Books",
    "Data Engineering",
    "Data Analysis",
    "Design",
    "Database",
    "Front End",
    "History",
    "Literature",
    "Machine Learning",
    "Movies",
    "Philosophy",
    "Science",
    "Sports",
    "Technology",
    "Travel",
    "Web Development",
    "Other",
  ]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const params = {
          page: page,
          category: JSON.stringify(categories),
        };
        const response = await axios.get(`${api}/blog/home/${userID}`, {
          params,
        });
        setBlogs(response.data.blog);
        setTotalPages(Math.ceil(response.data.totalBlogs / 9)); // Calculate total pages
      } catch (error) {
        console.log("error fetching blogs: ", error);
      }
    };

    if (userID) {
      fetchBlogs();
    }
  }, [userID, navigate, page, categories]); // Add categories to the dependency array

  const handlePageChange = (newPage) => {
    setPage(newPage);
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
                placeholder="Filter"
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
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 lg:gap-12">
          {blogs.map((blog) => (
            <BlogCard key={blog._id} card={blog} />
          ))}
        </div>
        <Pagination
          totalPages={totalPages}
          currentPage={page}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default Home;
