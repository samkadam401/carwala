"use client"

import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { editCar, getCars, removeCar } from "../../features/car/carSlice"
import { toast } from "react-toastify"
import Loader from "../../components/Loader"
import { Plus, Edit, Trash2 } from "lucide-react"

function CarsList() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { cars, isLoading, isError, message, currentPage, totalPages } = useSelector((state) => state.car)
  const [page, setPage] = useState(currentPage || 1)
  const [size, setSize] = useState(10)

  useEffect(() => {
    dispatch(getCars({ page, limit: size }))
  }, [dispatch, page, size])

  const handleDelete = (id) => {
    dispatch(removeCar(id)).then(() => {
      dispatch(getCars({ page, limit: size }))
    })
  }

  const handleEdit = (car) => {
    dispatch(editCar(car))
    navigate("/admin/form")
  }

  useEffect(() => {
    if (isError && message) {
      toast.error(message, { position: "top-center" })
    }
  }, [isError, message])

  if (isLoading) return <Loader />

  return (
    <div className="bg-black min-h-screen p-6 rounded-lg">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-white tracking-wide">🚘 Manage Cars</h2>
        <Link
          to="/admin/form"
          className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-medium px-4 py-2 rounded-xl transition"
        >
          <Plus size={20} />
          <span className="hidden sm:inline">Add Car</span>
        </Link>
      </div>

      {/* Car Cards */}
     {/* Car Cards */}
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
  {cars?.map((car) => (
    <div
      key={car._id}
      className="bg-gradient-to-r from-black via-[#2A2A2A] to-[#050505] rounded-2xl p-5 shadow-md hover:shadow-xl hover:border-indigo-400 transition duration-200"
    >
      <h3 className="text-2xl font-semibold text-white mb-1">{car.name}</h3>

      <p className="text-sm text-gray-200 mb-1">
        ID: <span className="text-white">{car._id?.substring(0, 8)}...</span>
      </p>

      <p className="text-sm text-gray-200 mb-1">
        Rate/Day: <span className="text-white">${car.rate}</span>
      </p>

      <p className="text-sm text-gray-200 mb-3">
        Status:{" "}
        <span
          className={`inline-block text-xs font-semibold uppercase px-2 py-1 rounded ${
            car.isBooked ? "bg-green-600" : "bg-amber-600"
          } text-white`}
        >
          {car.isBooked ? "Booked" : "Available"}
        </span>
      </p>

      {/* Action Buttons */}
      <div className="flex gap-3 mt-4">
        <button
          onClick={() => handleEdit(car)}
          className="flex items-center gap-1 text-blue-400 hover:text-white bg-blue-950 hover:bg-blue-700 px-3 py-1 rounded-lg transition"
        >
          <Edit size={18} />
          Edit
        </button>

        <button
          onClick={() => handleDelete(car._id)}
          className="flex items-center gap-1 text-red-400 hover:text-white bg-red-950 hover:bg-red-700 px-3 py-1 rounded-lg transition"
        >
          <Trash2 size={18} />
          Delete
        </button>
      </div>
    </div>
  ))}
</div>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-4 p-6 mt-8">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
          className="px-5 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 disabled:opacity-50 transition"
        >
          Prev
        </button>

        <span className="text-sm font-medium text-gray-300">
          Page {currentPage} of {totalPages}
        </span>

        <button
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={page === totalPages}
          className="px-5 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 disabled:opacity-50 transition"
        >
          Next
        </button>
      </div>
    </div>
  )
}

export default CarsList
