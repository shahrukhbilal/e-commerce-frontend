import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import brandLogo from '../assets/Brand.png'; // Brand logo image

/**
 * MainNavbar Component
 * -------------------
 * - Displays top navigation bar
 * - Fetches product categories dynamically from backend
 * - Supports responsive layout with mobile hamburger menu
 */
const MainNavbar = () => {
  // Controls mobile menu open / close state
  const [isOpen, setIsOpen] = useState(false);

  // Stores categories fetched from backend
  const [categories, setCategories] = useState([]);

  // Toggles mobile menu visibility
  const toggleMenu = () => setIsOpen(!isOpen);

  /**
   * Fetch categories once on component mount
   * Used to build both desktop and mobile navigation links
   */
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        // Request categories from API
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/api/categories`
        );

        // Parse response
        const data = await res.json();

        // Save categories in state
        setCategories(data);
      } catch (error) {
        // Fail silently for UI, log error for debugging
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <nav className="bg-white shadow-md px-4 py-3">
      
      {/* ================= Navbar Container ================= */}
      <div className="flex justify-between items-center max-w-6xl mx-auto">
        
        {/* ================= Brand Logo ================= */}
        <a href="/" className="flex items-center space-x-4">
          <img
            src={brandLogo}
            alt="Brand Logo"
            className="h-30 w-auto object-contain"
          />
        </a>

        {/* ================= Mobile Hamburger Icon ================= */}
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="text-gray-700 focus:outline-none"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* ================= Desktop Menu ================= */}
        <ul className="hidden md:flex space-x-6 text-lg font-semibold text-gray-700">
          {categories.map((cat) => (
            <li key={cat._id}>
              <a
                href={`/category/${cat.slug}`}
                className="hover:text-blue-600"
              >
                {cat.name}
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* ================= Mobile Dropdown Menu ================= */}
      {isOpen && (
        <ul className="md:hidden mt-3 space-y-2 text-center text-base font-semibold text-gray-700">
          {categories.map((cat) => (
            <li key={cat._id}>
              <a
                href={`/category/${cat.slug}`}
                className="block hover:text-blue-600"
              >
                {cat.name}
              </a>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
};

export default MainNavbar;
