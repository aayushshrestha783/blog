import React from "react";
import ArtCard from "./blogCard"; // Import your ArtCard component

const cardData = [
  {
    id: 1,
    urls: {
      regular:
        "https://cdn.pixabay.com/photo/2012/07/26/20/55/barrels-52934_1280.jpg",
    },
    user: { first_name: "Artist1" },
  },
  {
    id: 2,
    urls: {
      regular:
        "https://cdn.pixabay.com/photo/2012/07/26/20/55/barrels-52934_1280.jpg",
    },
    user: { first_name: "Artist2" },
  },
  {
    id: 3,
    urls: {
      regular:
        "https://cdn.pixabay.com/photo/2012/07/26/20/55/barrels-52934_1280.jpg",
    },
    user: { first_name: "Artist3" },
  },
  // Add more card data as needed
];

const Hero = () => {
  return (
    <div className="bg-gray-900 text-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl sm:text-5xl font-bold mb-4">
          Welcome to My Blog
        </h1>
        <p className="text-lg sm:text-xl mb-8">
          Discover amazing content about various topics.
        </p>
        {/* Render ArtCard components here */}
        <div className="flex flex-wrap justify-center gap-8">
          {cardData.map((card) => (
            <ArtCard key={card.id} card={card} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Hero;
