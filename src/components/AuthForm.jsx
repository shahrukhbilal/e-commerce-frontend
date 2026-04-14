import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useLoginMutation, useRegisterMutation } from '../redux/api';
import { setCredentials } from '../redux/authSlice';

const AuthForm = () => {
  
  const [isLogin, setIsLogin] = useState(true);
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
  const [login] = useLoginMutation();
  const [register] = useRegisterMutation();

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

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

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
    if (!isLogin && formData.isAdmin && !formData.secretKey) {
      toast.error('Please enter the secret key to register as an admin');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      if (isLogin) {
        const res = await login({
          email: formData.email,
          password: formData.password,
        }).unwrap();

        dispatch(setCredentials(res));
        toast.success('Login successful');
        setFormData({
          name: '',
          email: '',
          password: '',
          confirmPassword: '',
          isAdmin: false,
          secretKey: '',
        });
       res.user.isAdmin ? navigate('/admin') : navigate('/my-orders');


      } else {
        const res = await register({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          role: formData.isAdmin ? 'admin' : 'user',
          secretKey: formData.isAdmin ? formData.secretKey : undefined,
        }).unwrap();

        dispatch(setCredentials(res));
        toast.success('Registration successful');
        setFormData({
          name: '',
          email: '',
          password: '',
          confirmPassword: '',
          isAdmin: formData.isAdmin ,
          secretKey: '',
        });
        console.log('User info:', res.user);
      

       res.user.isAdmin ? navigate('/admin') : navigate('/my-orders');


      }
    } catch (error) {
      toast.error(error?.data?.message || 'Something went wrong');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-gray-900 to-gray-700">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          {isLogin ? 'Login to your account' : 'Create a new account'}
        </h2>

        <form onSubmit={handleSubmit} autoComplete="off" className="space-y-4">
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
