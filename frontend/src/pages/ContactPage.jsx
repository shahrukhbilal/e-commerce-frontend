import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Mail, User, MessageSquare, BookOpen } from 'lucide-react';

const ContactPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      toast.error('All fields are required!');
      return false;
    }

    if (!emailRegex.test(formData.email)) {
      toast.error('Invalid email format!');
      return false;
    }

    return true;
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      setLoading(true);
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success('Message sent successfully!');
        setFormData({ name: '', email: '', subject: '', message: '' });
        setTimeout(() => navigate('/feedback'), 1000);
      } else {
        toast.error(data.message || 'Something went wrong.');
      }
    } catch (error) {
      toast.error('Server error!');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-100 via-white to-yellow-50 text-gray-800">
      {/* Header */}
      <section className="bg-yellow-400 text-black py-16 px-6 text-center">
        <h1 className="text-5xl font-extrabold mb-3 drop-shadow-md">Contact Us</h1>
        <p className="max-w-2xl mx-auto text-lg font-medium">
          We'd love to hear from you — feel free to reach out with any questions or ideas!
        </p>
      </section>

      {/* Contact Info + Form */}
      <section className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Contact Info */}
        <div className="space-y-6 text-gray-700">
          <h2 className="text-2xl font-semibold">📞 Contact Information</h2>
          <p className="text-gray-600">Reach out directly or send us a message through the form.</p>

          <div className="space-y-3">
            <div>
              <h4 className="font-bold text-sm">📍 Address</h4>
              <p>Navy Housing Society, National Stadium Road, Karachi</p>
            </div>
            <div>
              <h4 className="font-bold text-sm">📞 Phone</h4>
              <p>+92 318 6198386</p>
            </div>
            <div>
              <h4 className="font-bold text-sm">✉️ Email</h4>
              <p>support@myshop.com</p>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-white/60 backdrop-blur-md shadow-2xl rounded-2xl p-8 border border-yellow-200">
          <h2 className="text-2xl font-semibold mb-6">📬 Send Us a Message</h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium mb-1">Name</label>
              <div className="relative">
                <User className="absolute left-3 top-2.5 text-gray-400" size={18} />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="pl-10 w-full py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:outline-none"
                  placeholder="Your name"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-2.5 text-gray-400" size={18} />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="pl-10 w-full py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:outline-none"
                  placeholder="you@example.com"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Subject</label>
              <div className="relative">
                <BookOpen className="absolute left-3 top-2.5 text-gray-400" size={18} />
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="pl-10 w-full py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:outline-none"
                  placeholder="Subject"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Message</label>
              <div className="relative">
                <MessageSquare className="absolute left-3 top-2.5 text-gray-400" size={18} />
                <textarea
                  name="message"
                  rows="4"
                  value={formData.message}
                  onChange={handleChange}
                  className="pl-10 pt-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:outline-none"
                  placeholder="Write your message..."
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full bg-yellow-400 hover:bg-yellow-500 transition-colors text-black font-semibold py-3 rounded-lg flex items-center justify-center ${
                loading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {loading && (
                <svg
                  className="animate-spin h-5 w-5 mr-2 text-black"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  ></path>
                </svg>
              )}
              {loading ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>
      </section>

      {/* Google Map */}
      <section className="mt-10 px-6">
        <iframe
          title="Google Map"
          className="w-full h-64 rounded-lg border-2 border-yellow-200 shadow"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3621.570775014072!2d67.07104921498889!3d24.86073468405485!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3eb33f966f5b5b91%3A0x6dfd0247ac9f0072!2sNational%20Stadium%20Road%2C%20Karachi%2C%20Pakistan!5e0!3m2!1sen!2s!4v1624022445484!5m2!1sen!2s"
          allowFullScreen
          loading="lazy"
        ></iframe>
      </section>

      {/* Toast Notification */}
      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
};

export default ContactPage;
