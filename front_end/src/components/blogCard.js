import React from "react";
import { Heart } from "lucide-react";
import { Link } from "react-router-dom";

const ArtCard = ({ card }) => {
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
      <div className="space-y-5 p-5">
        <div className="space-y-2">
          <div className="flex justify-between space-x-2"></div>
          <p>
            Beautifully crafted Kumari art by one of the finest artists in the
            town.
          </p>
        </div>
        {
          <div className="flex items-center space-x-5">
            <div className="h-[40px] w-[40px] rounded-full bg-slate-200"></div>
            <p>By Aayush.</p>
          </div>
        }
      </div>
    </div>
  );
};

export default ArtCard;
