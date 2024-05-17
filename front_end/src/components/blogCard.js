import React from "react";
import LikeButton from "./likeButton";

import { Heart } from "lucide-react";
import { Link } from "react-router-dom";

const BlogCard = ({ card }) => {
  return (
    <div className="translate-y-0 overflow-hidden rounded-xl border bg-white transition-all hover:-translate-y-2">
      {/* Image Container */}
      <div className="h-[200px] w-full bg-slate-100">
        <img
          src={card.urls.regular}
          alt={card.id}
          className="h-[100%] w-[100%] object-cover"
        />
      </div>

      {/* Details Container */}
      <div className="space-y-4 p-1">
        <div className="space-y-2">
          <div className="flex item-center space-x-5">
            <LikeButton />
            <p className="text-blue-500">300 likes</p>
          </div>
        </div>

        <div className="flex items-baseline space-x-5">
          <p className="text-blue-500">By Aayush.</p>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
