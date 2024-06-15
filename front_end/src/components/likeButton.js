import React, { useState } from "react";
import { FaHeart } from "react-icons/fa";
import axios from "axios";
import { useUserId } from "../components/AuthContext";

function LikeButton({ isLiked, blogID }) {
  const { userID } = useUserId();
  const [liked, setLiked] = useState(isLiked);

  const handleClick = async () => {
    try {
      await axios.post(
        `http://localhost:3000/blog/${blogID}/${userID}`,
        {},
        { withCredentials: true }
      );
      setLiked(!liked);
    } catch (error) {
      console.error("Error liking blog: ", error);
    }
  };

  return (
    <div onClick={handleClick} style={{ cursor: "pointer" }}>
      <FaHeart
        style={{
          width: "24px",
          height: "24px",
          color: liked ? "red" : "#dcdcdc",
        }}
      />
    </div>
  );
}

export default LikeButton;
