import React from 'react';
import { Link } from 'react-router-dom';

const FeedbackPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 via-blue-100 to-purple-200 px-4 py-10">
      <div className="backdrop-blur-md bg-white/80 border border-gray-200 shadow-2xl rounded-3xl p-10 max-w-lg w-full transition duration-300 ease-in-out hover:shadow-purple-300">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-green-600 mb-4 animate-pulse">
            🎉 Thank You!
          </h1>
          <p className="text-gray-800 text-lg leading-relaxed mb-8">
            Your message has been successfully received. <br />
            We appreciate your valuable feedback and will respond shortly.
          </p>

          <Link
            to="/"
            className="inline-block bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-black font-semibold py-3 px-8 rounded-full shadow-lg transition-transform transform hover:scale-105 duration-300"
          >
            ⬅️ Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FeedbackPage;
