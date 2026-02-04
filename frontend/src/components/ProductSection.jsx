import React, { useEffect, useState } from "react";

/**
 * ProductSection Component
 * ------------------------
 * - Displays a list of latest products dynamically fetched from the backend
 * - Supports category filtering, price range, and sorting
 * - Renders products in a responsive grid
 */
const ProductSection = () => {
  // Stores fetched products
  const [products, setProducts] = useState([]);

  // Stores current filter / sort values
  const [filters, setFilters] = useState({
    category: "",
    min: "",
    max: "",
    sort: "",
  });

  const BASE_URL = import.meta.env.VITE_API_URL;

  /**
   * Fetch products from backend based on current filters
   * - Uses URLSearchParams to construct query string dynamically
   * - Handles errors gracefully
   */
  const fetchProducts = async () => {
    try {
      const params = new URLSearchParams();

      if (filters.category) params.append("category", filters.category);
      if (filters.min) params.append("min", filters.min);
      if (filters.max) params.append("max", filters.max);
      if (filters.sort) params.append("sort", filters.sort);

      const res = await fetch(`${BASE_URL}/api/products?${params.toString()}`);

      if (!res.ok) {
        throw new Error(`Failed to fetch products: ${res.status}`);
      }

      const data = await res.json();
      setProducts(data);

      // Helpful for debugging during development
      console.log("Fetched products:", data);
    } catch (error) {
      console.error("Error fetching products:", error.message);
    }
  };

  // Re-fetch products whenever filters change
  useEffect(() => {
    fetchProducts();
  }, [filters]);

  return (
    <section className="bg-gray-50 py-12 px-4 sm:px-8 md:px-16">

      {/* ================= Section Header ================= */}
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          🛍 Latest Products
        </h2>
        <p className="text-gray-600">
          Find the perfect products at the best prices
        </p>
        <div className="mt-4 border-t-4 border-yellow-400 w-20 mx-auto" />
      </div>

      {/* ================= Filter Bar ================= */}
      <div className="bg-white shadow-sm rounded-lg p-4 mb-10 flex flex-wrap gap-4 items-center justify-between">
        
        {/* Category Dropdown */}
        <select
          value={filters.category}
          onChange={(e) =>
            setFilters({ ...filters, category: e.target.value })
          }
          className="border border-gray-300 px-4 py-2 rounded-md focus:ring-2 focus:ring-yellow-400"
        >
          <option value="">All Categories</option>
          <option value="men">Men</option>
          <option value="women">Women</option>
          <option value="electronics">Electronics</option>
          <option value="kids">Kids</option>
        </select>

        {/* Min Price */}
        <input
          type="number"
          placeholder="Min Price"
          value={filters.min}
          onChange={(e) =>
            setFilters({ ...filters, min: e.target.value })
          }
          className="border border-gray-300 px-4 py-2 rounded-md w-32 focus:ring-2 focus:ring-yellow-400"
        />

        {/* Max Price */}
        <input
          type="number"
          placeholder="Max Price"
          value={filters.max}
          onChange={(e) =>
            setFilters({ ...filters, max: e.target.value })
          }
          className="border border-gray-300 px-4 py-2 rounded-md w-32 focus:ring-2 focus:ring-yellow-400"
        />

        {/* Sorting Dropdown */}
        <select
          value={filters.sort}
          onChange={(e) =>
            setFilters({ ...filters, sort: e.target.value })
          }
          className="border border-gray-300 px-4 py-2 rounded-md focus:ring-2 focus:ring-yellow-400"
        >
          <option value="">Sort by</option>
          <option value="low">Price: Low to High</option>
          <option value="high">Price: High to Low</option>
        </select>

        {/* Apply Filters Button */}
        <button
          onClick={fetchProducts}
          className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-6 py-2 rounded-md shadow-sm transition"
        >
          Apply Filters
        </button>
      </div>

      {/* ================= Product Grid ================= */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product._id}
            className="bg-white p-4 rounded-lg shadow hover:shadow-md transition"
          >
            {/* Product Image */}
            <img
              src={
                product.images?.[0]?.startsWith("http")
                  ? product.images[0]
                  : `${BASE_URL}${product.images[0]}`
              }
              alt={product.title}
              className="w-full h-48 object-cover rounded mb-3"
            />

            {/* Product Info */}
            <h3 className="text-lg font-semibold text-gray-800">
              {product.title}
            </h3>
            <p className="text-gray-600 mb-2">
              ${product.price?.toFixed(2)}
            </p>

            {/* View Details Button */}
            <a
              href={`/product/${product.slug}`}
              className="inline-block bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-2 px-4 rounded-full text-sm transition"
            >
              View Details
            </a>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProductSection;
