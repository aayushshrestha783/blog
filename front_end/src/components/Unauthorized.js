// NotFound.js
import React from "react";
import { Link } from "react-router-dom";

function Unauthorized({ message, linkText, linkTo }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-4">{message}</h1>
      <p className="text-lg mb-8">
        Sorry, the page you are looking for does not exist.
      </p>
      <Link
        to={linkTo}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        {linkText}
      </Link>
    </div>
  );
}

export default Unauthorized;
