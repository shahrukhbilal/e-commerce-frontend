import React from 'react';
import HeroSection from '../components/HeroSection';
import image from '../assets/StoryImage.jpeg'
const AboutPage = () => {
  return (
    <div className="bg-gray-50 text-gray-800">
      
      <section className="bg-yellow-400 text-black py-16 px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">About Us</h1>
        <p className="max-w-3xl mx-auto text-lg">
          Welcome to <span className="font-semibold">MyShop</span> — where innovation meets style. Discover our journey, values, and mission behind the brand.
        </p>
      </section>

      {/* Story Section */}
      <section className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <h2 className="text-3xl font-bold mb-4">Our Story</h2>
          <p className="text-gray-700 text-lg leading-relaxed">
            MyShop was founded with a simple idea: to bring quality products to everyone, everywhere. What started as a small online store quickly became a trusted brand thanks to our loyal customers.
            <br /><br />
            We believe in transparency, affordability, and the power of community. Every product we sell is handpicked and tested to ensure the highest quality standards.
          </p>
        </div>
        <div>
          <img
            src={image}
            alt="Our story"
            className="rounded-xl shadow-lg w-full object-cover"
          />
        </div>
      </section>

      {/* Mission Section */}
      <section className="bg-white py-16 px-6 text-center">
        <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
        <p className="max-w-4xl mx-auto text-gray-700 text-lg leading-relaxed">
          To make high-quality, stylish, and affordable products accessible to everyone.
          <br />
          We are committed to ethical sourcing, excellent customer service, and sustainable practices.
        </p>
      </section>

      {/* Highlights Section */}
      <section className="max-w-6xl mx-auto py-16 px-6 grid gap-8 md:grid-cols-3 text-center">
        <div className="bg-gray-100 p-6 rounded-xl shadow-md hover:shadow-xl transition">
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

      {/* Footer CTA */}
      <section className="bg-yellow-400 text-black py-12 text-center">
        <h2 className="text-2xl font-bold mb-4">Ready to Shop?</h2>
        <a
          href="/"
          className="inline-block px-6 py-3 bg-black text-white rounded-md text-sm font-semibold hover:bg-gray-800"
        >
          Go to Homepage
        </a>
      </section>
    </div>
  );
};

export default AboutPage;
