import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Truck, Trash2 } from "lucide-react";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!user?.isAdmin) {
      navigate("/");
      return;
    }
    fetchOrders();
  }, [user, navigate]);

  const fetchOrders = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/admin/orders`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) throw new Error("Failed to fetch orders");
      const data = await response.json();
      setOrders(data);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleStatusChange = async (orderId, newStatus) => {
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/admin/orders/${orderId}/status`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ status: newStatus }),
        }
      );

      if (!res.ok) throw new Error("Failed to update status");

      setOrders((prev) =>
        prev.map((order) =>
          order._id === orderId ? { ...order, status: newStatus } : order
        )
      );

      toast.success(`Status updated to "${newStatus}"`);
    } catch (error) {
      toast.error("Failed to update order status");
    }
  };

  const handleDelete = async (orderId) => {
    if (!window.confirm("Are you sure you want to delete this order?")) return;

    const token = localStorage.getItem("token");
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/admin/orders/${orderId}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (!response.ok) throw new Error("Failed to delete order");

      toast.success("Order deleted successfully!");
      fetchOrders();
    } catch (error) {
      toast.error(error.message);
    }
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case "delivered":
        return "bg-green-500 text-white";
      case "shipped":
        return "bg-blue-500 text-white";
      case "processing":
        return "bg-yellow-400 text-gray-800";
      case "cancelled":
        return "bg-red-500 text-white";
      default:
        return "bg-gray-300 text-gray-800";
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <img src="/icons/package-icon.png" alt="Orders" className="w-6 h-6" />
        <h1 className="text-2xl font-bold text-[#3c1df0]">
          Admin Panel — All Orders
        </h1>
      </div>
      <hr className="border-[#3c1df0] mb-6" />

      {/* Orders Table */}
      {orders.length === 0 ? (
        <p className="text-gray-600">No orders found.</p>
      ) : (
        <div className="overflow-x-auto bg-[#e8edff] rounded-md shadow">
          <table className="min-w-full text-sm text-left text-gray-800">
            <thead className="text-xs uppercase bg-[#dae4fd] text-gray-700">
              <tr>
                <th className="px-4 py-3">#</th>
                <th className="px-4 py-3">Customer</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Items</th>
                <th className="px-4 py-3">Total</th>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {orders.map((order) => (
                <tr key={order._id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-mono">
                    {order._id.slice(-6)}
                  </td>

                  {/* Updated Customer Info */}
                  <td className="px-4 py-3">
                    {order.user?.name || order.shippingInfo?.name}
                  </td>
                  <td className="px-4 py-3">
                    {order.user?.email || order.shippingInfo?.email}
                  </td>

                  {/* Updated Items */}
                  <td className="px-4 py-3 text-xs">
                    <ul className="list-disc list-inside space-y-1">
                      {order.cartItems?.map((item, i) => (
                        <li key={i}>
                          {item.name} × {item.quantity}
                        </li>
                      ))}
                    </ul>
                  </td>

                  <td className="px-4 py-3 font-semibold text-green-600">
                    ${order.total?.toFixed(2)}
                  </td>
                  <td className="px-4 py-3">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${getStatusBadgeClass(
                        order.status
                      )}`}
                    >
                      {order.status}
                    </span>
                    <select
                      value={order.status}
                      onChange={(e) =>
                        handleStatusChange(order._id, e.target.value)
                      }
                      disabled={["delivered", "cancelled"].includes(
                        order.status
                      )}
                      className={`mt-2 block w-full text-xs border rounded p-1 ${
                        ["delivered", "cancelled"].includes(order.status)
                          ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                          : "bg-white"
                      }`}
                    >
                      <option value="pending">Pending</option>
                      <option value="processing">Processing</option>
                      <option value="shipped">Shipped</option>
                      <option value="delivered">Delivered</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </td>
                  <td className="px-4 py-3 text-center flex flex-col sm:flex-row gap-2 justify-center">
                    <button
                      onClick={() =>
                        navigate(`/admin/orders/ship/${order._id}`)
                      }
                      className="flex items-center justify-center gap-1 bg-green-600 hover:bg-green-700 text-white px-3 py-1 text-xs rounded"
                    >
                      <Truck size={14} /> Ship
                    </button>
                    <button
                      onClick={() => handleDelete(order._id)}
                      className="flex items-center justify-center gap-1 bg-red-500 hover:bg-red-600 text-white px-3 py-1 text-xs rounded"
                    >
                      <Trash2 size={14} /> Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminOrders;
