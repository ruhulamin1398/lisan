"use client";

import React from "react";
import AdminSidebar from "./AdminSidebar";
import AdminTopNav from "./AdminTopNav";
import { ToastContainer } from "react-toastify";

const AdminLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-white">
      <AdminSidebar />
      <div className="w-full">
        <AdminTopNav />
        <div className="flex-grow p-6 overflow-y-auto">{children}</div>
        <ToastContainer />
      </div>
    </div>
  );
};

export default AdminLayout;
