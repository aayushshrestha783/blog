import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";

function SignInPage() {
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleSignIn = () => {
    setIsLoading(true);
    try {
      window.location.href = "http://localhost:3000/auth/google"; // Update with your backend URL
    } catch (error) {
      console.error("Failed to initiate Google Sign-In", error);
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen w-full items-center justify-center bg-white">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Welcome to Our Blog
        </h1>
        <p className="text-gray-600 mb-6">
          Sign in to access exclusive content and stay updated with the latest
          posts.
        </p>
        <button
          className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-gray-50 hover:bg-gray-100"
          onClick={handleGoogleSignIn}
          disabled={isLoading}
        >
          <FcGoogle className="h-5 w-5 mr-2" />
          {isLoading ? "Redirecting..." : "Sign in with Google"}
        </button>
      </div>
    </div>
  );
}

export default SignInPage;
