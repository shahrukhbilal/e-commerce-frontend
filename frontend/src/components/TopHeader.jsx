import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, LogOut } from 'lucide-react';
import { logout } from '../redux/authSlice';

/**
 * TopHeader Component
 * -------------------
 * - Displays top contact info, navigation links, authentication actions, and cart icon
 * - Dynamically shows cart item count
 * - Adjusts displayed links based on authentication status
 */
const TopHeader = () => {
  // Get cart item count from Redux store
  const cartCount = useSelector((state) => state.cart.items.length);

  // Get authentication status from Redux store
  const isAuth = useSelector((state) => state.auth.isAuthenticated);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  /**
   * Handle user logout
   * - Clears auth state in Redux
   * - Redirects user to login page
   */
  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <div className="bg-gray-800 text-white text-sm sm:text-base px-4 py-2">
      
      {/* Container: Contact info + nav links */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-2">

        {/* Left: Contact info */}
        <div className="text-center sm:text-left">
          📞 +92‑300‑0000000 | ✉️ Arainbros@email.com
        </div>

        {/* Right: Navigation links + auth + cart */}
        <div className="flex flex-wrap justify-center sm:justify-end gap-3 items-center">
          
          {/* General navigation links */}
          <Link to="/" className="hover:text-yellow-400">Home</Link>
          <Link to="/shop" className="hover:text-yellow-400">Shop</Link>
          <Link to="/about" className="hover:text-yellow-400">About</Link>
          <Link to="/contact" className="hover:text-yellow-400">Contact</Link>

          {/* Authentication links */}
          {!isAuth ? (
            // Show login if user is not authenticated
            <Link to="/login" className="hover:text-yellow-400">Login</Link>
          ) : (
            // Show "My Orders" and logout button if authenticated
            <>
              <Link to="/my-orders" className="hover:text-yellow-400">My Orders</Link>
              <button 
                onClick={handleLogout} 
                className="hover:text-yellow-400 flex items-center gap-1"
              >
                <LogOut size={20} /> Logout
              </button>
            </>
          )}

          {/* Cart icon */}
          <Link 
            to="/cart" 
            className="relative hover:text-yellow-400" 
            aria-label={`Cart, ${cartCount} items`}
          >
            <ShoppingCart size={24} color="currentColor" strokeWidth={2} />

            {/* Cart badge: only visible if there are items */}
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-yellow-500 text-black rounded-full text-xs w-5 h-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TopHeader;
