import React, { useState } from "react";
import { FaRegHeart, FaHeart } from "react-icons/fa6";

function LikeButton() {
  const [liked, setLiked] = useState(false);

  const handleClick = () => {
    setLiked(!liked);
  };

  return (
    <div onClick={handleClick} style={{ cursor: "pointer" }}>
      {liked ? (
        <FaHeart color="red" size="50" />
      ) : (
        <FaRegHeart color="grey" size="50" />
      )}
    </div>
  );
}
export default LikeButton;
