import React from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/cartSlice';
import { ShoppingCart } from 'lucide-react';

/**
 * ProductCard Component
 * --------------------
 * - Displays individual product details
 * - Handles "Add to Cart" functionality
 * - Gracefully handles missing images and out-of-stock items
 */
const ProductCard = ({ product }) => {
  const dispatch = useDispatch();

  // Adds selected product to cart with default quantity
  const handleAdd = () => {
    dispatch(addToCart({ ...product, quantity: 1 }));
  };

  return (
    <div className="border rounded-xl p-4 hover:shadow-lg transition">
      
      {/* ================= Product Image ================= */}
      <img
        src={
          product?.images?.[0]
            ? `${import.meta.env.VITE_API_URL}${product.images[0]}`
            : '/no-image.png'
        }
        alt={product.title}
        className="w-full h-48 object-cover rounded-md"
      />

      {/* ================= Product Info ================= */}
      <h3 className="mt-2 text-lg font-bold">
        {product.title}
      </h3>

      <p className="text-gray-600">
        {product.category}
      </p>

      <p className="text-xl font-semibold text-green-600">
        Rs. {product.price}
      </p>

      {/* ================= Action Button ================= */}
      {product.stock === 0 ? (
        // Disabled state when product is out of stock
        <button
          disabled
          className="w-full bg-gray-400 text-white font-semibold py-2 rounded-full cursor-not-allowed"
        >
          Out of Stock
        </button>
      ) : (
        // Active add-to-cart button
        <button
          onClick={handleAdd}
          className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-2 rounded-full flex justify-center items-center gap-2"
        >
          <ShoppingCart size={18} />
          Add to Cart
        </button>
      )}
    </div>
  );
};

export default ProductCard;
