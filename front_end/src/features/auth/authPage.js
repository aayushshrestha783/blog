import React from "react";
import { FcGoogle } from "react-icons/fc";

function SignInPage() {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-white">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Welcome to Our Blog
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Sign in to access exclusive content and stay updated with the latest
          posts.
        </p>
        <button
          className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:hover:bg-gray-600"
          onClick={() => alert("Sign in with Google")}
        >
          <FcGoogle className="h-5 w-5 mr-2" />
          Sign in with Google
        </button>
      </div>
    </div>
  );
}

export default SignInPage;
