import React from 'react';
import FeaturedCategories from '../components/FeaturedCategories';
import ProductSection from '../components/ProductSection';
import AIShoppingAssistant from '../components/AIShoppingAssistant';

const Home = () => {
  return (
    <div>
      <FeaturedCategories />

      {/* ✨ Add this beautiful section between gray and filters */}
      <section className="bg-[#f9f9f9] py-12 text-center">
  <h2 className="text-3xl font-extrabold text-gray-800 mb-2">🔥 Explore Our Latest Arrivals</h2>
  <p className="text-gray-600">Discover products tailored to your needs</p>
  <div className="mt-6 border-t border-yellow-500 w-24 mx-auto" />
</section>


      <ProductSection />
      <AIShoppingAssistant />
    </div>
  );
};

export default Home;
