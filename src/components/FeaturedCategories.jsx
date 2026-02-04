import React, { useEffect, useState } from 'react';

const FeaturedCategories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/featured-categories`);
        const data = await res.json();
        setCategories(data);
      } catch (error) {
        console.error('Error loading featured categories:', error);
      }
    };

    fetchCategories();
  }, []);

  return (
   <> <section className="py-10 px-4 sm:px-8 md:px-16">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Featured Categories</h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
        {categories.map((cat) => (
          <div key={cat._id} className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition">
            <a href={`/category/${cat.slug}`} className="block text-center">
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-32 object-cover rounded mb-2"
              />
              <h3 className="text-lg font-semibold text-balck-700">{cat.name}</h3>
            </a>
          </div>
        ))}
      </div>
    </section>
    <section className="max-w-9xl bg-red-600 mx-auto py-20 px-6 grid gap-8 md:grid-cols-3 text-center">
        <div className="bg-gray-100 p-10 rounded-xl shadow-md hover:shadow-xl transition">
          <h3 className="text-xl font-semibold mb-2">🚚 Fast Delivery</h3>
          <p className="text-gray-600 text-sm">We deliver products quickly across the globe with trusted couriers.</p>
        </div>
        <div className="bg-gray-100 p-6 rounded-xl shadow-md hover:shadow-xl transition">
          <h3 className="text-xl font-semibold mb-2">🛍 Quality Products</h3>
          <p className="text-gray-600 text-sm">Each product is tested and quality-checked before reaching you.</p>
        </div>
        <div className="bg-gray-100 p-6 rounded-xl shadow-md hover:shadow-xl transition">
          <h3 className="text-xl font-semibold mb-2">❤️ Customer Support</h3>
          <p className="text-gray-600 text-sm">Our friendly team is here to help you 24/7 with your concerns.</p>
        </div>
      </section>

</>
  );
};

export default FeaturedCategories;
