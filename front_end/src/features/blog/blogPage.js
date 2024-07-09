import { Link, useParams } from "react-router-dom";
import { SearchIcon } from "../../components/Icons";
import Markdown from "react-markdown";
import { useEffect, useState } from "react";
import axios from "axios";
import { formatDate } from "../../components/DateFormatter";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
const api = process.env.REACT_APP_API;

export default function Component() {
  const { blogId } = useParams();
  const [blog, setBlog] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = Cookies.get("token");
    const fetchContent = async () => {
      try {
        const response = await axios.get(`${api}/blog/${blogId}`, {
          headers: {
            Authorization: `${token}`,
          },
        });
        setBlog(response.data.blog);
      } catch (error) {
        console.log("error fetching blogs: ", error);
        navigate("/unauthorized");
      }
    };
    fetchContent();
  }, [blogId, navigate]);

  if (!blog) {
    return <div>Loading...</div>; // Show loading state while fetching data
  }

  const formattedDate = formatDate(blog.creationDate);

  return (
    <div className="bg-gradient-to-br from-green-50 to-blue-50 min-h-screen">
      <div className="container mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-[3fr_1fr] gap-16">
          <main className="space-y-8">
            <article className="space-y-6">
              <h1 className="text-4xl font-bold text-gray-900">{blog.title}</h1>
              <div className="text-gray-500">
                {blog.author ? (
                  <>
                    <span>By {blog.author.name}</span>
                    <span className="mx-2">•</span>
                    <span>{formattedDate}</span>
                  </>
                ) : (
                  <span>Author information is not available</span>
                )}
              </div>
              <div className="prose max-w-none text-justify">
                <Markdown>{blog.content}</Markdown>
              </div>
            </article>
          </main>
          <aside className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-lg font-bold text-gray-900">Search</h2>
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
            </div>
            <div className="space-y-4">
              <h2 className="text-lg font-bold text-gray-900">Recent Posts</h2>
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
      </div>
    </div>
  );
}
