import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function AdminShipOrder() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      const token = localStorage.getItem("token");
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/orders/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        setOrder(data);
      } catch (err) {
        console.error("Error fetching order:", err);
      }
    };
    fetchOrder();
  }, [id]);

  const handleShip = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/orders/${id}/status`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: "Shipped" }),
      });

      if (res.ok) {
        toast.success("✅ Order marked as shipped");
        navigate("/admin/orders");
      } else {
        toast.error("❌ Failed to update status");
      }
    } catch (error) {
      console.error("Failed to mark as shipped:", error);
      toast.error("Something went wrong!");
    }
  };

  if (!order) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-2xl shadow-lg mt-8 border border-gray-200">
      <h2 className="text-3xl font-bold text-blue-700 mb-6 text-center">📦 Ship Order</h2>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Customer Information</h3>
          <div className="space-y-1 text-gray-600">
            <p><span className="font-medium">👤 Name:</span> {order?.fullName}</p>
            <p><span className="font-medium">📧 Email:</span> {order?.email}</p>
            <p><span className="font-medium">📱 Phone:</span> {order?.phone}</p>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Shipping Address</h3>
          <div className="text-gray-600">
            <p>{order?.address}, {order?.city}, {order?.zip}</p>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">Ordered Items</h3>
        <div className="space-y-2">
          {order?.items?.map((item, idx) => (
            <div
              key={idx}
              className="flex justify-between items-center bg-gray-50 p-3 rounded-md border"
            >
              <div>
                <span className="font-medium">{item.name}</span> <span className="text-sm text-gray-500">(x{item.quantity})</span>
              </div>
              <div className="text-blue-600 font-semibold">Rs. {item.price}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-10 text-center">
        <button
          onClick={handleShip}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg transition duration-200"
        >
          🚚 Mark as Shipped
        </button>
      </div>
    </div>
  );
}

export default AdminShipOrder;
