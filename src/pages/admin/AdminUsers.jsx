import React, { useEffect, useState } from 'react';
import { FaTrash, FaEdit } from 'react-icons/fa';

const AdminUsers = () => {
  const [adminUsers, setAdminUsers] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchAdminUsers = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/users`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error('Failed to fetch admin users');

        const data = await res.json();
        setAdminUsers(data);
      } catch (err) {
        console.error('Error fetching admin users:', err.message);
      }
    };

    fetchAdminUsers();
  }, []);

  const handleDelete = async (id) => {
    const confirm = window.confirm('Are you sure you want to delete this user?');
    if (!confirm) return;

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/users/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error('Failed to delete user');

      setAdminUsers(adminUsers.filter((user) => user._id !== id));
    } catch (error) {
      console.error('Delete Error:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 p-6">
      <div className="max-w-6xl mx-auto bg-white/80 backdrop-blur-md shadow-2xl rounded-2xl p-6 border border-gray-200">
        <h2 className="text-3xl font-bold text-indigo-700 mb-6 border-b pb-4">
          👤 Admin Panel — Users List
        </h2>

        {adminUsers.length === 0 ? (
          <p className="text-center text-gray-500 text-lg">No users found.</p>
        ) : (
          <div className="overflow-x-auto rounded-lg">
            <table className="min-w-full text-sm text-left text-gray-800">
              <thead className="bg-indigo-100 sticky top-0 z-10 text-sm text-gray-700 uppercase tracking-wide">
                <tr>
                  <th className="px-6 py-4">#</th>
                  <th className="px-6 py-4">Name</th>
                  <th className="px-6 py-4">Email</th>
                  <th className="px-6 py-4">Role</th>
                  <th className="px-6 py-4">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {adminUsers.map((user, index) => (
                  <tr
                    key={user._id}
                    className="hover:bg-indigo-50 transition duration-200 ease-in-out"
                  >
                    <td className="px-6 py-4 font-medium">{index + 1}</td>
                    <td className="px-6 py-4">{user.name}</td>
                    <td className="px-6 py-4">{user.email}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold shadow-sm ${
                          user.isAdmin
                            ? 'bg-green-100 text-green-700'
                            : 'bg-red-100 text-red-700'
                        }`}
                      >
                        {user.isAdmin ? 'Admin' : 'User'}
                      </span>
                    </td>
                    <td className="px-6 py-4 flex gap-3">
                      <button
                        className="flex items-center gap-1 text-indigo-600 hover:text-indigo-800 transition duration-150"
                      >
                        <FaEdit className="text-sm" />
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(user._id)}
                        className="flex items-center gap-1 text-red-500 hover:text-red-700 transition duration-150"
                      >
                        <FaTrash className="text-sm" />
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminUsers;
