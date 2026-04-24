import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  const [slides, setSlides] = useState([]);
  const [current, setCurrent] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSlides = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/api/heroslides`
        );
        const data = await res.json();
        setSlides(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching banners:', error);
      }
    };

    fetchSlides();
  }, []);

  useEffect(() => {
    if (slides.length === 0) return;

    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 4000);

    return () => clearInterval(timer);
  }, [slides]);

  if (loading) {
    return (
      <div className="w-full h-[70vh] flex items-center justify-center">
        <p className="text-gray-600">Loading banners...</p>
      </div>
    );
  }

  const { title, description, image, badge } = slides[current];

  return (
    <div className="relative w-full mt-20 min-h-[75vh] flex items-center justify-center overflow-hidden">
      
      {/* 🔥 Background Image */}
      <img
        src={image}
        alt={title}
        className="absolute w-full h-full object-cover scale-105 blur-[2px]"
      />

      {/* 🔥 Dark Overlay */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>

      {/* 🔥 Content */}
      <div className="relative z-10 text-center px-6 md:px-16 max-w-4xl text-white">
        
        {/* Badge */}
        <span className="inline-block bg-yellow-400 text-black text-xs px-3 py-1 rounded-full mb-4 animate-pulse">
          {badge}
        </span>

        {/* Title */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold mb-4 leading-tight">
          {title}
        </h1>

        {/* Description */}
        <p className="text-lg md:text-xl mb-6 text-gray-200">
          {description}
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-6">
          <Link
            to="/shop"
            className="bg-yellow-400 text-black px-6 py-3 rounded-full font-semibold hover:scale-105 transition"
          >
            Shop Now
          </Link>

          <button className="border border-white px-6 py-3 rounded-full hover:bg-white hover:text-black transition">
            Explore Deals
          </button>
        </div>

        {/* 🔥 Category Quick Links */}
        <div className="flex flex-wrap justify-center gap-3 mt-4">
          {['Electronics', 'Mens', 'Womens', 'Kids', 'Grocery'].map((cat, i) => (
            <Link
              key={i}
              to={`/category/${cat.toLowerCase()}`}
              className="bg-white/20 backdrop-blur-md px-4 py-2 rounded-full text-sm hover:bg-yellow-400 hover:text-black transition"
            >
              {cat}
            </Link>
          ))}
        </div>
      </div>

      {/* 🔥 Indicators */}
      <div className="absolute bottom-5 flex space-x-2">
        {slides.map((_, index) => (
          <span
            key={index}
            className={`w-3 h-3 rounded-full ${
              current === index ? 'bg-yellow-400' : 'bg-gray-400'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSection;
