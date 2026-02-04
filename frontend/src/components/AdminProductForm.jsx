// import react to write jsx in the component
// import useState hook to store local data of component
import React, { useState } from "react";

// react functional componenet
const AdminProductForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    category: "",
    price: "",
    stock: "",
    description: "",
    images: [],
    sizes: [],
  });

  // extra states to store data
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [previewUrls, setPreviewUrls] = useState([]);
  const [loading, setLoading] = useState(false);

  // slug generator function
  const generateSlug = (text) => {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/--+/g, "-");
  };

  // onchange event fires function handleChange
  // e = event object
  const handleChange = (e) => {
    // Destructuring of object recives from input
    const { name, value } = e.target;

    // yeah condition sirf is liye lgaei title pr q k slug generate krna hai or slug sirf title pr generate hota hai ... jaisy hi title input main user kuch likhy ga (generateSlug) call ho jaye ga
    if (name === "title") {
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

  // “This function handles changes for a multiple checkbox input representing product sizes.When a user checks or unchecks a size,the function
  // :Destructures the value and checked properties from the event target.Uses a Set to maintain unique selected sizes — adding the value if checked, removing it if unchecked.Converts the Set back to an array using Array.from and updates the component state (formData.sizes).
  const handleSizeChange = (e) => {
    const { value, checked } = e.target;

    const sizesSet = new Set(formData.sizes);

    if (checked) sizesSet.add(value); // if checked ...add value
    else sizesSet.delete(value); // if unchecked ...delete value

    setFormData((prev) => ({
      ...prev,
      //  proper array bnanay k liye Array.from
      sizes: Array.from(sizesSet),
    }));
  };

  // This function handles file input changes.It converts the selected files into an array, stores them in state,and generates temporary preview URLs using URL.createObjectURLto display selected images before upload.”
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    // to save files files in state
    setSelectedFiles(files);
    // to generate URLs for each file
    setPreviewUrls(files.map((file) => URL.createObjectURL(file)));
  };

  //“This async function uploads multiple images to Cloudinary.It iterates over the selected files, creates a FormData object for each file, appends the required Cloudinary parameters (file, upload_preset, cloud_name), and sends a POST request to Cloudinary's upload API.
  //After each upload, it collects the secure_url from the response and pushes it to an array.
  //Finally, it returns an array of all uploaded image URLs.
  //This approach ensures multiple images are uploaded sequentially and accessible via secure URLs.”
  const uploadImagesToCloudinary = async () => {
    const urls = [];

    for (const file of selectedFiles) {
      const cloudForm = new FormData();
      cloudForm.append("file", file);
      cloudForm.append("upload_preset", "ecommrece_unsigned");
      cloudForm.append("cloud_name", "dvjkqt391");

      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dvjkqt391/image/upload",
        { method: "POST", body: cloudForm }
      );
      const data = await res.json();
      urls.push(data.secure_url);
    }

    return urls;
  };

  //“The handleSubmit function handles the entire product creation workflow.On form submission, it prevents default page reload and sets a loading state.First, it uploads all selected images to Cloudinary and collects the secure URLs.Then it prepares the product data by combining form inputs with the uploaded image URLs and converts price and stock to proper numeric types.This data is sent to the backend via a POST request to create a new product.On success, the function resets the form, clears selected files and previews, and provides a success alert.
  // Errors during image upload or API request are caught and displayed to the user, and the loading state is properly managed throughout the process.”
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

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/products`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(productData),
        }
      );

      const data = await response.json();
      if (!response.ok)
        throw new Error(data.message || "Failed to create product");

      alert("✅ Product created successfully!");
      setFormData({
        title: "",
        slug: "",
        category: "",
        price: "",
        stock: "",
        description: "",
        images: [],
        sizes: [],
      });
      setSelectedFiles([]);
      setPreviewUrls([]);
    } catch (error) {
      alert("❌ Error: " + error.message);
    }

    setLoading(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 p-8 bg-white rounded-2xl shadow-xl max-w-3xl mx-auto mt-10"
    >
      <h2 className="text-2xl font-bold text-blue-700 mb-4">
        🛒 Add New Product
      </h2>

      {/* Title */}
      <div>
        <label className="block mb-1 font-medium text-gray-700">
          Product Title
        </label>
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
          <label className="block mb-1 font-medium text-gray-700">
            Price ($)
          </label>
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
        <label className="block mb-1 font-medium text-gray-700">
          Description
        </label>
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
        <label className="block mb-1 font-medium text-gray-700">
          Available Sizes
        </label>
        <div className="flex gap-4 flex-wrap">
          {["S", "M", "L", "XL"].map((size) => (
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
        <label className="block mb-1 font-medium text-gray-700">
          Upload Images
        </label>
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
        {loading ? "Uploading..." : "✅ Create Product"}
      </button>
    </form>
  );
};

export default AdminProductForm;
