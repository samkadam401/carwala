"use client"

import Sidebar from "./Sidebar"
import { Outlet } from "react-router-dom"
import { useState } from "react"
import { Menu, X } from "lucide-react"

function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-black">
      {/* Mobile sidebar toggle */}
      <div className="md:hidden flex items-center p-4 bg-gradient-to-r from-black via-[#2A2A2A] to-[#050505]">
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-white p-2 rounded-md hover:bg-gray-800">
          {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
          <span className="ml-2">Admin Menu</span>
        </button>
      </div>

      {/* Sidebar - hidden on mobile unless toggled */}
      <div
        className={`${sidebarOpen ? "block" : "hidden"} md:block md:static fixed inset-0 z-20 bg-black md:bg-transparent`}
      >
        <Sidebar onClose={() => setSidebarOpen(false)} />
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-auto p-4 md:p-8">
        <Outlet />
      </div>
    </div>
  )
}

export default AdminDashboard
