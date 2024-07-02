// Spinner.js

import React from "react";

const Spinner = ({ className }) => (
  <svg
    className={`animate-spin -ml-1 mr-3 h-5 w-5 ${className}`}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
  >
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    ></circle>
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A8.001 8.001 0 0112 4.472v3.094a1 1 0 102 0V4.472a8.001 8.001 0 016 7.819h-3.094a1 1 0 100 2H18a8.001 8.001 0 01-7.819 6V18a1 1 0 10-2 0v3.094a8.001 8.001 0 01-7.819-6H4zm14-3.832V4.472a1 1 0 00-2 0v3.094a8.001 8.001 0 01-6 7.819v3.094a1 1 0 102 0v-3.094a8.001 8.001 0 016-7.819v-3.094a1 1 0 002 0z"
    ></path>
  </svg>
);

export default Spinner;
