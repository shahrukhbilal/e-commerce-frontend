import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const CategoryPage = () => {
  const { slug } = useParams();
  console.log("slug on category page", slug);

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);

        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/api/products/category/${slug}`
        );

        const data = await res.json();
        console.log("this is the response from category page", data);

        // ✅ SAFE HANDLING (no functional change, only crash protection)
        setProducts(Array.isArray(data) ? data : data?.products || []);

      } catch (error) {
        console.error("Error fetching category products:", error);
        setProducts([]); // safety fallback
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchProducts();
    }
  }, [slug]);

  if (loading) {
    return <div className="p-6">Loading products...</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 mt-6 capitalize">
        {slug} Products
      </h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {products?.length > 0 ? (
          products.map((product) => (
            <div
              key={product._id}
              className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition"
            >
              <img
                src={product.images?.[0]}
                alt={product.title}
                className="h-40 w-full object-cover rounded"
              />

              <h2 className="mt-2 font-semibold">
                {product.title}
              </h2>

              <p className="text-gray-500">
                ${product.price}
              </p>
            </div>
          ))
        ) : (
          <p>No products found in this category 😕</p>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;