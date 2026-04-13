import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Loader2, PackageCheck } from 'lucide-react';

const MyOrdersPage = () => {
  // State to store the orders fetched from backend
  const [orders, setOrders] = useState([]);

  // Loading state for spinner while fetching orders
  const [loading, setLoading] = useState(true);

  // Get the logged-in user's token from Redux store
  const token = useSelector((state) => state.auth.token);

  // ------------------------
  // Fetch orders from backend
  // ------------------------
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/orders/my-orders`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`, // Send token for authentication
          },
        });

        const data = await res.json();

        // If response is not OK, throw an error
        if (!res.ok) {
          throw new Error(data.message || 'Failed to fetch orders');
        }

        // Set the fetched orders to state
        setOrders(data);
      } catch (error) {
        console.error('Error loading orders:', error.message);
      } finally {
        // Stop loading spinner
        setLoading(false);
      }
    };

    // Only fetch orders if user is logged in
    if (token) {
      fetchOrders();
    } else {
      // Stop loading if no token found
      setLoading(false);
    }
  }, [token]);

  return (
    <div className="min-h-screen bg-gray-50 px-4 md:px-16 py-12">
      {/* ------------------------
          Page Title
      ------------------------ */}
      <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">
        <PackageCheck className="inline mr-2 text-yellow-500" /> My Orders
      </h2>

      {/* ------------------------
          Loading Spinner
      ------------------------ */}
      {loading ? (
        <div className="text-center mt-20">
          <Loader2 className="animate-spin w-10 h-10 mx-auto text-yellow-500" />
          <p className="text-gray-500 mt-2">Loading orders...</p>
        </div>

      // ------------------------
      // No orders message
      // ------------------------
      ) : orders.length === 0 ? (
        <p className="text-center text-gray-600 text-lg">You have not placed any orders yet.</p>

      // ------------------------
      // Orders List
      // ------------------------
      ) : (
        <div className="space-y-8">
          {orders.map((order) => (
            <div
              key={order._id}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow"
            >
              {/* Order ID & Date */}
              <div className="flex justify-between items-center mb-4 text-sm text-gray-600">
                <span>🆔 <span className="font-medium">{order._id}</span></span>
                <span>{new Date(order.createdAt).toLocaleString()}</span>
              </div>

              {/* List of items in the order */}
              <ul className="divide-y divide-gray-200 text-gray-700">
                {order.items.map((item, index) => (
                  <li key={index} className="py-2 flex justify-between items-center">
                    <span>
                      {item.name} <span className="text-sm text-gray-500">× {item.quantity}</span>
                    </span>
                    <span className="font-medium">Rs. {(item.price * item.quantity).toFixed(2)}</span>
                  </li>
                ))}
              </ul>

              {/* Payment & Status Info + Total Amount */}
              <div className="mt-4 flex flex-col sm:flex-row sm:justify-between text-sm text-gray-600">
                <div>
                  Payment: <span className="font-medium capitalize">{order.paymentMethod}</span> |
                  Status: <span className="italic text-green-600 font-medium">{order.status}</span>
                </div>
                <div className="text-right text-lg font-bold text-green-700">
                  Total: Rs. {order.total.toFixed(2)}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyOrdersPage;
