"use client"

import { useEffect, useState } from "react"
import {
  X,
  Car,
  Building2,
  Fuel,
  ListIcon as Category,
  FileText,
  ImageIcon,
  Gauge,
  Users,
  GaugeIcon as Speedometer,
} from "lucide-react"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { addCar, updateCar } from "../../features/car/carSlice"
import { toast } from "react-toastify"

function AddCarForm() {
  const [onClose, setOnclose] = useState(false)
  const { edit, cars } = useSelector((state) => state.car)

  const dispatch = useDispatch()
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    rate: "",
    fuelType: "",
    category: "",
    registration: "",
    image: "",
    transmission: "",
    seats: "",
    mileage: "",
    description: "",
    rental: "available",
  })
  const {
    name,
    company,
    rate,
    fuelType,
    category,
    registration,
    image,
    transmission,
    seats,
    mileage,
    description,
    rental,
  } = formData
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }
  useEffect(() => {
    if (edit.isEdit) {
      setFormData(edit.car)
    }
  }, [edit])
  const navigate = useNavigate()
  const handleClose = () => {
    setOnclose(true)
    navigate("/admin/cars")
  }
  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      if (edit.isEdit) {
        await dispatch(
          updateCar({
            id: edit.car._id,
            formData: formData,
          }),
        ).unwrap()

        toast.success("Car updated successfully", {
          position: "top-center",
        })
      } else {
        await dispatch(addCar(formData)).unwrap()
        toast.success("Car added successfully", {
          position: "top-center",
        })
      }

      navigate("/admin/cars")
    } catch (error) {
      toast.error(error.message || "Something went wrong", {
        position: "top-center",
      })
    }
  }

  return (
    <div className="bg-black backdrop-blur-sm flex items-center justify-center p-2 md:p-4 z-50">
      <div className="bg-gray-200 rounded-2xl w-full max-w-4xl shadow-xl">
        <div className="flex justify-between items-center p-4 md:p-6 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <h2 className="text-xl md:text-2xl font-bold text-gray-800">{edit.isEdit ? "Edit Car" : "Add New Car"}</h2>
          </div>
          <button
            onClick={() => handleClose()}
            className="text-gray-400 hover:text-gray-600 transition-colors p-2 hover:bg-gray-100 rounded-full"
          >
            <X size={24} />
          </button>
        </div>

        <form className="p-4 md:p-6" onSubmit={(e) => handleSubmit(e)}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
            <div className="space-y-4 md:space-y-6">
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                  <Car size={18} />
                  Car Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={name}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:ring-2 transition-all"
                  placeholder="Enter car name"
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                  <Building2 size={18} />
                  Company
                </label>
                <input
                  type="text"
                  name="company"
                  value={company}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:ring-2 transition-all"
                  placeholder="Enter company name"
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                  <Fuel size={18} />
                  Fuel Type
                </label>
                <select
                  name="fuelType"
                  value={fuelType}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:ring-2 transition-all"
                >
                  <option value="">Select fuel type</option>
                  <option value="petrol">Petrol</option>
                  <option value="diesel">Diesel</option>
                  <option value="ev">Electric</option>
                  <option value="cng">CNG</option>
                </select>
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                  <Category size={18} />
                  Category
                </label>
                <select
                  value={category}
                  name="category"
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:ring-2 transition-all"
                >
                  <option value="">Select category</option>
                  <option value="suv">SUV</option>
                  <option value="sedan">Sedan</option>
                  <option value="hatchback">Hatchback</option>
                  <option value="jeep">Jeep</option>
                  <option value="coupe ">Coupe</option>
                </select>
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                  <FileText size={18} />
                  Registration Number
                </label>
                <input
                  type="text"
                  value={registration}
                  name="registration"
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:ring-2 transition-all"
                  placeholder="Enter registration number"
                />
              </div>
            </div>

            <div className="space-y-4 md:space-y-6">
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                  <ImageIcon size={18} />
                  Car Image URL
                </label>
                <input
                  type="url"
                  name="image"
                  value={image}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:ring-2 transition-all"
                  placeholder="Enter image URL"
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                  <Gauge size={18} />
                  Transmission
                </label>
                <select
                  value={transmission}
                  name="transmission"
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:ring-2 transition-all"
                >
                  <option value="">Select transmission</option>
                  <option value="Manual">Manual</option>
                  <option value="Automatic">Automatic</option>
                </select>
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                  <Users size={18} />
                  Number of Seats
                </label>
                <input
                  type="number"
                  name="seats"
                  value={seats}
                  onChange={handleChange}
                  min="2"
                  max="10"
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:ring-2 transition-all"
                  placeholder="Enter number of seats"
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                  <Speedometer size={18} />
                  Mileage (km/l)
                </label>
                <input
                  type="number"
                  name="mileage"
                  value={mileage}
                  onChange={handleChange}
                  step="0.1"
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:ring-2 transition-all"
                  placeholder="Enter mileage"
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                  Rate per Day ($)
                </label>
                <input
                  type="number"
                  value={rate}
                  name="rate"
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:ring-2 transition-all"
                  placeholder="Enter rate per day"
                />
              </div>
            </div>
          </div>

          <div className="mt-6 md:mt-8">
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">Description</label>
            <textarea
              rows={4}
              value={description}
              name="description"
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:ring-2 transition-all"
              placeholder="Enter car description"
            />
          </div>
          <div className="mt-4">
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">Rental Status</label>
            <select
              name="rental"
              value={rental}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:ring-2 transition-all"
            >
              <option value="">Select rental status</option>
              <option value="available">Available</option>
              <option value="rented">Rented</option>
              <option value="maintenance">Maintenance</option>
            </select>
          </div>

          <div className="flex justify-end gap-4 mt-6 md:mt-8">
            <button
              type="button"
              onClick={handleClose}
              className="px-4 md:px-6 py-2 md:py-2.5 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 md:px-6 py-2 md:py-2.5 text-white bg-green-500 rounded-lg hover:bg-green-600 transition-colors flex items-center gap-2"
            >
              <Car size={18} />
              {edit.isEdit ? "Update Car" : "Add Car"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddCarForm
