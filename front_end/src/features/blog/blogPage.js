import { Link } from "react-router-dom";
import { SearchIcon } from "../../components/Icons";
import Markdown from "react-markdown";
import { useEffect, useState } from "react";

export default function Component() {
  const [markdownContent, setMarkdownContent] = useState("");

  useEffect(() => {
    fetch("/content.md") // URL to your content.md file
      .then((response) => response.text())
      .then((text) => setMarkdownContent(text));
  }, []);

  return (
    <>
      <div className="container mx-auto grid grid-cols-1 gap-898 py-8 md:grid-cols-[3fr_1fr]">
        <main className="px-20 ">
          <article className="space-y-4 ">
            <h1 className="text-3xl font-bold">
              The Importance of Mindfulness in Daily Life
            </h1>
            <div className="text-gray-500">
              <span>By John Doe</span>
              <span className="mx-2">•</span>
              <span>May 18, 2024</span>
            </div>
            <div className="text-justify">
              <Markdown>{markdownContent}</Markdown>
            </div>
          </article>
        </main>
        <aside className="space-y-2">
          <h2 className="mb-2 text-lg font-bold">Search</h2>
          <div className="relative">
            <input
              className="w-full border border-gray-300 rounded-md px-4 py-2 shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 pr-10"
              placeholder="Search blog posts..."
              type="text"
            />
            <button
              className="absolute right-2 top-1/2 transform -translate-y-1/2"
              type="button"
            >
              <SearchIcon />
            </button>
          </div>
          <div>
            <h2 className="mb-2 text-lg font-bold">Recent Posts</h2>
            <ul className="space-y-2">
              <li>
                <Link className="hover:underline" href="#">
                  The Benefits of Meditation
                </Link>
              </li>
              <li>
                <Link className="hover:underline" href="#">
                  How to Declutter Your Home
                </Link>
              </li>
              <li>
                <Link className="hover:underline" href="#">
                  The Power of Positive Thinking
                </Link>
              </li>
              <li>
                <Link className="hover:underline" href="#">
                  5 Healthy Habits to Adopt
                </Link>
              </li>
              <li>
                <Link className="hover:underline" href="#">
                  The Importance of Self-Care
                </Link>
              </li>
            </ul>
          </div>
        </aside>
      </div>
    </>
  );
}
