import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

// Icons used in the admin sidebar (clean & lightweight)
import {
  LayoutDashboard,
  Package,
  Users,
  ShoppingCart,
  Mail,
  ArrowLeftCircle,
  ChevronLeft,
  ChevronRight,
  CloudUpload,
  LogOut,
} from 'lucide-react';

import { useDispatch } from 'react-redux';
import { logout } from '../redux/authSlice';

function AdminSidebar() {
  // Redux dispatch for auth actions (logout)
  const dispatch = useDispatch();

  // Current route ka path lene ke liye
  // is se hum active menu highlight karte hain
  const location = useLocation();

  // Sidebar collapse / expand state
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Sidebar ko collapse ya expand karne ka simple toggle
  const toggleSidebar = () => setIsCollapsed(!isCollapsed);

  // Logout handler
  // token remove + redux state reset
  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      localStorage.removeItem('token');
      dispatch(logout());
    }
  };

  // Sidebar ke saare menu items yahin define kiye gaye hain
  // taake component clean rahe aur easily scalable ho
  const menuItems = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/admin/stats' },
    { name: 'Products', icon: Package, path: '/admin/products' },
    { name: 'Users', icon: Users, path: '/admin/users' },
    { name: 'Orders', icon: ShoppingCart, path: '/admin/orders' },
    { name: 'Feedback', icon: Mail, path: '/admin/contacts' },
    { name: 'Upload Products', icon: CloudUpload, path: '/admin/add-product' },
    // Back to site option — yahan logout bhi trigger hota hai
    { name: 'Back to Site', icon: ArrowLeftCircle, path: '/', logout: true },
  ];

  return (
    <div
      className={`${
        isCollapsed ? 'w-20' : 'w-64'
      } bg-gray-900/90 text-white min-h-screen p-4 shadow-lg transition-all duration-300 border-r border-gray-700`}
    >
      {/* Collapse / Expand button (top right) */}
      <div className="flex justify-end mb-4">
        <button
          onClick={toggleSidebar}
          className="text-gray-300 hover:text-yellow-400 transition duration-200"
        >
          {isCollapsed ? <ChevronRight size={24} /> : <ChevronLeft size={24} />}
        </button>
      </div>

      {/* Sidebar heading — sirf tab dikhe jab sidebar expanded ho */}
      {!isCollapsed && (
        <h2 className="text-xl font-bold mb-6 text-center tracking-wide uppercase">
          Admin Panel
        </h2>
      )}

      {/* Sidebar menu list */}
      <ul className="space-y-4">
        {menuItems.map((item, index) => {
          // Current route ke saath match karke active menu find kar rahe hain
          const isActive = location.pathname === item.path;

          return (
            <li key={index}>
              <Link
                to={item.path}
                // Agar item ke saath logout flag ho to logout bhi trigger ho
                onClick={() => item.logout && handleLogout()}
                className={`group flex items-center p-2 rounded-md hover:bg-yellow-500 hover:text-black transition-colors ${
                  isActive ? 'bg-yellow-400 text-black font-semibold' : ''
                }`}
              >
                {/* Menu icon */}
                <item.icon size={20} className="min-w-[20px]" />

                {/* Menu text — collapse hone par hide */}
                {!isCollapsed && <span className="ml-3">{item.name}</span>}

                {/* Tooltip for collapsed sidebar */}
                {isCollapsed && (
                  <span className="absolute left-full ml-2 w-max px-2 py-1 text-sm bg-black text-white rounded shadow opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {item.name}
                  </span>
                )}
              </Link>
            </li>
          );
        })}

        {/* Dedicated logout button (sirf expanded sidebar main) */}
        {!isCollapsed && (
          <li className="pt-6 border-t border-gray-600 mt-4">
            <button
              onClick={handleLogout}
              className="flex items-center w-full p-2 text-red-500 hover:bg-red-500 hover:text-white rounded-md transition"
            >
              <LogOut size={20} />
              <span className="ml-3">Logout</span>
            </button>
          </li>
        )}
      </ul>
    </div>
  );
}

export default AdminSidebar;
