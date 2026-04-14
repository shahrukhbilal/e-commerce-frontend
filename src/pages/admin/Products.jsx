import React, { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa"; // for delete icon

const Products = () => {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/products`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      console.error("Failed to load products:", err);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this product?");
    if (!confirmDelete) return;

    const token = localStorage.getItem("token");

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/products/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await res.json();

      if (res.ok) {
        alert(result.message);
        fetchProducts();
      } else {
        alert("Failed to delete product");
      }
    } catch (err) {
      console.error("Error deleting product:", err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-blue-50 to-white py-10 px-6">
      <div className="max-w-7xl mx-auto bg-white/80 backdrop-blur-md border border-gray-200 shadow-xl rounded-2xl p-6">
        <h2 className="text-3xl font-bold text-indigo-700 mb-6 border-b pb-4">
          🛍️ Admin Panel — All Products
        </h2>

        {products.length === 0 ? (
          <p className="text-center text-gray-500 text-lg">No products found.</p>
        ) : (
          <div className="overflow-x-auto rounded-lg shadow-inner">
            <table className="min-w-full text-sm text-left">
              <thead className="bg-indigo-100 sticky top-0 z-10">
                <tr>
                  <th className="px-6 py-3 font-semibold text-gray-700">#</th>
                  <th className="px-6 py-3 font-semibold text-gray-700">Product Name</th>
                  <th className="px-6 py-3 font-semibold text-gray-700">Slug</th>
                  <th className="px-6 py-3 font-semibold text-gray-700">Category</th>
                  <th className="px-6 py-3 font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {products.map((product, index) => (
                  <tr
                    key={product._id}
                    className="hover:bg-indigo-50 transition duration-200 ease-in-out"
                  >
                    <td className="px-6 py-4 text-gray-800">{index + 1}</td>
                    <td className="px-6 py-4 text-gray-800">{product.title}</td>
                    <td className="px-6 py-4 text-gray-800">{product.slug}</td>
                    <td className="px-6 py-4 text-gray-800">
                      {product.category || "N/A"}
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleDelete(product._id)}
                        className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md shadow transition-transform transform hover:scale-105"
                      >
                        <FaTrash className="text-sm" /> Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
