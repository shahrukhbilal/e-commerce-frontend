import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, LogOut } from 'lucide-react';
import { logout } from '../redux/authSlice';
import {clearCart} from '../redux/cartSlice'

const TopHeader = () => {
  const cartCount = useSelector((state) => state.cart.items.length);
  const isAuth = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    dispatch(clearCart());  
  localStorage.removeItem("user");
    
    navigate('/login');
  };

  return (
    <div className="bg-gray-800 text-white text-sm sm:text-base px-4 py-2">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-2">
        <div className="text-center sm:text-left">
          📞 +92‑300‑0000000 | ✉️ Arainbros@email.com
        </div>

        <div className="flex flex-wrap justify-center sm:justify-end gap-3 items-center">
          <Link to="/" className="hover:text-yellow-400">Home</Link>
          <Link to="/shop" className="hover:text-yellow-400">Shop</Link>
          <Link to="/about" className="hover:text-yellow-400">About</Link>
          <Link to="/contact" className="hover:text-yellow-400">Contact</Link>

          {!isAuth ? (
            <Link to="/login" className="hover:text-yellow-400">Login</Link>
          ) : (
            <>
              <Link to="/my-orders" className="hover:text-yellow-400">My Orders</Link>
              <button onClick={handleLogout} className="hover:text-yellow-400 flex items-center gap-1">
                <LogOut size={20} /> Logout
              </button>
            </>
          )}

          <Link to="/cart" className="relative hover:text-yellow-400" aria-label={`Cart, ${cartCount} items`}>
            <ShoppingCart size={24} color="currentColor" strokeWidth={2} />
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
