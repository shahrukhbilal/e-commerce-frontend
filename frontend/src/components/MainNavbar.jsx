import React, { useState, useEffect } from 'react';
import { Menu, X, ShoppingCart, User } from 'lucide-react';
import brandLogo from '../assets/Brand.png';

const MainNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [categories, setCategories] = useState([]);

  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const toggleMenu = () => setIsOpen(!isOpen);

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/api/categories`
        );
        const data = await res.json();
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  // Search handler
  const handleSearch = async (e) => {
    e.preventDefault();

    if (!search.trim()) return;

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/products/search?q=${search}`
      );

      const data = await res.json();
      setSearchResults(data);
      console.log(searchResults)
    } catch (error) {
      console.error('Search error:', error);
    }
  };

  return (
    <nav className="bg-white/80 backdrop-blur-md shadow-md sticky top-0 z-50">

      <div className="flex justify-between items-center max-w-7xl mx-auto px-4 py-3">

        {/* Logo */}
        <a href="/" className="flex items-center">
          <img
            src={brandLogo}
            alt="Brand Logo"
            className="h-12 w-auto object-contain"
          />
        </a>

        {/* ================= SEARCH ================= */}
        <div className="hidden md:flex w-1/3 relative">

          <form onSubmit={handleSearch} className="flex w-full">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products..."
              className="w-full px-4 py-2 border rounded-l-full focus:outline-none focus:ring-2 focus:ring-blue-400"
            />

            <button
              type="submit"
              className="bg-blue-600 text-white px-4 rounded-r-full hover:bg-blue-700 transition"
            >
              Search
            </button>
          </form>

          {/* SEARCH DROPDOWN */}
          {search && searchResults.length > 0 && (
  <div className="absolute top-full mt-2 left-0 w-full bg-white shadow-2xl rounded-xl z-50 max-h-96 overflow-y-auto border">

    {/* Header (Table style) */}
    <div className="grid grid-cols-4 gap-2 px-4 py-2 bg-gray-100 text-sm font-semibold text-gray-600 sticky top-0">
      <span>ID</span>
      <span>Image</span>
      <span>Title</span>
      <span>Price</span>
    </div>

    {searchResults.map((item) => (
      <a
        key={item._id}
        href={`/product/${item._id}`}
        className="grid grid-cols-4 gap-2 items-center px-4 py-3 hover:bg-gray-50 transition border-t"
      >
        {/* ID */}
        <span className="text-xs text-gray-500 truncate">
          {item._id.slice(-6)}
        </span>

        {/* Image */}
        <img
          src={item.images[0]}
          alt={item.title}
          className="w-12 h-12 object-cover rounded-md"
        />

        {/* Title */}
        <span className="text-sm font-medium text-gray-800 truncate">
          {item.title}
        </span>

        {/* Price */}
        <span className="text-sm font-semibold text-green-600">
          ${item.price}
        </span>
      </a>
    ))}

  </div>
)}

          {/* NO RESULTS */}
          {search && searchResults.length === 0 && (
            <div className="absolute top-full mt-2 left-0 w-full bg-white shadow-md rounded-xl p-3 text-center text-gray-500">
              No products found 😕
            </div>
          )}

        </div>

        {/* Desktop Categories */}
        <ul className="hidden md:flex space-x-6 text-base font-medium text-gray-700">
          {categories.map((cat) => (
            <li key={cat._id}>
              <a
                href={`/category/${cat.slug}`}
                className="hover:text-blue-600 transition"
              >
                {cat.name}
              </a>
            </li>
          ))}
        </ul>

        {/* Right Side */}
        <div className="flex items-center gap-4">

          {/* Cart */}
          <div className="relative cursor-pointer">
            <ShoppingCart size={22} />
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1 rounded-full">
              2
            </span>
          </div>

          {/* Profile */}
          <div className="cursor-pointer hidden md:block">
            <User size={22} />
          </div>

          {/* Mobile Menu */}
          <button
            onClick={toggleMenu}
            className="md:hidden text-gray-700"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>

        </div>

      </div>

      {/* ================= MOBILE MENU ================= */}
      {isOpen && (
        <div className="md:hidden px-4 pb-4 space-y-3">

          <input
            type="text"
            placeholder="Search..."
            className="w-full px-4 py-2 border rounded-lg"
          />

          {categories.map((cat) => (
            <a
              key={cat._id}
              href={`/category/${cat.slug}`}
              className="block text-center text-gray-700 hover:text-blue-600"
            >
              {cat.name}
            </a>
          ))}

        </div>
      )}

    </nav>
  );
};

export default MainNavbar;