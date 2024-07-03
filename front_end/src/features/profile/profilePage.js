import React, { useState, useEffect } from "react";
import ProfileBlogCard from "./profileBlogCard"; // Import your ProfileBlogCard component
import { TwitterIcon, LinkedinIcon, GithubIcon } from "../../components/Icons"; // Import icons
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
import { useUserId } from "../../components/AuthContext";
const api = process.env.REACT_APP_API;

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const { userID } = useUserId();
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
          const userResponse = await axios.get(`${api}/user/${userID}`, {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `${token}`,
            },
          });
          setUser(userResponse.data.user);
          const response = await axios.get(`${api}/blog/userPost/${userID}`, {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `${token}`,
            },
          });
          setBlogs(response.data.blog);
        } catch (error) {
          console.log("error fetching blogs: ", error);
        }
      };

      fetchBlogs();
    }
  }, [userID]);

  const handleDelete = (deletedBlogId) => {
    setBlogs(blogs.filter((blog) => blog._id !== deletedBlogId));
  };

  return (
    <div className="bg-gradient-to-br from-green-50 to-blue-50 min-h-screen ">
      <div className="container mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-16">
          {/* Profile Section */}
          <div className="space-y-8">
            <div className="flex items-center gap-4">
              <img
                className="h-20 w-20 rounded-full object-cover"
                src={user?.avatar || "/default-avatar.png"}
                alt="User Avatar"
              />
              <div className="space-y-1">
                <h2 className="text-2xl font-bold text-gray-900">
                  {user ? user.name : "Loading..."}
                </h2>
                <p className="text-gray-500">
                  {user ? user.occupation : "Loading..."}
                </p>
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">About</h3>
              <p className="text-gray-500">{user ? user.bio : "Loading..."}</p>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Social</h3>
              <div className="flex items-center gap-4">
                <a href="#" className="text-gray-500 hover:text-gray-900">
                  <TwitterIcon className="h-5 w-5" />
                </a>
                <a href="#" className="text-gray-500 hover:text-gray-900">
                  <LinkedinIcon className="h-5 w-5" />
                </a>
                <a href="#" className="text-gray-500 hover:text-gray-900">
                  <GithubIcon className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
          {/* Blog Posts Section */}
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">
                My Blog Posts
              </h2>
              <div className="flex items-center gap-4">
                <Link to="/postBlog">
                  <button className="px-4 py-2 bg-blue-500 text-white rounded-md shadow hover:bg-blue-600">
                    Post Blog
                  </button>
                </Link>
                <Link to="/editUser">
                  <button className="px-4 py-2 border border-blue-500 text-blue-500 rounded-md shadow hover:bg-blue-100">
                    Edit Profile
                  </button>
                </Link>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogs.map((blog) => (
                <ProfileBlogCard
                  key={blog._id}
                  card={blog}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
