"use client"

import { NavLink, useLocation } from "react-router-dom"
import { Car, Star, Settings, X } from "lucide-react"

function Sidebar({ onClose }) {
  const { pathname } = useLocation()

  return (
    <div className="w-full md:w-64 bg-gradient-to-r from-black via-[#2A2A2A] to-[#050505] shadow-md h-full">
      <div className="p-4 border-b flex justify-between items-center">
        <h1 className="text-xl font-bold text-white">Admin Dashboard</h1>
        <button onClick={onClose} className="md:hidden text-white">
          <X size={20} />
        </button>
      </div>
      <nav className="p-4 flex flex-col gap-2">
        <NavLink
          to="/admin"
          onClick={onClose}
          className={
            pathname === "/admin"
              ? "flex items-center gap-2 p-2 rounded bg-green-500 text-white"
              : "flex items-center gap-2 p-2 rounded text-gray-300 hover:bg-green-600"
          }
        >
          <Car size={20} />
          Rentals
        </NavLink>

        <NavLink
          to="/admin/reviews"
          onClick={onClose}
          className={
            pathname === "/admin/reviews"
              ? "flex items-center gap-2 p-2 rounded bg-green-500 text-white"
              : "flex items-center gap-2 p-2 rounded text-gray-300 hover:bg-green-600"
          }
        >
          <Star size={20} />
          Reviews
        </NavLink>

        <NavLink
          to="/admin/cars"
          onClick={onClose}
          className={
            pathname === "/admin/cars"
              ? "flex items-center gap-2 p-2 rounded bg-green-500 text-white"
              : "flex items-center gap-2 p-2 rounded text-gray-300 hover:bg-green-600"
          }
        >
          <Settings size={20} />
          Manage Cars
        </NavLink>
      </nav>
    </div>
  )
}

export default Sidebar
