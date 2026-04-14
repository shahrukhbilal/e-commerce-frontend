import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";

const sizes = ["S", "M", "L", "XL"];

const ProductDetailPage = () => {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [mainImage, setMainImage] = useState("/no-image.png");
  const [selectedSize, setSelectedSize] = useState(null);
  const dispatch = useDispatch();

  

  useEffect(() => {
    async function fetchProduct() {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/products/slug/${slug}`);
        if (!res.ok) {
          throw new Error("Product not found");
        }
        const data = await res.json();
        setProduct(data);

        if (data.images && data.images.length > 0) {
          setMainImage(`${import.meta.env.VITE_API_URL}${data.images[0]}`);
        }
      } catch (err) {
        console.error("❌ Error fetching product:", err);
        setProduct(null);
      }
    }
    fetchProduct();
  }, [slug]);

  const handleAddToCart = () => {
    const token = localStorage.getItem('token')
    if (!token){
      alert('please login')
      return
    } 
    if (!selectedSize) return;
    dispatch(addToCart({ ...product, quantity, selectedSize }));
  };

  if (!product) return <p className="text-center py-20 text-xl">Product not found</p>;

  const price = Number(product?.price);
  const oldPrice = Number(product?.oldPrice);

  return (
    <section className="py-16 px-4 sm:px-8 lg:px-16 max-w-6xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 bg-white/70 backdrop-blur-lg rounded-2xl shadow-2xl p-6 border border-gray-200">
        {/* Product Images */}
        <div>
          <div className="relative overflow-hidden rounded-xl shadow-md group">
           <img
  src={
    product?.images?.[0]?.startsWith('http')
      ? product.images[0]  // If already full URL, use directly
      : `https://ecom-backend-production-e2cb.up.railway.app${product.images[0]}` // Otherwise, prepend
  }
  alt={product.title}
  className="w-full h-48 object-cover rounded-md"
/>

          </div>

          {product.images?.length > 1 && (
            <div className="grid grid-cols-4 gap-3 mt-4">
              {product.images.map((img, i) => {
                const fullImgUrl = `${import.meta.env.VITE_API_URL}${img}`;
                return (
                  <button
                    key={i}
                    onClick={() => setMainImage(fullImgUrl)}
                    className={`rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                      fullImgUrl === mainImage
                        ? "border-yellow-500"
                        : "border-transparent hover:border-yellow-300"
                    }`}
                  >
                    <img
                      src={fullImgUrl}
                      alt={`Thumbnail ${i}`}
                      className="w-full h-20 object-cover"
                    />
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Product Details */}
        <div className="flex flex-col justify-between">
          <div>
            <h1 className="text-4xl font-extrabold text-gray-800 mb-4">
              {product.title || product.name || "Untitled Product"}
            </h1>

            <p className="text-gray-600 mb-6 leading-relaxed text-lg">
              {product.description || "No description available."}
            </p>

            {/* Price */}
            <div className="mb-6 flex items-center gap-4">
              <span className="text-3xl font-bold text-yellow-500">
                ${!isNaN(price) ? price.toFixed(2) : "N/A"}
              </span>
              {!isNaN(oldPrice) && (
                <span className="text-xl text-gray-500 line-through">
                  ${oldPrice.toFixed(2)}
                </span>
              )}
            </div>

            {/* Size Selector */}
            <div className="mb-6">
              <h4 className="font-semibold mb-2">Select Size:</h4>
              <div className="flex gap-3">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 rounded-xl font-semibold transition-all text-sm shadow-sm border 
                    ${
                      selectedSize === size
                        ? "bg-yellow-400 border-yellow-600 text-black scale-105"
                        : "bg-white border-gray-300 text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
              {!selectedSize && (
                <p className="text-sm text-red-500 mt-1">Please select a size</p>
              )}
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center gap-4 mb-6">
              <label className="font-medium">Quantity:</label>
              <div className="flex items-center border rounded-lg overflow-hidden w-fit">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-1 bg-gray-200 hover:bg-gray-300"
                >
                  -
                </button>
                <input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) =>
                    setQuantity(Math.max(1, parseInt(e.target.value, 10) || 1))
                  }
                  className="w-12 text-center border-0"
                />
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-1 bg-gray-200 hover:bg-gray-300"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="space-y-3 mt-6">
            <button
              onClick={handleAddToCart}
              className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-3 px-6 rounded-lg w-full transition"
              disabled={!selectedSize}
            >
              🛒 Add to Cart
            </button>

            <button className="w-full border border-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-100 transition">
              ❤️ Add to Wishlist
            </button>

            <div className="text-sm text-gray-600 pt-2 space-y-1">
              <p><strong>SKU:</strong> {product.sku || "N/A"}</p>
              <p><strong>Category:</strong> {product.category?.name || product.category || "N/A"}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetailPage;
