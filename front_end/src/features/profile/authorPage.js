import React, { useState, useEffect } from "react";
import BlogCard from "../blog/blogCard"; // Import your ProfileBlogCard component
import { TwitterIcon, LinkedinIcon, GithubIcon } from "../../components/Icons"; // Import icons
import { useNavigate, useParams } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
import { useUserId } from "../../components/AuthContext";
const api = process.env.REACT_APP_API;

const AuthorPage = () => {
  const [user, setUser] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const { userID } = useUserId();
  const { authorId } = useParams();
  const token = Cookies.get("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/unauthorized");
      return;
    }
    if (userID) {
      const fetchBlogs = async () => {
        try {
          const userResponse = await axios.get(
            `${api}/user/${authorId}`,

            {
              headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `${token}`,
              },
            }
          );
          setUser(userResponse.data.user);
          const response = await axios.get(
            `${api}/blog/userPost/${authorId}/${userID}`,

            {
              headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `${token}`,
              },
            }
          );
          setBlogs(response.data.blog);
        } catch (error) {
          console.log("error fetching blogs: ", error);
        }
      };

      fetchBlogs();
    }
  }, [userID, token, navigate, authorId]);

  return (
    <div className="bg-gradient-to-br from-green-50 to-blue-20 min-h-screen ">
      <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-8 max-w-6xl mx-auto px-4 py-8 md:py-12">
        {/* Profile Section */}
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <div className="h-20 w-20 rounded-full bg-gray-300"></div>
            <div className="space-y-1">
              <h2 className="text-2xl font-bold">
                {user ? user.name : "Loading..."}
              </h2>
              <p className="text-gray-500 dark:text-gray-400">
                {user ? user.occupation : "Loading..."}
              </p>
            </div>
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">About</h3>
            <p className="text-gray-500 dark:text-gray-400">
              {user ? user.bio : "Loading..."}{" "}
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Social</h3>
            <div className="flex items-center gap-4">
              <a
                href="#"
                className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
              >
                <TwitterIcon className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
              >
                <LinkedinIcon className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
              >
                <GithubIcon className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
        {/* Blog Posts Section */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Blog Posts</h2>
          </div>
          <div className="container grid gap-8 px-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-12">
            {blogs.length > 0 ? (
              blogs.map((blog) => <BlogCard key={blog._id} card={blog} />)
            ) : (
              <p className="text-center text-lg">No blogs available</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthorPage;
