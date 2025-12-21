import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './MainLayout';
import SimpleLayout from './SimpleLayout';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import ThankYouPage from './pages/Thankyou';
import MyOrdersPage from './pages/MyOdersPage';
import AuthForm from './components/AuthForm';
import Shop from './pages/Shop';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import FeedbackPage from './pages/FeedbackPage';
// import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminProducts from './pages/admin/AdminProducts';
import AdminOrders from './pages/admin/AdminOrders';
import AdminUsers from './pages/admin/AdminUsers';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// ✅ Admin Layout includes Sidebar + nested page
import AdminLayout from './pages/admin/AdminLayout';
import AdminShipOrder from './pages/admin/AdminShipOrder';
import ErrorBoundary from './ErrorBoundary';
import AdminMessages from './pages/AdminMessages';
import Products  from './pages/admin/Products';
import StripeContainer from './StripeContainer';
import AdminProductForm from './components/AdminProductForm';


function App() {
  return (
    <Router>
      <ErrorBoundary>
      <Routes>

        {/* 🏠 Public Website Routes */}
        <Route path="/" element={<MainLayout />} />
        <Route element={<SimpleLayout />}>
          <Route path="/product/:slug" element={<ProductDetailPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<StripeContainer/>} />
          <Route path="/thankyou" element={<ThankYouPage />} />
          <Route path="/my-orders" element={<MyOrdersPage />} />
          <Route path="/login" element={<AuthForm />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/feedback" element={<FeedbackPage />} />

          {/* <Route path="/admin/login" element={<AdminLogin />} /> */}
        </Route>

        {/* 🛠️ Admin Panel Routes */}
       <Route path="/admin" element={<AdminLayout />}>
  <Route index element={<AdminDashboard />} />
  <Route path="products" element={<Products />} />
  <Route path="orders" element={<AdminOrders />} />
  <Route path="users" element={<AdminUsers />} />
  <Route path="stats" element={<AdminDashboard />} />
<Route path="contacts" element={<AdminMessages />} />
<Route path='add-product' element={<AdminProductForm/>}></Route>
<Route path='back' element={<MainLayout></MainLayout>}> </Route>
</Route>

<Route path="/admin/orders/ship/:id" element={<AdminShipOrder />} />


      </Routes>

      {/* ✅ Toast Notification Container */}
      <ToastContainer position="top-right" autoClose={3000} />
      </ErrorBoundary>
    </Router>
  );
}

export default App;
