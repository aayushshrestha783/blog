import React from "react";

const ToggleSwitch = ({ isMarkdownMode, onToggle }) => {
  return (
    <div className="flex items-center justify-end">
      <button
        onClick={onToggle}
        className={`px-2 rounded-md ${
          isMarkdownMode
            ? "bg-indigo-600 text-white"
            : "bg-gray-200 text-gray-700"
        }`}
      >
        Markdown
      </button>
      <button
        onClick={onToggle}
        className={`px-2 rounded-md ${
          !isMarkdownMode
            ? "bg-indigo-600 text-white"
            : "bg-gray-200 text-gray-700"
        }`}
      >
        Preview
      </button>
    </div>
  );
};

export default ToggleSwitch;
