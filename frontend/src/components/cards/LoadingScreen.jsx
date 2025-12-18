import React from "react";

export default function LoadingScreen() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      {/* Spinner Animation */}
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 border-4 border-t-blue-500 border-gray-300 rounded-full animate-spin"></div>
      </div>

      {/* Text */}
      <h2 className="mt-6 text-xl sm:text-2xl font-semibold text-gray-700 dark:text-gray-200">
        Preparing your content...
      </h2>

      {/* Optional subtle animation dots */}
      <div className="flex space-x-1 mt-2">
        <span className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></span>
        <span className="w-2 h-2 bg-blue-500 rounded-full animate-bounce [animation-delay:0.2s]"></span>
        <span className="w-2 h-2 bg-blue-500 rounded-full animate-bounce [animation-delay:0.4s]"></span>
      </div>

      {/* Optional tagline */}
      <p className="mt-3 text-sm text-gray-500 dark:text-gray-400 text-center max-w-xs">
        Please wait a moment while we load everything for you.
      </p>
    </div>
  );
}
