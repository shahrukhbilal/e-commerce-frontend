import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

/**
 * HeroSection Component
 * --------------------
 * - Fetches hero slides from backend
 * - Auto-rotates banners every few seconds
 * - Displays title, description, badge, CTA buttons and image
 */
const HeroSection = () => {
  // Stores all slides fetched from backend
  const [slides, setSlides] = useState([]);

  // Tracks which slide is currently visible
  const [current, setCurrent] = useState(0);

  // Simple loading state while banners are being fetched
  const [loading, setLoading] = useState(true);

  /**
   * Fetch hero slides on initial render
   */
  useEffect(() => {
    const fetchSlides = async () => {
      try {
        // API request for hero banners
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/api/heroslides`
        );

        // Convert response to JSON
        const data = await res.json();

        // Save slides to state
        setSlides(data);

        // Turn off loading once data arrives
        setLoading(false);
      } catch (error) {
        // Log error for debugging (UI remains safe)
        console.error('Error fetching banners:', error);
      }
    };

    fetchSlides();
  }, []);

  /**
   * Auto-slide logic
   * Changes banner every 3 seconds
   */
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 3000);

    // Cleanup interval on unmount
    return () => clearInterval(timer);
  }, [slides]);

  // Show loader while banners are loading
  if (loading) {
    return (
      <div className="w-full h-[70vh] flex items-center justify-center">
        <p className="text-gray-600">Loading banners...</p>
      </div>
    );
  }

  // Destructure current slide data
  const { title, description, image, badge } = slides[current];

  return (
    <div className="w-full min-h-[70vh] bg-gradient-to-r from-white via-gray-600 to-white flex flex-col md:flex-row items-center justify-between px-4 sm:px-8 md:px-16 py-8 md:py-14 transition-all duration-700 ease-in-out relative">
      
      {/* ================= Left Content ================= */}
      <div className="w-full md:w-1/2 text-center md:text-left mb-8 md:mb-0">
        
        {/* Badge / Highlight text */}
        <span className="inline-block bg-yellow-300 text-black text-xs font-semibold px-3 py-1 rounded-full mb-2 animate-pulse">
          {badge}
        </span>

        {/* Slide Title */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-4 leading-tight">
          {title}
        </h1>

        {/* Slide Description */}
        <p className="text-base sm:text-lg text-gray-600 mb-6 px-2 md:px-0">
          {description}
        </p>

        {/* Call to Action Buttons */}
        <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-3 sm:space-y-0 items-center justify-center md:justify-start">
          <Link
            to="/shop"
            className="bg-yellow-400 hover:bg-yellow-500 px-6 py-2 rounded-full text-black font-semibold hover:shadow-lg transform hover:scale-105 transition duration-300 w-40 sm:w-auto"
          >
            Shop Now
          </Link>

          <button className="bg-transparent border border-black px-6 py-2 rounded-full hover:bg-black hover:text-white font-semibold transition duration-300 w-40 sm:w-auto">
            Explore Deals
          </button>
        </div>
      </div>

      {/* ================= Right Image ================= */}
      <div className="w-full md:w-1/2 px-4 md:px-0">
        <img
          src={image}
          alt={title}
          className="w-full h-64 sm:h-72 md:h-80 object-cover rounded-xl shadow-lg transition-transform duration-700 ease-in-out hover:scale-105"
        />
      </div>

      {/* ================= Slide Indicators ================= */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <span
            key={index}
            className={`w-3 h-3 rounded-full ${
              current === index ? 'bg-black' : 'bg-gray-400'
            } transition duration-300`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSection;
