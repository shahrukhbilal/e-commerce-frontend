import React from 'react';
import AdminSidebar from '../../components/admin/AdminSidebar';

const UsersPage = () => {
  return (
    <div className="flex">
      <AdminSidebar />
      <div className="ml-64 p-6 w-full">
        <h2 className="text-2xl font-bold">Manage Users</h2>
      </div>
    </div>
  );
};

export default UsersPage;
