import React from "react";
import LikeButton from "../../components/likeButton";
import { EyeIcon } from "../../components/Icons";
import { Link } from "react-router-dom";

const BlogCard = ({ card }) => {
  const thumbnailSrc =
    card.thumbnail && card.thumbnail.regular
      ? card.thumbnail.regular
      : `${process.env.PUBLIC_URL}/blog.png`;

  const avatarSrc =
    card.authorAvatar || `${process.env.PUBLIC_URL}/author_avatar.png`;
  return (
    <div className="group rounded-lg border transition-all hover:bg-blue-50 bg-gray-100 shadow-lg dark:border-gray-200 dark:hover:bg-gray-250">
      <img
        alt=""
        className="aspect-[3/2] w-full rounded-t-lg object-cover"
        height="200"
        src={thumbnailSrc}
        width="300"
        loading="lazy"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold group-hover:underline truncate">
          <Link to={`/blog/${card._id}`}>{card.title}</Link>
        </h3>
        <div className="mt-2 flex items-center text-sm text-gray-500 dark:text-gray-400">
          <div className="flex items-center mr-2">
            <img
              alt="Author Avatar"
              className="h-6 w-6 rounded-full"
              height={24}
              src={avatarSrc}
              style={{
                aspectRatio: "24/24",
                objectFit: "cover",
              }}
              width={24}
              loading="lazy"
            />
          </div>
          <Link
            to={`/blog/author/${card.author._id}`}
            className="hover:font-bold transition-all duration-200 whitespace-nowrap"
          >
            {card.author.name}
          </Link>
        </div>
        <div className="mt-4 flex items-center space-x-4 text-sm text-gray-800 dark:text-gray-400">
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
