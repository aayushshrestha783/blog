import React from "react";
import LikeButton from "../../components/likeButton";
import { EyeIcon } from "../../components//Icons"; // Assume you have these icons in a separate file
import { Link } from "react-router-dom";
import { formatDate } from "../../components/DateFormatter";

const BlogCard = ({ card }) => {
  const formatedDate = formatDate(card.creationDate);
  return (
    <div className="group rounded-lg border transition-all hover:bg-gray-100 dark:border-gray-800 dark:hover:bg-gray-800">
      <img
        alt=""
        className="aspect-[3/2] w-full rounded-t-lg object-cover"
        height="200"
        src={card.thumbnail.regular}
        width="300"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold group-hover:underline">
          <Link to={`/blog/${card._id}`}>{card.title}</Link>
        </h3>
        <div className="mt-2 flex items-center text-sm text-gray-500 dark:text-gray-400">
          <div className="flex items-center">
            <img
              alt="Author Avatar"
              className="mr-2 h-6 w-6 rounded-full"
              height={24}
              src={card.authorAvatar}
              style={{
                aspectRatio: "24/24",
                objectFit: "cover",
              }}
              width={24}
            />
            <span>{card.author.name}</span>
          </div>
          <span className="mx-2">•</span>
          <span>{formatedDate}</span>
        </div>
        <div className="mt-4 flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
          <div className="flex items-center space-x-1">
            <LikeButton
              isLiked={card.isLiked}
              blogID={card._id}
              className="mr-1 h-5 w-5"
            />
            <span>{card.likes}</span>
          </div>
          <div className="flex items-center">
            <EyeIcon className="mr-1 h-5 w-5" />
            <span>{card.views}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
