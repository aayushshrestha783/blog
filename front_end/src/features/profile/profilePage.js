import React from "react";
import ProfileBlogCard from "./profileBlogCard"; // Import your ProfileBlogCard component
import { TwitterIcon, LinkedinIcon, GithubIcon } from "../../components/Icons"; // Import icons
import { Link } from "react-router-dom";

const ProfilePage = () => {
  const cardData = [
    {
      id: 1,
      title: "Mastering React Hooks: A Comprehensive Guide",
      description: "Learn how to use React Hooks in your projects.",
      views: 1200,
      likes: 300,
    },
    {
      id: 2,
      title: "Unleashing the Power of CSS Grid: A Step-by-Step Guide",
      description: "A detailed guide on using CSS Grid.",
      views: 900,
      likes: 250,
    },
    {
      id: 3,
      title: "Optimizing Website Performance: Techniques and Best Practices",
      description: "Tips and tricks for optimizing your website.",
      views: 1500,
      likes: 400,
    },
    // Add more card data as needed
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-8 max-w-6xl mx-auto px-4 py-8 md:py-12">
      {/* Profile Section */}
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <div className="h-20 w-20 rounded-full bg-gray-300"></div>
          <div className="space-y-1">
            <h2 className="text-2xl font-bold">John Doe</h2>
            <p className="text-gray-500 dark:text-gray-400">
              Software Engineer, Tech Blogger
            </p>
          </div>
        </div>
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">About</h3>
          <p className="text-gray-500 dark:text-gray-400">
            John Doe is a passionate software engineer and tech blogger. He has
            been writing about the latest trends and technologies in the
            industry for the past 5 years. His blog posts are known for their
            in-depth analysis and practical insights.
          </p>
        </div>
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Social</h3>
          <div className="flex items-center gap-4">
            <a
              href="#"
              className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
            >
              <TwitterIcon className="h-5 w-5" />
            </a>
            <a
              href="#"
              className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
            >
              <LinkedinIcon className="h-5 w-5" />
            </a>
            <a
              href="#"
              className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
            >
              <GithubIcon className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
      {/* Blog Posts Section */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">My Blog Posts</h2>
          <div className="flex items-center gap-2">
            <button className="px-4 py-2 bg-blue-500 text-white rounded-md">
              <Link to={`/postBlog`}>Post Blog</Link>
            </button>
            <button className="px-4 py-2 border border-blue-500 text-blue-500 rounded-md">
              Edit Profile
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {cardData.map((card) => (
            <ProfileBlogCard key={card.id} card={card} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
