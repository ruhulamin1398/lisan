import React from 'react';
import AdminSidebar from './AdminSidebar';

import { ToastContainer, toast } from 'react-toastify';
import AdminTopNav from './AdminTopNav';
import { Outlet } from 'react-router';
const AdminLayout = () => {
  return (
    <div className="flex min-h-screen bg-white">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content */}
      <div className="w-full">
        <AdminTopNav />
        <div className="flex-grow p-6 overflow-y-auto">
          <Outlet />
        </div>
        <ToastContainer />
      </div>
    </div>

  );
};

export default AdminLayout;
