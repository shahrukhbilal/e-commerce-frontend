import React, { useEffect, useState } from 'react';

const AdminMessages = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/contact`)
      .then((res) => res.json())
      .then((data) => setMessages(data))
      .catch((err) => console.error('Error fetching messages:', err));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 p-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-extrabold text-center text-indigo-700 mb-10 drop-shadow-lg">
          📩 Admin Panel – Contact Messages
        </h2>

        {messages.length === 0 ? (
          <p className="text-center text-gray-500 text-lg">No messages found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {messages.map((msg) => (
              <div
                key={msg._id}
                className="bg-white/80 backdrop-blur-md border border-gray-200 shadow-xl rounded-2xl p-6 hover:shadow-indigo-300 transition-all duration-300"
              >
                <div className="mb-2">
                  <label className="text-sm font-medium text-gray-500">Name</label>
                  <p className="text-lg font-semibold text-gray-800">{msg.name}</p>
                </div>

                <div className="mb-2">
                  <label className="text-sm font-medium text-gray-500">Email</label>
                  <p className="text-gray-700">{msg.email}</p>
                </div>

                <div className="mb-4">
                  <label className="text-sm font-medium text-gray-500">Message</label>
                  <p className="text-gray-800 italic">"{msg.message}"</p>
                </div>

                <div className="text-right">
                  <label className="text-xs text-gray-400 block">Received At</label>
                  <span className="text-xs text-gray-500">
                    {new Date(msg.createdAt).toLocaleString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminMessages;
