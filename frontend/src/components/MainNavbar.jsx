import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import brandLogo from '../assets/Brand.png';
import { Link } from 'react-router-dom';

const MainNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const toggleMenu = () => setIsOpen(!isOpen);

  // منع scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'auto';
  }, [isOpen]);

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
      console.log(`${import.meta.env.VITE_API_URL}/api/products/search?q=${search}`);

      const data = await res.json();
      console.log('search result from navbar', data)
      setSearchResults(data);
    } catch (error) {
      console.error('Search error:', error);
    }
  };
  
  return (
    <nav className="bg-white backdrop-blur-md shadow-md sticky top-10 z-50">

      {/* MAIN BAR */}
      <div className="flex justify-between items-center max-w-7xl mx-auto px-4 py-3">

        {/* Logo */}
        <Link to="/shop">
          <img
            src={brandLogo}
            alt="Brand"
            className="h-10 w-auto"
          />
        </Link>

       
        {/* DESKTOP SEARCH */}
        <div className="hidden md:flex w-1/3 relative">
          <form onSubmit={handleSearch} className="flex w-full">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products..."
              className="w-full px-4 py-2 border rounded-l-full focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
            <button className="bg-green-600 text-white font-bold px-4 rounded-r-full">
              Search
            </button>
          </form>

          {/* SEARCH DROPDOWN */}
          {search && (
            <div className="absolute top-full mt-2 left-0 w-full bg-white shadow-xl rounded-lg z-50 max-h-80 overflow-y-auto">

              {searchResults.length > 0 ? (
                searchResults.map((item) => (
                  <Link
                    key={item._id}
                    to={`/product/${item.slug}`}
                    className="flex items-center gap-3 px-3 py-2 hover:bg-gray-100 border-b"
                  >
                    <img
                      src={item.images[0]}
                      className="w-10 h-10 rounded object-cover"
                    />
                    <div>
                      <p className="text-sm">{item.title}</p>
                      <p className="text-xs text-green-600">${item.price}</p>
                    </div>
                  </Link>
                ))
              ) : (
                <p className="text-center p-3 text-gray-500">
                  No products found 😕
                </p>
              )}

            </div>
          )}
        </div>

        {/* DESKTOP CATEGORIES */}
        <ul className="hidden md:flex gap-6 text-gray-700">
          {categories.map((cat) => (
            <li key={cat._id}>
              <Link
                to={`/category/${cat.slug}`}
                className="hover:text-green-600 font-bold "
              >
                {cat.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* MOBILE MENU BUTTON */}
        <button onClick={toggleMenu} className="md:hidden">
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* MOBILE MENU */}
      {isOpen && (
        <div className="px-4 pb-6 space-y-4 md:hidden">

          {/* MOBILE SEARCH */}
          <form onSubmit={handleSearch} className="flex w-full">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search..."
              className="w-full border rounded-l-full px-4 py-2"
            />
            <button className="bg-yellow-500 text-white px-4 py-2 rounded-r-full">
              Search
            </button>
          </form>

          {/* MOBILE SEARCH RESULTS */}
          {search && (
            <div className="bg-white shadow rounded-lg max-h-60 overflow-y-auto">

              {searchResults.length > 0 ? (
                searchResults.map((item) => (
                  <Link
                    key={item._id}
                    to={`/product/${item.slug}`}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-3 px-3 py-2 border-b"
                  >
                    <img
                      src={item.images[0]}
                      className="w-10 h-10 rounded"
                    />
                    <div>
                      <p className="text-sm">{item.title}</p>
                      <p className="text-xs text-green-600">${item.price}</p>
                    </div>
                  </Link>
                ))
              ) : (
                <p className="text-center p-3 text-gray-500">
                  No results 😕
                </p>
              )}

            </div>
          )}

          {/* MOBILE CATEGORIES */}
          {categories.map((cat) => (
            <Link
              key={cat._id}
              to={`/category/${cat.slug}`}
              onClick={() => setIsOpen(false)}
              className="block text-center text-gray-700 py-1 border-b hover:bg-yellow-600"
            >
              {cat.name}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
};

export default MainNavbar;