import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import Spinner from "../../components/Spinner"; // Assuming you have a spinner component

function SignInPage() {
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleSignIn = () => {
    setIsLoading(true);
    try {
      window.location.href = "http://localhost:3000/auth/google"; // Update with your backend URL
    } catch (error) {
      console.error("Failed to initiate Google Sign-In", error);
      setIsLoading(false);
      // Optionally, set an error state and display a user-friendly message
    }
  };

  return (
    <div className="bg-gradient-to-br from-green-50 to-blue-20 min-h-screen ">
      <div className="flex h-screen items-center justify-center bg-gray-100">
        <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4 text-center">
            Welcome to Our Blog
          </h1>
          <p className="text-gray-600 mb-6 text-center">
            Sign in to access exclusive content and stay updated with the latest
            posts.
          </p>
          <button
            className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            onClick={handleGoogleSignIn}
            disabled={isLoading}
            aria-label={isLoading ? "Redirecting..." : "Sign in with Google"}
          >
            {isLoading ? (
              <Spinner className="w-5 h-5 mr-2 text-gray-600" />
            ) : (
              <FcGoogle className="h-5 w-5 mr-2" />
            )}
            {isLoading ? "Redirecting..." : "Sign in with Google"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default SignInPage;
