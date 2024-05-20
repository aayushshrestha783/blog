import React from "react";
import BlogCard from "./blogCard"; // Import your BlogCard component
import { Link } from "react-router-dom";

const cardData = [
  {
    id: 1,
    urls: {
      regular:
        "https://cdn.pixabay.com/photo/2012/07/26/20/55/barrels-52934_1280.jpg",
    },
    title: "Mastering React Hooks: A Comprehensive Guide",
    author: "John Doe",
    authorAvatar: "/placeholder.svg", // Add proper image URL
    date: "May 18, 2024",
    likes: 120,
    views: 2300,
  },
  {
    id: 2,
    urls: {
      regular:
        "https://cdn.pixabay.com/photo/2012/07/26/20/55/barrels-52934_1280.jpg",
    },
    title: "Unleashing the Power of CSS Grid: A Step-by-Step Guide",
    author: "Jane Smith",
    authorAvatar: "/placeholder.svg",
    date: "May 18, 2024",
    likes: 80,
    views: 1700,
  },
  {
    id: 3,
    urls: {
      regular:
        "https://cdn.pixabay.com/photo/2012/07/26/20/55/barrels-52934_1280.jpg",
    },
    title: "Optimizing Website Performance: Techniques and Best Practices",
    author: "Sarah Lee",
    authorAvatar: "/placeholder.svg",
    date: "May 18, 2024",
    likes: 100,
    views: 2100,
  },
  // Add more card data as needed
];

const Hero = () => {
  return (
    <div className="bg-gray-900 text-white py-16 px-4 sm:px-6 lg:px-8 min-h-screen flex flex-col">
      <div className="max-w-7xl mx-auto flex-grow">
        <h1 className="text-4xl sm:text-5xl font-bold mb-4">
          Welcome to My Blog
        </h1>
        <p className="text-lg sm:text-xl mb-8">
          Discover amazing content about various topics.
        </p>
        <div className="container grid gap-8 px-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-12">
          {cardData.map((card) => (
            <Link key={card.id} to={`/about`}>
              <BlogCard card={card} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Hero;
