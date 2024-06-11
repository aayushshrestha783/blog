// ProfileBlogCard.jsx
import React from "react";
import { HeartIcon, EyeIcon } from "../../components/Icons";
import { Link } from "react-router-dom";

const ProfileBlogCard = ({ card }) => {
  return (
    <div className="group rounded-lg border transition-all hover:bg-gray-100 dark:border-gray-200 dark:hover:bg-gray-100 flex flex-col h-full">
      <img
        alt="Blog Post Image"
        className="aspect-[3/2] w-full rounded-t-lg object-cover"
        height="200"
        src={card.thumbnail.regular}
        width="300"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold group-hover:underline">
          <Link key={card.id} to={`/about`}>
            {card.title}
          </Link>
        </h3>
      </div>
      <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 px-6 ">
        <div className="flex items-center gap-1">
          <EyeIcon className="h-4 w-4" />
          <span>{card.views}</span>
        </div>
        <div className="flex items-center gap-1">
          <HeartIcon className="h-4 w-4" />
          <span>{card.likes}</span>
        </div>
      </div>
      <div className="flex justify-between p-6 pt-2 mt-auto">
        <button className="px-4 py-2 border border-gray-500 text-gray-500 rounded-md">
          <Link to={`/editBlog/${card._id}`}>Edit</Link>
        </button>
        <button className="px-4 py-2 bg-blue-500 text-white rounded-md">
          <Link to={`/blog/${card._id}`}>Read More</Link>
        </button>
      </div>
    </div>
  );
};

export default ProfileBlogCard;
