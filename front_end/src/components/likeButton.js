// LikeButton.js
import React, { useState } from "react";
import { FaHeart } from "react-icons/fa";
import axios from "axios";
import { useUserId } from "../components/AuthContext";
import { useMutation, useQueryClient } from "react-query";

const api = process.env.REACT_APP_API;

function LikeButton({ isLiked, blogID }) {
  const { userID } = useUserId();
  const [liked, setLiked] = useState(isLiked);
  const queryClient = useQueryClient();

  const mutation = useMutation(
    () =>
      axios.post(
        `${api}/blog/${blogID}/${userID}`,
        {},
        { withCredentials: true }
      ),
    {
      onMutate: () => {
        setLiked(!liked);
      },
      onError: (error, variables, context) => {
        console.error("Error liking blog: ", error);
        setLiked(liked); // Revert back to previous state if there's an error
      },
      onSettled: () => {
        queryClient.invalidateQueries(["blog", blogID]);
      },
    }
  );

  const handleClick = () => {
    mutation.mutate();
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
