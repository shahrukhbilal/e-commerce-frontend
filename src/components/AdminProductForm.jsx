import React, { useState } from 'react';

const AdminProductForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    category: '',
    price: '',
    stock: '',
    description: '',
    images: [],
    sizes: [],
  });

  const [selectedFiles, setSelectedFiles] = useState([]);
  const [previewUrls, setPreviewUrls] = useState([]);
  const [loading, setLoading] = useState(false);

  const generateSlug = (text) => {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/--+/g, '-');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'title') {
      const generatedSlug = generateSlug(value);
      setFormData((prev) => ({
        ...prev,
        title: value,
        slug: generatedSlug,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSizeChange = (e) => {
    const value = e.target.value;
    setFormData((prev) => ({
      ...prev,
      sizes: e.target.checked
        ? [...prev.sizes, value]
        : prev.sizes.filter((size) => size !== value),
    }));
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles(files);
    setPreviewUrls(files.map((file) => URL.createObjectURL(file)));
  };

  const uploadImagesToCloudinary = async () => {
    const urls = [];

    for (const file of selectedFiles) {
      const cloudForm = new FormData();
      cloudForm.append('file', file);
      cloudForm.append('upload_preset', 'ecommrece_unsigned');
      cloudForm.append('cloud_name', 'dvjkqt391');

      const res = await fetch(
        'https://api.cloudinary.com/v1_1/dvjkqt391/image/upload',
        { method: 'POST', body: cloudForm }
      );
      const data = await res.json();
      urls.push(data.secure_url);
    }

    return urls;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const uploadedImages = await uploadImagesToCloudinary();

      const productData = {
        ...formData,
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock),
        images: uploadedImages,
      };

      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/products`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productData),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Failed to create product');

      alert('✅ Product created successfully!');
      setFormData({
        title: '',
        slug: '',
        category: '',
        price: '',
        stock: '',
        description: '',
        images: [],
        sizes: [],
      });
      setSelectedFiles([]);
      setPreviewUrls([]);
    } catch (error) {
      alert('❌ Error: ' + error.message);
    }

    setLoading(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 p-8 bg-white rounded-2xl shadow-xl max-w-3xl mx-auto mt-10"
    >
      <h2 className="text-2xl font-bold text-blue-700 mb-4">🛒 Add New Product</h2>

      {/* Title */}
      <div>
        <label className="block mb-1 font-medium text-gray-700">Product Title</label>
        <input
          type="text"
          name="title"
          className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={formData.title}
          onChange={handleChange}
          required
        />
      </div>

      {/* Category */}
      <div>
        <label className="block mb-1 font-medium text-gray-700">Category</label>
        <select
          name="category"
          className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={formData.category}
          onChange={handleChange}
          required
        >
          <option value="">Select Category</option>
          <option value="men">Men</option>
          <option value="women">Women</option>
          <option value="women">kids</option>
          <option value="electronics">Electronics</option>
          <option value="shoes">Shoes</option>
          <option value="accessories">Accessories</option>
        </select>
      </div>

      {/* Price & Stock */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block mb-1 font-medium text-gray-700">Price ($)</label>
          <input
            type="number"
            name="price"
            className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium text-gray-700">Stock</label>
          <input
            type="number"
            name="stock"
            className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={formData.stock}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      {/* Description */}
      <div>
        <label className="block mb-1 font-medium text-gray-700">Description</label>
        <textarea
          name="description"
          className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          rows={4}
          value={formData.description}
          onChange={handleChange}
          required
        />
      </div>

      {/* Sizes */}
      <div>
        <label className="block mb-1 font-medium text-gray-700">Available Sizes</label>
        <div className="flex gap-4 flex-wrap">
          {['S', 'M', 'L', 'XL'].map((size) => (
            <label key={size} className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                value={size}
                checked={formData.sizes.includes(size)}
                onChange={handleSizeChange}
              />
              {size}
            </label>
          ))}
        </div>
      </div>

      {/* Image Upload */}
      <div>
        <label className="block mb-1 font-medium text-gray-700">Upload Images</label>
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleFileChange}
          className="w-full border border-gray-300 px-4 py-2 rounded-md"
          required
        />
      </div>

      {/* Image Preview */}
      {previewUrls.length > 0 && (
        <div className="flex gap-4 flex-wrap mt-3">
          {previewUrls.map((url, i) => (
            <img
              key={i}
              src={url}
              alt={`Preview ${i}`}
              className="w-24 h-24 object-cover rounded-md border"
            />
          ))}
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        className="bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={loading}
      >
        {loading ? 'Uploading...' : '✅ Create Product'}
      </button>
    </form>
  );
};

export default AdminProductForm;
