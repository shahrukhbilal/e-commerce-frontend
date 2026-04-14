import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FaUsers, FaBoxOpen, FaShoppingCart } from "react-icons/fa";
const AdminDashboard = () => {
  const navigate = useNavigate();

  // ✅ Redux auth state se token & user le rahe hain
  const { user, token } = useSelector((state) => state.auth);

const [adminData, setAdminData] = useState({
  totalUsers: 0,
  totalOrders: 0,
  totalProducts: 0,
  recentOrders: [],
});


  useEffect(() => {
    // ✅ Unauthorized user ko redirect karo
    if (!user || !user.isAdmin) {
      navigate('/login');
      return;
    }

    // ✅ Admin data fetch
    const fetchAdminData = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/stats`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`, // ✅ Proper Bearer token
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch admin data');
        }

        const data = await response.json();
        setAdminData(data);
      } catch (error) {
        console.error('Admin fetch error:', error.message);
      }
    };

    fetchAdminData();
  }, [user, token, navigate]);

  return (
   <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 my-6 px-4">
      {/* Total Users */}
      <div className="flex items-center p-6 bg-white rounded-2xl shadow-md hover:shadow-xl transition">
        <div className="p-4 bg-blue-100 text-blue-600 rounded-full mr-4">
          <FaUsers size={30} />
        </div>
        <div>
          <h3 className="text-gray-500 text-sm">Total Users</h3>
          <p className="text-3xl font-bold text-gray-800">{adminData.totalUsers}</p>
        </div>
      </div>

      {/* Total Orders */}
      <div className="flex items-center p-6 bg-white rounded-2xl shadow-md hover:shadow-xl transition">
        <div className="p-4 bg-green-100 text-green-600 rounded-full mr-4">
          <FaShoppingCart size={30} />
        </div>
        <div>
          <h3 className="text-gray-500 text-sm">Total Orders</h3>
          <p className="text-3xl font-bold text-gray-800">{adminData.totalOrders}</p>
        </div>
      </div>

      {/* Total Products */}
      <div className="flex items-center p-6 bg-white rounded-2xl shadow-md hover:shadow-xl transition">
        <div className="p-4 bg-yellow-100 text-yellow-600 rounded-full mr-4">
          <FaBoxOpen size={30} />
        </div>
        <div>
          <h3 className="text-gray-500 text-sm">Total Products</h3>
          <p className="text-3xl font-bold text-gray-800">{adminData.totalProducts}</p>
        </div>
      </div>
    </div>


  );
};

export default AdminDashboard;
