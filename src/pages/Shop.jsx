// src/pages/Shop.jsx
import React from 'react';
import ProductSection from '../components/ProductSection';

function Shop() {
  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-8 md:px-16">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-2">🛍️ Shop All Products</h1>
        <p className="text-gray-600">Explore our complete collection of amazing items</p>
      </div>

      {/* Render product section */}
      <ProductSection />
    </div>
  );
}

export default Shop;
