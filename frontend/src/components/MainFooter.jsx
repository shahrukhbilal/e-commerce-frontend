import React from 'react';
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from 'react-icons/fa';
import { Link } from 'react-router-dom';
/**
 * MainFooter Component
 * -------------------
 * - Displays website footer
 * - Contains brand info, navigation links, newsletter form and social icons
 * - Fully responsive using Tailwind grid
 */
const MainFooter = () => {
  return (
    <footer className="bg-green-600 text-gray-300 py-10 mt-10">
      
      {/* Main footer content wrapper */}
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* ================= Brand Info ================= */}
        <div>
          <h1 className="text-2xl font-bold text-black">MyShop</h1>
          <p className="mt-3 text-sm">
            Your one-stop online store for all things fashion, tech & more!
          </p>
        </div>

        {/* ================= Navigation Links ================= */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Navigation</h2>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/shop" className="hover:text-yellow-400">Shop</Link>
            </li>
            <li>
              <Link to="/Linkbout" className="hover:text-yellow-400">About Us</Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-yellow-400">Contact</Link>
            </li>
            <li>
              <Link to="/faq" className="hover:text-yellow-400">FAQ</Link>
            </li>
          </ul>
        </div>

        {/* ================= Newsletter Section ================= */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Subscribe</h2>
          <p className="text-sm mb-2">
            Get updates on offers & new products:
          </p>

          {/* Newsletter form (UI only for now) */}
          <form className="flex items-center space-x-2 mt-2">
            <input
              type="email"
              placeholder="Your email"
              className="w-full px-3 py-2 rounded-md bg-white text-black focus:outline-none focus:border-white"
            />
            <button
              type="submit"
              className="bg-white hover:bg-green-700 hover:scale-110 text-black px-4 py-2 rounded-md text-sm font-semibold"
            >
              Subscribe
            </button>
          </form>
        </div>

        {/* ================= Social Media Links ================= */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Follow Us</h2>
          <div className="flex space-x-4 text-xl">
            <Link to="#" className="hover:text-yellow-400">
              <FaFacebook />
            </Link>
            <Link to="#" className="hover:text-yellow-400">
              <FaInstagram />
            </Link>
            <Link to="#" className="hover:text-yellow-400">
              <FaTwitter />
            </Link>
            <Link to="#" className="hover:text-yellow-400">
              <FaLinkedin />
            </Link>
          </div>
        </div>

      </div>

      {/* ================= Footer Bottom Bar ================= */}
      <div className="mt-10 border-t border-gray-700 pt-6 text-center text-sm text-gray-500">
        &copy; {new Date().getFullYear()} MyShop. All rights reserved.
      </div>
    </footer>
  );
};

export default MainFooter;
