import React from "react";
import ContactForm from "./Contact_form";
import Markdown from "react-markdown";
export default function Profile() {
  const bioMarkdown = `
**Welcome, Minions! I hope you're all doing well today. You might be curious about who crafted this wonderful page.\\
 Well, it was me, of course 😌.** **I've put a lot of effort into creating this, so please enjoy. Cheers🍻**

`;
  return (
    <div className="bg-gradient-to-br from-green-50 to-blue-50 flex flex-col min-h-[100vh]">
      <header className="bg-primary text-primary-foreground py-12 md:py-20">
        <div className="container mx-auto px-4 md:px-6 flex flex-col items-center text-center">
          <div className="rounded-full w-32 h-32 md:w-40 md:h-40 overflow-hidden">
            <img
              src={`${process.env.PUBLIC_URL}/author_avatar.png`}
              width={160}
              height={160}
              alt="Profile Picture"
              className="w-full h-full object-cover"
            />
          </div>
          <h1 className="text-2xl md:text-4xl font-bold mt-6">
            Aayush Shrestha
          </h1>

          <div className="prose px-30 max-w-none text-justify mt-4">
            <Markdown>{bioMarkdown}</Markdown>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <ContactForm></ContactForm>
      </main>
    </div>
  );
}
