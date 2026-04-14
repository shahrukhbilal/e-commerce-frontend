
import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2 } from 'lucide-react'; // Lucide check icon
const ThankYouPage = () => (
  <div className="min-h-screen bg-gradient-to-br from-white via-yellow-50 to-yellow-100 flex flex-col items-center justify-center p-4">
    <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center space-y-6">
      <CheckCircle2 className="mx-auto text-green-500 w-20 h-20" />
      <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-800">
        🎉 Thank You for Your Order!
      </h1>
      <p className="text-gray-600 leading-relaxed">
        Your order has been placed successfully. We’re processing it now and will contact you shortly with updates.
      </p>
      <Link
        to="/"
        className="inline-block bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-3 px-8 rounded-full transition-transform transform hover:scale-105"
      >
        Return to Homepage
      </Link>
    </div>
    <footer className="mt-8 text-sm text-gray-500">
      Need help? <Link to="/contact" className="text-yellow-600 hover:underline">Contact Support</Link>
    </footer>
  </div>
);
export default ThankYouPage;
