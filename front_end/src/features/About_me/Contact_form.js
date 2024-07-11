import React, { useState } from "react";
import emailjs from "emailjs-com";

const Label = ({ htmlFor, children }) => (
  <label
    htmlFor={htmlFor}
    className="block text-lg font-medium text-gray-700 mb-1"
  >
    {children}
  </label>
);

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const sendEmail = (e) => {
    e.preventDefault();
    setIsSending(true);

    emailjs
      .sendForm(
        process.env.REACT_APP_SERVICEID,
        process.env.REACT_APP_TEMPLATEID,
        e.target,
        process.env.REACT_APP_USERID
      )
      .then(
        (result) => {
          setIsSending(false);
          setSuccessMessage("Message sent successfully!");
          setErrorMessage("");
          setName("");
          setEmail("");
          setMessage("");
        },
        (error) => {
          setIsSending(false);
          setSuccessMessage("");
          setErrorMessage("Failed to send message. Please try again.");
        }
      );
  };

  return (
    <section className="py-12 md:py-20 lg:py-24 bg-muted flex justify-center items-center">
      <div className="w-full max-w-xl bg-white p-10 rounded-lg shadow-lg">
        <h2 className="md:text-3xl font-bold  text-center">Get in Touch</h2>
        {successMessage && (
          <p className="mb-4 text-green-600">{successMessage}</p>
        )}
        {errorMessage && <p className="mb-4 text-red-600">{errorMessage}</p>}
        <form onSubmit={sendEmail} className="space-y-6">
          <div>
            <Label htmlFor="name">Name</Label>
            <input
              className="mt-1 block w-full h-10 rounded-md text-lg sm:text-base bg-stone-100 pl-3"
              id="name"
              placeholder="Full Name"
              type="text"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <input
              className="mt-1 block w-full h-10 rounded-md text-lg sm:text-base bg-stone-100 pl-3"
              id="email"
              placeholder="E-mail"
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <Label htmlFor="message">Message</Label>
            <textarea
              className="mt-1 h-20 w-full rounded-md text-lg sm:text-base bg-stone-100 pl-3 pt-2"
              id="message"
              placeholder="Write your message here"
              rows={6}
              name="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className={`bg-stone-500 hover:bg-stone-600 text-white font-bold py-3 px-6 rounded-full w-full text-lg ${
              isSending ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={isSending}
          >
            {isSending ? "Sending..." : "Send Message"}
          </button>
        </form>
      </div>
    </section>
  );
}
