import React from "react";
import ContactForm from "./Contact_form";
import Markdown from "react-markdown";
export default function Profile() {
  const bioMarkdown = `
Hello, code-muggles and keyboard-wizards! I'm a caffeinated full-stack developer with a strong background in turning caffeine into code and bugs into features. I love building innovative and user-friendly applications that solve real-world problems, like how to order pizza without human interaction or how to convince your cat it's not dinner time yet.

### My Skills Include:
- Turning "It works on my machine" into "It works on production... mostly"
- Fluent in several programming languages and at least three types of coffee
- Expert at googling Stack Overflow and pretending I knew the answer all along
- Can debug code faster than I can debug my life choices

### When I'm Not Coding:
- Explaining to my family that no, I can't hack Facebook, and yes, turning it off and on again sometimes really does work.
  `;
  return (
    <div className="flex flex-col min-h-[100vh]">
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

          <div className="prose max-w-none text-justify">
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
