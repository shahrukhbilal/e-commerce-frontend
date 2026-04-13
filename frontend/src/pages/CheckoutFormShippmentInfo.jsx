import React from 'react';

// Component for shipping information form during checkout
// Props:
// - handleChange: function to handle input changes
// - formData: object containing current form values
const CheckoutFormShippmentInfo = ({ handleChange, formData }) => {
  return (
    // Container for the form with white background, padding, rounded corners, shadow, and centered
    <div className="bg-white p-6 rounded-2xl shadow-md w-full max-w-lg mx-auto space-y-4">
      
      {/* Form title */}
      <h2 className="text-xl font-semibold text-gray-700 text-center">Shipping Info</h2>

      {/* Input fields container with vertical spacing */}
      <div className="flex flex-col gap-4">

        {/* Full Name input */}
        <input
          type="text"
          name="name"
          value={formData.name} // controlled input value from parent state
          onChange={handleChange} // updates parent state on change
          placeholder="Full Name"
          className="border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        {/* Email Address input */}
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email Address"
          className="border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        {/* Shipping Address input */}
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
          placeholder="Shipping Address"
          className="border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        {/* City input */}
        <input
          type="text"
          name="city"
          value={formData.city}
          onChange={handleChange}
          placeholder="City"
          className="border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        {/* Postal Code input */}
        <input
          type="text"
          name="postalCode"
          value={formData.postalCode}
          onChange={handleChange}
          placeholder="Postal Code"
          className="border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>
    </div>
  );
};

export default CheckoutFormShippmentInfo;
