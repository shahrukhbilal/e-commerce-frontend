import React, { useEffect, useState } from 'react';

/**
 * FeaturedCategories Component
 * -----------------------------
 * - Fetches featured product categories from backend API
 * - Displays them in a responsive grid layout
 * - Also shows static service highlights (delivery, quality, support)
 */
const FeaturedCategories = () => {
  // State to store featured categories fetched from backend
  const [categories, setCategories] = useState([]);

  /**
   * Fetch featured categories on component mount
   */
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        // API call to get featured categories
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/featured-categories`
        );

        // Parse JSON response
        const data = await response.json();

        // Update state with fetched categories
        setCategories(data);
      } catch (error) {
        // Log error if API call fails
        console.error('Error loading featured categories:', error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <>
      {/* ================= Featured Categories Section ================= */}
      <section className="py-10 px-4 sm:px-8 md:px-16">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Featured Categories
        </h2>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
          {categories.map((category) => (
            <div
              key={category?._id}
              className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition"
            >
              {/* Category Link */}
              <a
                href={`/category/${category?.slug}`}
                className="block text-center"
              >
                {/* Category Image */}
                <img
                  src={category?.image}
                  alt={category?.name}
                  className="w-full h-32 object-cover rounded mb-2"
                />

                {/* Category Name */}
                <h3 className="text-lg font-semibold text-gray-700">
                  {category?.name}
                </h3>
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* ================= Service Highlights Section ================= */}
      <section className="max-w-9xl bg-gray-400 mx-auto py-20 px-6 grid gap-8 md:grid-cols-3 text-center">
        
        {/* Fast Delivery */}
        <div className="bg-gray-100 p-10 rounded-xl shadow-md hover:shadow-xl transition">
          <h3 className="text-xl font-semibold mb-2">🚚 Fast Delivery</h3>
          <p className="text-gray-600 text-sm">
            We deliver products quickly across the globe with trusted couriers.
          </p>
        </div>

        {/* Quality Products */}
        <div className="bg-gray-100 p-6 rounded-xl shadow-md hover:shadow-xl transition">
          <h3 className="text-xl font-semibold mb-2">🛍 Quality Products</h3>
          <p className="text-gray-600 text-sm">
            Each product is tested and quality-checked before reaching you.
          </p>
        </div>

        {/* Customer Support */}
        <div className="bg-gray-100 p-6 rounded-xl shadow-md hover:shadow-xl transition">
          <h3 className="text-xl font-semibold mb-2">❤️ Customer Support</h3>
          <p className="text-gray-600 text-sm">
            Our friendly team is here to help you 24/7
