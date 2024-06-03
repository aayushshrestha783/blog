import { Link, useParams } from "react-router-dom";
import { SearchIcon } from "../../components/Icons";
import Markdown from "react-markdown";
import { useEffect, useState } from "react";
import axios from "axios";
import { formatDate } from "../../components/DateFormatter";

export default function Component() {
  const { blogId } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/blog/${blogId}`
        );
        console.warn(response.data.blog.content);
        setBlog(response.data.blog);
      } catch (error) {
        console.log("error fetching blogs: ", error);
      }
    };
    fetchContent();
  }, [blogId]);

  if (!blog) {
    return <div>Loading...</div>; // Show loading state while fetching data
  }

  const formatedDate = formatDate(blog.creationDate);

  return (
    <>
      <div className="container mx-auto grid grid-cols-1 gap-898 py-8 md:grid-cols-[3fr_1fr]">
        <main className="px-20 ">
          <article className="space-y-4 ">
            <h1 className="text-3xl font-bold">
              The Importance of Mindfulness in Daily Life
            </h1>
            <div className="text-gray-500">
              {blog.author ? (
                <>
                  <span>By {blog.author.name}</span>
                  <span className="mx-2">•</span>
                  <span>{formatedDate}</span>
                </>
              ) : (
                <span>Author information is not available</span>
              )}
            </div>
            <div className="text-justify">
              <Markdown>{blog.content}</Markdown>
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
                <Link className="hover:underline" to="#">
                  The Benefits of Meditation
                </Link>
              </li>
              <li>
                <Link className="hover:underline" to="#">
                  How to Declutter Your Home
                </Link>
              </li>
              <li>
                <Link className="hover:underline" to="#">
                  The Power of Positive Thinking
                </Link>
              </li>
              <li>
                <Link className="hover:underline" to="#">
                  5 Healthy Habits to Adopt
                </Link>
              </li>
              <li>
                <Link className="hover:underline" to="#">
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
