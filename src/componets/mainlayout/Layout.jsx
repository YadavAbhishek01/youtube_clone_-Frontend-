import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../navbar/Navbar";
import Sidebar from "../Sidebar/Sidebar";

const Layout = () => {
  return (
    <div className="flex flex-col h-screen">
      {/* Navbar on top */}
      <Navbar />

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar on the left */}
        <Sidebar/>

        {/* Main content area */}
        <main className="flex-1 overflow-y-auto bg-gray-50 p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
