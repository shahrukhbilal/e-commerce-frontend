import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  const [slides, setSlides] = useState([]);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [current, setCurrent] = useState(0);
  const [activeCat, setActiveCat] = useState('');
  const [loadingProducts, setLoadingProducts] = useState(false);

  // Fetch slides
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/heroslides`)
      .then(res => res.json())
      .then(setSlides);
  }, []);

  // Fetch categories
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/categories`)
      .then(res => res.json())
      .then(data => {
        setCategories(data);
        if (data.length > 0) setActiveCat(data[0].slug);
      });
  }, []);

  // Fetch products
  useEffect(() => {
    if (!activeCat) return;

    setLoadingProducts(true);

    fetch(`${import.meta.env.VITE_API_URL}/api/products?category=${activeCat}`)
      .then(res => res.json())
      .then(data => {
        setProducts(data.slice(0, 4));
        console.log(setProducts)
        setLoadingProducts(false);
      });
  }, [activeCat]);

  // Auto slider
  useEffect(() => {
    if (!slides.length) return;
    const timer = setInterval(() => {
      setCurrent(prev => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [slides]);

  if (!slides.length) return null;

  const { title, description, image, badge } = slides[current];

  return (
    <div className="w-full mt-20 bg-green-700 py-10 px-4 md:px-10">

      {/* HERO */}
      <div className="grid md:grid-cols-2 gap-10 items-center">

        {/* LEFT */}
        <div>
          <span className="bg-white text-black font-bold  px-3 py-1 rounded-full text-xs shadow">
            {badge}
          </span>

          <h1 className="text-3xl text-white transition duration-300 hover:-translate-y-2 hover:shadow-md md:text-5xl font-bold mt-8 mb-4 leading-tight">
            {title}
          </h1>

          <p className="text-white mb-6">
            {description}
          </p>

          <div className="flex gap-4">
            <Link
              to="/shop"
              className="bg-white font-bold px-6 py-3 rounded-full  hover:scale-105 transition"
            >
              Shop Now
            </Link>

            <button className="border px-6 py-3 bg-gray-400 rounded-full hover:bg-black hover:text-white font-bold transition">
              Explore
            </button>
          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div className="relative">
          <img
            src={image}
            className="w-full mt- h-[280px] md:h-[420px] object-cover rounded-2xl shadow-lg"
          />
          <div className="absolute inset-0 bg-black/10 rounded-2xl"></div>
        </div>
      </div>

      {/* CATEGORY TABS */}
      <div className="flex flex-wrap gap-3 mt-10 justify-center">
        {categories.map(cat => (
          <button
            key={cat._id}
            onClick={() => setActiveCat(cat._id)}
            className={`px-4 py-2 rounded-full text-sm border hover:scale-110 bg-white font-bold transition ${
              activeCat === cat.slug
                ? 'bg-green-600 text-black shadow-md scale-105'
                : 'bg-white hover:bg-gray-100'
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* PRODUCTS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mt-5">

        {/* LOADING SKELETON */}
        {loadingProducts
          ? Array(4).fill(0).map((_, i) => (
              <div
                key={i}
                className="animate-pulse bg-white p-3 rounded-xl shadow"
              >
                <div className="w-full h-32 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 mt-3 rounded"></div>
                <div className="h-3 bg-gray-200 mt-2 rounded w-1/2"></div>
              </div>
            ))

          : products.map(item => (
              <Link
                key={item._id}
                to={`/product/${item.slug}`}
                className="group bg-white p-3 rounded-xl shadow hover:shadow-lg transition"
              >
                <div className="overflow-hidden rounded">
                  <img
                    src={item.images[0]}
                    className="w-full h-32 object-cover group-hover:scale-110 transition duration-300"
                  />
                </div>

                <p className="text-sm mt-2 font-medium truncate group-hover:text-yellow-600">
                  {item.title}
                </p>

                <p className="text-green-600 text-sm font-semibold">
                  ${item.price}
                </p>
              </Link>
            ))}
      </div>

    </div>
  );
};

export default HeroSection;