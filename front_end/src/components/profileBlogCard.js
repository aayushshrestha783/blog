// ProfileBlogCard.jsx
import React from "react";
import { HeartIcon, EyeIcon } from "./Icons";

const ProfileBlogCard = ({ card }) => {
  return (
    <div className="group rounded-lg border transition-all hover:bg-gray-100 dark:border-gray-200 dark:hover:bg-gray-100">
      <div className="card">
        <div className="p-6">
          <div className="card-content space-y-2">
            <h3 className="text-lg font-semibold">{card.title}</h3>
            <p className="text-gray-500 dark:text-gray-400 line-clamp-2">
              {card.description}
            </p>
            <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
              <div className="flex items-center gap-2">
                <EyeIcon className="h-4 w-4" />
                <span>{card.views}</span>
              </div>
              <div className="flex items-center gap-2">
                <HeartIcon className="h-4 w-4" />
                <span>{card.likes}</span>
              </div>
            </div>
          </div>

          <div className="card-footer">
            <div className="flex items-center justify-between">
              <button className="px-4 py-2 border border-gray-500 text-gray-500 rounded-md">
                Edit
              </button>
              <button className="px-4 py-2 bg-blue-500 text-white rounded-md">
                Read More
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileBlogCard;
