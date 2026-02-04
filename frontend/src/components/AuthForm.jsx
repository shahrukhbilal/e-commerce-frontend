import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

// RTK Query hooks for auth APIs
import { useLoginMutation, useRegisterMutation } from '../redux/api';

// Redux action to store user + token
import { setCredentials } from '../redux/authSlice';

const AuthForm = () => {
  // Login vs Register toggle
  // true = Login form, false = Register form
  const [isLogin, setIsLogin] = useState(true);

  // Single state object to handle both login & register fields
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    isAdmin: false,
    secretKey: '',
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // RTK Query mutations
  const [login] = useLoginMutation();
  const [register] = useRegisterMutation();

  // Switch between Login & Register
  // also resets form to avoid stale data
  const toggleForm = () => {
    setIsLogin(!isLogin);
    setFormData({
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      isAdmin: false,
      secretKey: '',
    });
  };

  // Generic change handler
  // handles text inputs + checkbox cleanly
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  // Frontend-level validation
  // backend se pehle user ko clear feedback mil jata hai
  const validateForm = () => {
    if (!formData.email || !formData.password) {
      toast.error('Email and Password are required');
      return false;
    }

    if (!isLogin && (!formData.name || !formData.confirmPassword)) {
      toast.error('All fields are required');
      return false;
    }

    if (!isLogin && formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return false;
    }

    // Extra protection for admin registration
    if (!isLogin && formData.isAdmin && !formData.secretKey) {
      toast.error('Please enter the secret key to register as an admin');
      return false;
    }

    return true;
  };

  // Main submit handler for both Login & Register
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Stop submission if validation fails
    if (!validateForm()) return;

    try {
      // ================= LOGIN FLOW =================
      if (isLogin) {
        const res = await login({
          email: formData.email,
          password: formData.password,
        }).unwrap();

        // Store token + user in redux
        dispatch(setCredentials(res));
        toast.success('Login successful');

        // Clear form after success
        setFormData({
          name: '',
          email: '',
          password: '',
          confirmPassword: '',
          isAdmin: false,
          secretKey: '',
        });

        // Role-based redirect
        res.user.isAdmin ? navigate('/admin') : navigate('/my-orders');

      // ================= REGISTER FLOW =================
      } else {
        const res = await register({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          role: formData.isAdmin ? 'admin' : 'user',
          // secretKey sirf admin ke liye bheja jata hai
          secretKey: formData.isAdmin ? formData.secretKey : undefined,
        }).unwrap();

        dispatch(setCredentials(res));
        toast.success('Registration successful');

        setFormData({
          name: '',
          email: '',
          password: '',
          confirmPassword: '',
          isAdmin: formData.isAdmin,
          secretKey: '',
        });

        // Debug / future reference
        console.log('User info:', res.user);

        // Register ke baad bhi role-based redirect
        res.user.isAdmin ? navigate('/admin') : navigate('/my-orders');
      }
    } catch (error) {
      // Backend se aane wala clean error message show karna
      toast.error(error?.data?.message || 'Something went wrong');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-gray-900 to-gray-700">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8">
        {/* Dynamic heading based on mode */}
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          {isLogin ? 'Login to your account' : 'Create a new account'}
        </h2>

        <form onSubmit={handleSubmit} autoComplete="off" className="space-y-4">
          {/* Name field only for registration */}
          {!isLogin && (
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              autoComplete="off"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          )}

          <input
            type="email"
            name="email"
            placeholder="Email address"
            value={formData.email}
            onChange={handleChange}
            autoComplete="off"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            autoComplete="new-password"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* Confirm password only for register */}
          {!isLogin && (
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              autoComplete="new-password"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          )}

          {/* Admin registration option */}
          {!isLogin && (
            <div className="space-y-2">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name="isAdmin"
                  checked={formData.isAdmin}
                  onChange={handleChange}
                  className="w-4 h-4"
                />
                <span className="text-gray-700">Register as Admin</span>
              </label>

              {/* Extra protection for admin accounts */}
              {formData.isAdmin && (
                <input
                  type="text"
                  name="secretKey"
                  placeholder="Enter Admin Secret Key"
                  value={formData.secretKey}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              )}
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            {isLogin ? 'Login' : 'Register'}
          </button>
        </form>

        {/* Switch between Login & Register */}
        <p className="text-center mt-4 text-sm text-gray-600">
          {isLogin ? (
            <>
              Don't have an account?{' '}
              <button
                type="button"
                onClick={toggleForm}
                className="text-blue-500 font-medium hover:underline"
              >
                Register
              </button>
            </>
          ) : (
            <>
              Already registered?{' '}
              <button
                type="button"
                onClick={toggleForm}
                className="text-blue-500 font-medium hover:underline"
              >
                Login
              </button>
            </>
          )}
        </p>
      </div>
    </div>
  );
};

export default AuthForm;
