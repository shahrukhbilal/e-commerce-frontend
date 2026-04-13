// CheckoutPage.jsx
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const CheckoutPage = () => {
  // Stripe hooks for payment
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  // Get cart items and user info from Redux store
  const cartItems = useSelector((state) => state.cart.items || []);
  const { user } = useSelector((state) => state.auth);

  // Calculate total price of all cart items
  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // Local state for loading indicator and errors
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Shipping info state (matches backend expected fields)
  const [shippingInfo, setShippingInfo] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
  });

  // Payment method state: "stripe" or "cod"
  const [paymentMethod, setPaymentMethod] = useState('stripe');

  // Handle input changes in shipping form
  const handleChange = (e) => {
    setShippingInfo({ ...shippingInfo, [e.target.name]: e.target.value });
  };

  // ------------------------
  // Cash on Delivery (COD) Order
  // ------------------------
  const handleCOD = async (e) => {
    e.preventDefault();

    // Validate all fields
    if (!shippingInfo.name || !shippingInfo.email || !shippingInfo.phone || !shippingInfo.address) {
      setError('Please fill in all shipping details.');
      return;
    }

    try {
      setLoading(true);

      // Send order to backend
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user?.token}`,
        },
        body: JSON.stringify({
          cartItems: cartItems.map(item => ({
            productId: item.productId || item._id, // ensure productId exists
            name: item.name,
            quantity: item.quantity,
            price: item.price
          })),
          shippingInfo,
          paymentMethod: 'COD',
          total: totalAmount,
          paymentStatus: 'Pending',
        }),
      });

      if (!res.ok) {
        throw new Error('Failed to place order');
      }

      // Navigate to thank you page after successful order
      navigate('/thankyou');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // ------------------------
  // Stripe Payment Handler
  // ------------------------
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    if (!stripe || !elements) return;

    // Validate shipping info
    if (!shippingInfo.name || !shippingInfo.email || !shippingInfo.phone || !shippingInfo.address) {
      setError('Please fill in all shipping details.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Create PaymentIntent on backend
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/payment/create-payment-intent`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user?.token}`,
        },
        body: JSON.stringify({ amount: totalAmount * 100 }), // amount in cents/paise
      });

      if (!res.ok) {
        const msg = await res.text();
        throw new Error(msg || 'Failed to create payment intent');
      }

      const { clientSecret } = await res.json();

      // Confirm card payment with Stripe
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: shippingInfo.name,
            email: shippingInfo.email,
            phone: shippingInfo.phone
          },
        },
      });

      // Handle payment result
      if (result.error) {
        setError(result.error.message);
      } else if (result.paymentIntent.status === 'succeeded') {
        // Save successful order to backend
        await fetch(`${import.meta.env.VITE_API_URL}/api/orders`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            cartItems: cartItems.map(item => ({
              productId: item.productId || item._id,
              name: item.name,
              quantity: item.quantity,
              price: item.price
            })),
            shippingInfo,
            total: totalAmount,
            paymentMethod: 'Stripe',
            paymentStatus: 'Paid',
          }),
        });

        navigate('/thankyou');
      } else {
        setError('Unexpected payment status.');
      }
    } catch (err) {
      console.error('Stripe payment error:', err);
      setError(err.message || 'Payment failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="checkout" style={{ padding: '2rem', maxWidth: '500px', margin: 'auto' }}>
      <h2 style={{ marginBottom: '1rem' }}>Checkout</h2>

      {/* Form submission changes depending on payment method */}
      <form onSubmit={paymentMethod === 'stripe' ? handleSubmit : handleCOD}>
        {/* Shipping Info Inputs */}
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={shippingInfo.name}
          onChange={handleChange}
          style={{ width: '100%', marginBottom: '0.5rem', padding: '0.5rem' }}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={shippingInfo.email}
          onChange={handleChange}
          style={{ width: '100%', marginBottom: '0.5rem', padding: '0.5rem' }}
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone"
          value={shippingInfo.phone}
          onChange={handleChange}
          style={{ width: '100%', marginBottom: '0.5rem', padding: '0.5rem' }}
        />
        <input
          type="text"
          name="address"
          placeholder="Address"
          value={shippingInfo.address}
          onChange={handleChange}
          style={{ width: '100%', marginBottom: '1rem', padding: '0.5rem' }}
        />

        {/* Payment Method Selection */}
        <div style={{ marginBottom: '1rem' }}>
          <label>
            <input
              type="radio"
              value="stripe"
              checked={paymentMethod === 'stripe'}
              onChange={() => setPaymentMethod('stripe')}
            /> Pay with Card (Stripe)
          </label>
          <br />
          <label>
            <input
              type="radio"
              value="cod"
              checked={paymentMethod === 'cod'}
              onChange={() => setPaymentMethod('cod')}
            /> Cash on Delivery
          </label>
        </div>

        {/* Show Stripe Card Element if Stripe selected */}
        {paymentMethod === 'stripe' && (
          <div style={{ padding: '1rem', border: '1px solid #ccc', borderRadius: '8px' }}>
            <CardElement />
          </div>
        )}

        {/* Display error messages */}
        {error && <p style={{ color: 'red', marginTop: '1rem' }}>{error}</p>}

        {/* Submit button */}
        <button
          type="submit"
          disabled={loading}
          style={{
            marginTop: '1.5rem',
            padding: '0.75rem 1.5rem',
            backgroundColor: '#6772e5',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: loading ? 'not-allowed' : 'pointer',
          }}
        >
          {loading ? 'Processing...' : paymentMethod === 'stripe' ? `Pay ₹${totalAmount}` : 'Place COD Order'}
        </button>
      </form>
    </div>
  );
};

export default CheckoutPage;
