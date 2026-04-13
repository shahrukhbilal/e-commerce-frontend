import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';  // ✅ Link used for navigation
import {
  removeFromCart,
  increaseQuantity,
  decreaseQuantity
} from '../redux/cartSlice';

const CartPage = () => {
  // Get cart items from Redux store
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  // Calculate total price for all items in the cart
  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <section className="py-10 px-4 sm:px-8 md:px-16 max-w-5xl mx-auto">
      {/* Page Title */}
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Your Cart
      </h2>

      {/* Check if cart is empty */}
      {cartItems.length === 0 ? (
        <p className="text-center text-gray-500">Your cart is empty.</p>
      ) : (
        <div className="space-y-6">
          {/* Map over cart items and display each one */}
          {cartItems.map((item) => (
            <div
              key={item._id} // Unique key for each item
              className="flex items-center justify-between bg-white p-4 rounded-lg shadow"
            >
              {/* Item image and name */}
              <div className="flex items-center gap-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded"
                />
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    {item.name}
                  </h3>
                  <p className="text-gray-600">
                    ${item.price.toFixed(2)} × {item.quantity}
                  </p>
                </div>
              </div>

              {/* Quantity controls */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => dispatch(decreaseQuantity(item._id))}
                  className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                >
                  −
                </button>
                <span>{item.quantity}</span>
                <button
                  onClick={() => dispatch(increaseQuantity(item._id))}
                  className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                >
                  +
                </button>
              </div>

              {/* Remove item button */}
              <button
                onClick={() => dispatch(removeFromCart(item._id))}
                className="text-red-600 font-semibold hover:underline"
              >
                Remove
              </button>
            </div>
          ))}

          {/* Total price display */}
          <div className="text-right text-xl font-bold text-gray-800 mt-6">
            Total: ${total.toFixed(2)}
          </div>

          {/* Proceed to Checkout button */}
          <div className="text-center mt-8">
            <Link
              to="/checkout"
              className="bg-yellow-400 hover:bg-yellow-500 text-black px-6 py-3 rounded-full font-semibold inline-block"
            >
              Proceed to Checkout
            </Link>
          </div>
        </div>
      )}
    </section>
  );
};

export default CartPage;
