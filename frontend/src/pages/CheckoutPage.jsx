// CheckoutPage.jsx
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const CheckoutPage = () => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const cartItems = useSelector((state) => state.cart.items || []);
  const { user } = useSelector((state) => state.auth);

  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // ✅ Use same field names as backend expects
  const [shippingInfo, setShippingInfo] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
  });

  const [paymentMethod, setPaymentMethod] = useState('stripe');

  const handleChange = (e) => {
    setShippingInfo({ ...shippingInfo, [e.target.name]: e.target.value });
  };

  // ✅ COD Order
  const handleCOD = async (e) => {
    e.preventDefault();
    if (!shippingInfo.name || !shippingInfo.email || !shippingInfo.phone || !shippingInfo.address) {
      setError('Please fill in all shipping details.');
      return;
    }

    try {
      setLoading(true);
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user?.token}`,
        },
        body: JSON.stringify({
          cartItems: cartItems.map(item => ({
            productId: item.productId || item._id, // ✅ ensure productId exists
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

      navigate('/thankyou');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Stripe Payment
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!stripe || !elements) return;
    if (!shippingInfo.name || !shippingInfo.email || !shippingInfo.phone || !shippingInfo.address) {
      setError('Please fill in all shipping details.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/payment/create-payment-intent`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user?.token}`,
        },
        body: JSON.stringify({ amount: totalAmount * 100 }),
      });

      if (!res.ok) {
        const msg = await res.text();
        throw new Error(msg || 'Failed to create payment intent');
      }

      const { clientSecret } = await res.json();

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

      if (result.error) {
        setError(result.error.message);
      } else if (result.paymentIntent.status === 'succeeded') {
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

      <form onSubmit={paymentMethod === 'stripe' ? handleSubmit : handleCOD}>
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

        {/* Payment Method */}
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

        {paymentMethod === 'stripe' && (
          <div style={{ padding: '1rem', border: '1px solid #ccc', borderRadius: '8px' }}>
            <CardElement />
          </div>
        )}

        {error && <p style={{ color: 'red', marginTop: '1rem' }}>{error}</p>}

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
