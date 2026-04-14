import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, LogOut, User } from 'lucide-react';
import { logout } from '../redux/authSlice';

const TopHeader = () => {
  const cartCount = useSelector((state) => state.cart.items.length);
  const isAuth = useSelector((state) => state.auth.isAuthenticated);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
<div className="fixed top-0 left-0 w-full z-50 bg-gray-900 text-gray-200 text-sm px-4 py-2 hidden sm:block shadow-md">

<div className="max-w-7xl mx-auto flex justify-between items-center">

  {/* Left - Contact */}
  <div className="flex items-center gap-4 text-xs sm:text-sm">
    <span>📞 +92-318-6198386</span>
    <span className="hidden md:inline">|</span>
    <span className="hidden md:inline">✉️ southsec021karachi@gmail.com</span>
  </div>

  {/* Right - Actions */}
  <div className="flex items-center gap-5">

    <Link to="/" className="hover:text-white transition">
      Home
    </Link>

    <Link to="/shop" className="hover:text-white transition">
      Shop
    </Link>

    <Link to="/contact" className="hover:text-white transition">
      Contact
    </Link>

    {/* Auth Section */}
    {!isAuth ? (
      <Link
        to="/login"
        className="flex items-center gap-1 hover:text-white transition"
      >
        <User size={16} /> Login
      </Link>
    ) : (
      <>
        <Link to="/my-orders" className="hover:text-white transition">
          Orders
        </Link>

        <button
          onClick={handleLogout}
          className="flex items-center gap-1 hover:text-red-400 transition"
        >
          <LogOut size={16} /> Logout
        </button>
      </>
    )}

    {/* Cart */}
    <Link to="/cart" className="relative hover:text-white transition">
      <ShoppingCart size={20} />

      {cartCount > 0 && (
        <span className="absolute -top-2 -right-2 bg-yellow-400 text-black text-xs w-5 h-5 flex items-center justify-center rounded-full font-bold">
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