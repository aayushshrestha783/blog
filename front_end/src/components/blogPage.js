import { Link } from "react-router-dom";
//import { Input } from "@/components/ui/input";

export default function Component() {
  return (
    <>
      <div className="container mx-auto grid grid-cols-1 gap-8 py-8 md:grid-cols-[3fr_1fr]">
        <main>
          <article className="space-y-4 px-15">
            <h1 className="text-3xl font-bold">
              The Importance of Mindfulness in Daily Life
            </h1>
            <div className="text-gray-500">
              <span>By John Doe</span>
              <span className="mx-2">•</span>
              <span>May 18, 2024</span>
            </div>
            <div className="prose prose-gray max-w-none dark:prose-invert">
              <p>
                In today's fast-paced world, it's easy to get caught up in the
                constant hustle and bustle of daily life. We're often so focused
                on our to-do lists, deadlines, and the next task at hand that we
                forget to slow down and appreciate the present moment. However,
                incorporating mindfulness into our daily routines can have
                profound benefits for our mental and physical well-being.
              </p>
              <p>
                Mindfulness is the practice of being fully present and aware in
                the current moment, without judgment or attachment to the past
                or future. It involves paying attention to our thoughts,
                emotions, and physical sensations with a sense of curiosity and
                openness. By cultivating this state of mind, we can reduce
                stress, improve focus, and enhance our overall quality of life.
              </p>
              <p>
                One of the key benefits of mindfulness is its ability to help us
                manage stress and anxiety. In our fast-paced world, it's easy to
                feel overwhelmed by the constant demands on our time and energy.
                However, by taking a few moments each day to pause, breathe, and
                tune in to the present moment, we can calm our minds and bodies,
                and better cope with the challenges we face.
              </p>
              <p>
                Mindfulness can also improve our relationships and social
                interactions. By being fully present and attentive when
                communicating with others, we can deepen our connections,
                improve our empathy, and foster more meaningful and fulfilling
                relationships.
              </p>
              <p>
                In conclusion, incorporating mindfulness into our daily lives
                can have a profound impact on our overall well-being. By taking
                the time to slow down, pay attention, and live in the present
                moment, we can reduce stress, improve focus, and enhance our
                quality of life. So, why not start your mindfulness journey
                today?
              </p>
            </div>
          </article>
        </main>
        <aside className="space-y-6">
          <div>
            <h2 className="mb-2 text-lg font-bold">Search</h2>
            <input
              className="w-full border border-gray-300 rounded-md px-4 py-2 shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="Search blog posts..."
              type="text"
            />
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
