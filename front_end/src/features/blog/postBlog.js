import React, { useState } from "react";
import axios from "axios";
import { useUserId } from "../../components/AuthContext";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
const api = process.env.REACT_APP_API;

function PostBlog() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [markdownFile, setMarkdownFile] = useState(null);
  const [thumbnailMessage, setThumbnailMessage] = useState("");
  const [markdownMessage, setMarkdownMessage] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [failedMessage, setFailedMessage] = useState("");

  const { userID } = useUserId();
  const token = Cookies.get("token");
  const navigate = useNavigate();

  if (!token) {
    navigate("/unauthorized");
    return;
  }

  const handleThumbnailChange = (e) => {
    setThumbnail(e.target.files[0]);
    setThumbnailMessage(`${e.target.files[0].name} uploaded successfully`);
  };

  const handleMarkdownFileChange = (e) => {
    setMarkdownFile(e.target.files[0]);
    setMarkdownMessage(`${e.target.files[0].name} uploaded successfully`);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || (!content && !markdownFile)) {
      setError("Please fill in all required fields");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("thumbnail", thumbnail);
    formData.append("content", content);
    formData.append("author", userID);
    if (markdownFile) {
      formData.append("markdownFile", markdownFile);
    }

    const response = await axios.post(`${api}/blog`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `${token}`,
      },
    });

    if (response.data.success) {
      setSuccessMessage("Blog posted successfully!"); // Set success message
    } else {
      setFailedMessage("Post failed!!");
      setError(response.data.error || "An error occurred");
    }
  };

  return (
    <div className="bg-gradient-to-br from-green-50 to-blue-20 min-h-screen ">
      <div className="flex flex-col items-center py-16 px-4 sm:px-6 lg:px-8 min-h-screen">
        <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold mb-6 text-gray-900">
            Create New Blog Post
          </h1>
          {error && <div className="text-red-500">{error}</div>}
          {successMessage && (
            <div className="text-green-500">{successMessage}</div>
          )}{" "}
          {failedMessage && (
            <div className="text-green-500">{failedMessage}</div>
          )}{" "}
          {/* Display success message */}
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="title"
              >
                Title
              </label>
              <input
                className="mt-1 block w-full h-8 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm bg-gray-50 pl-2"
                id="title"
                placeholder="Enter a title for your blog post"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div>
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="file"
              >
                Thumbnail
              </label>
              <div className="mt-1 flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6 bg-gray-50">
                <div className="space-y-1 text-center">
                  <svg
                    aria-hidden="true"
                    className="mx-auto h-12 w-12 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 48 48"
                  >
                    <path
                      d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                    />
                  </svg>
                  <div className="flex text-sm text-gray-600">
                    <label
                      className="relative cursor-pointer rounded-md bg-white font-medium text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500"
                      htmlFor="file"
                    >
                      <span>Upload a thumbnail picture</span>
                      <input
                        className="sr-only"
                        id="file"
                        name="file"
                        type="file"
                        onChange={handleThumbnailChange}
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500">.png up to 1Mb</p>
                  {thumbnailMessage && (
                    <p className="text-green-500 mt-2">{thumbnailMessage}</p>
                  )}
                </div>
              </div>
            </div>
            <div>
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="content"
              >
                Content
              </label>
              <textarea
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm bg-gray-50 pl-2"
                id="content"
                placeholder="Write your blog post content here"
                rows={10}
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </div>
            <div>
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="markdownFile"
              >
                Or, upload a Markdown File
              </label>
              <div className="mt-1 flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6 bg-gray-50">
                <div className="space-y-1 text-center">
                  <svg
                    aria-hidden="true"
                    className="mx-auto h-12 w-12 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 48 48"
                  >
                    <path
                      d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                    />
                  </svg>
                  <div className="flex text-sm text-gray-600">
                    <label
                      className="relative cursor-pointer rounded-md bg-white font-medium text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500"
                      htmlFor="markdownFile"
                    >
                      <span>Upload a file</span>
                      <input
                        className="sr-only"
                        id="markdownFile"
                        name="markdownFile"
                        type="file"
                        onChange={handleMarkdownFileChange}
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500">.md files up to 10MB</p>
                  {markdownMessage && (
                    <p className="text-green-500 mt-2">{markdownMessage}</p>
                  )}
                </div>
              </div>
            </div>
            <div className="flex justify-end">
              <button
                className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                type="submit"
              >
                Publish
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default PostBlog;
