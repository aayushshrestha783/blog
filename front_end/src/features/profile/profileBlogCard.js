import React, { useState } from "react";
import { HeartIcon, EyeIcon } from "../../components/Icons";
import { Link } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
const api = process.env.REACT_APP_API;

const ProfileBlogCard = ({ card, onDelete }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const token = Cookies.get("token");
  const navigate = useNavigate();
  const thumbnailSrc =
    card.thumbnail && card.thumbnail.regular
      ? card.thumbnail.regular
      : `${process.env.PUBLIC_URL}/blog.png`;

  if (!token) {
    navigate("/unauthorized");
    return;
  }
  const handleDelete = async () => {
    try {
      await axios.delete(`${api}/blog/${card._id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
      });
      onDelete(card._id); // Call the onDelete callback passed from ProfilePage
    } catch (error) {
      console.log("Error deleting blog: ", error);
    } finally {
      setIsModalOpen(false);
    }
  };

  return (
    <div className="group rounded-lg border transition-all hover:bg-blue-50 bg-gray-100 shadow-lg dark:border-gray-200 dark:hover:bg-gray-250 flex flex-col h-full">
      <img
        alt=""
        className="aspect-[3/2] w-full rounded-t-lg object-cover"
        height="200"
        src={thumbnailSrc}
        width="300"
      />
      <div className="p-4 flex-grow">
        <h3 className="text-lg font-semibold group-hover:underline line-clamp-2">
          <Link to={`/blog/${card._id}`}>{card.title}</Link>
        </h3>
      </div>
      <div className="mt-auto">
        <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 px-6">
          <div className="flex items-center gap-1">
            <EyeIcon className="h-4 w-4" />
            <span>{card.views}</span>
          </div>
          <div className="flex items-center gap-1">
            <HeartIcon className="h-4 w-4" />
            <span>{card.likes}</span>
          </div>
        </div>
        <div className="flex justify-between p-6 pt-2">
          <Link
            to={`/editBlog/${card._id}`}
            className="px-4 py-2 border border-gray-500 text-gray-500 rounded-md sm:px-2 sm:py-1"
          >
            Edit
          </Link>
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 bg-red-600 text-white rounded-md sm:px-2 sm:py-1"
          >
            Delete
          </button>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center ">
          <div className="bg-white  p-6 rounded-md shadow-md">
            <h2 className="text-lg font-semibold">
              Are you sure you want to delete this blog?
            </h2>
            <div className="flex justify-end gap-4 mt-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 border border-gray-500 text-gray-500 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-500 text-white rounded-md"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileBlogCard;
