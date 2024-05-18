import React, { useState } from "react";
import { FaHeart } from "react-icons/fa";

function LikeButton() {
  const [liked, setLiked] = useState(false);

  const handleClick = () => {
    setLiked(!liked);
  };

  return (
    <div onClick={handleClick} style={{ cursor: "pointer" }}>
      <FaHeart
        style={{
          width: "24px",
          height: "24px",
          color: liked ? "red" : "gray", // Both border and fill color are red when liked
        }}
      />
    </div>
  );
}

export default LikeButton;
