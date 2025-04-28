import React, { useState, useRef, useEffect } from "react";
import {
  X,
  Car,
  Building2,
  Fuel,
  Battery as Category,
  FileText,
  Image as ImageIcon,
  Gauge,
  Users,
  Thermometer as Speedometer,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addCar, updateCar } from "../../features/car/carSlice";
import { toast } from "react-toastify";

function AddCarForm() {
  const { edit, cars } = useSelector((state) => state.car);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    name: "",
    company: "",
    rate: "",
    fuelType: "",
    category: "",
    registration: "",
    image: null, // Now stores File object instead of URL string
    transmission: "",
    seats: "",
    mileage: "",
    description: "",
    rental: "available",
  });

  const [preview, setPreview] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Handle text/select inputs (UNCHANGED)
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // NEW: Handle file selection
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Basic validation
      if (!file.type.startsWith("image/")) {
        toast.error("Please select an image file");
        return;
      }
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        toast.error("Image must be smaller than 5MB");
        return;
      }
      
      setFormData({ ...formData, image: file });
      setPreview(URL.createObjectURL(file));
    }
  };

  // NEW: Remove selected image
  const removeImage = () => {
    setFormData({ ...formData, image: null });
    setPreview("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // Load data in edit mode (MODIFIED for image handling)
  useEffect(() => {
    if (edit.isEdit) {
      setFormData(edit.car);
      // If editing, keep the existing image URL for preview
      // (Backend will decide whether to keep or replace it)
      if (edit.car.imageUrl) setPreview(edit.car.imageUrl);
    }
  }, [edit]);

  // Form submission (MODIFIED for file upload)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Validate required image in add mode
    if (!edit.isEdit && !formData.image) {
      toast.error("Please upload a car image");
      setIsLoading(false);
      return;
    }

    try {
      const formDataToSend = new FormData();
      
      // Append all regular fields
      Object.keys(formData).forEach(key => {
        if (key !== "image") {
          formDataToSend.append(key, formData[key]);
        }
      });
      
      // Append image file if it exists
      if (formData.image) {
        formDataToSend.append("image", formData.image);
      }

      if (edit.isEdit) {
        await dispatch(updateCar({
          id: edit.car._id,
          formData: formDataToSend
        })).unwrap();
        toast.success("Car updated successfully!");
      } else {
        await dispatch(addCar(formDataToSend)).unwrap();
        toast.success("Car added successfully!");
      }

      navigate("/admin/cars");
    } catch (error) {
      toast.error(error.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  // Close handler (UNCHANGED)
  const handleClose = () => navigate("/admin/cars");

  return (
    <div className=" inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50 w-full">
      <div className="bg-white rounded-2xl w-full shadow-xl">
        {/* Header (UNCHANGED) */}
        <div className="flex justify-between items-center px-6 py-4 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="bg-red-100 p-2 rounded-lg">
              <Car className="w-6 h-6 text-red-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800">
              {edit.isEdit ? "Edit Car" : "Add New Car"}
            </h2>
          </div>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 transition-colors p-2 hover:bg-gray-100 rounded-full"
          >
            <X size={24} />
          </button>
        </div>

        <form className="p-4" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* LEFT COLUMN (ALL FIELDS UNCHANGED) */}
            <div className=" space-y-2">
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                  <Car size={18} />
                  Car Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all"
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
                  value={formData.company}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all"
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
                  value={formData.fuelType}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all"
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
                  value={formData.category}
                  name="category"
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all"
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
                  value={formData.registration}
                  name="registration"
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all"
                  placeholder="Enter registration number"
                />
              </div>
             

              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                  <Users size={18} />
                  Number of Seats
                </label>
                <input
                  type="number"
                  name="seats"
                  value={formData.seats}
                  onChange={handleChange}
                  min="2"
                  max="10"
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all"
                  placeholder="Enter number of seats"
                />
              </div>
              <div className="mt-4">
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
              Rental Status
            </label>
            <select
              name="rental"
              value={formData.rental}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all"
            >
              <option value="available">Available</option>
              <option value="rented">Rented</option>
              <option value="maintenance">Maintenance</option>
            </select>
          </div>              
            </div>

            <div className="space-y-2">
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                  <ImageIcon size={18} />
                  Car Image
                </label>
                
                {preview ? (
                  <div className="relative">
                    <img
                      src={preview}
                      alt="Preview"
                      className="h-48 w-full object-cover rounded-lg border border-gray-200"
                    />
                    <button
                      type="button"
                      onClick={removeImage}
                      className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                    <label className="flex flex-col items-center justify-center cursor-pointer">
                      <div className="bg-gray-100 p-3 rounded-full mb-2">
                        <ImageIcon className="w-6 h-6 text-gray-500" />
                      </div>
                      <p className="text-sm text-gray-600">
                        Click to upload or drag and drop
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        JPG, PNG (Max 5MB)
                      </p>
                      <input
                        type="file"
                        ref={fileInputRef}
                        accept="image/*"
                        onChange={handleFileChange}
                        className="hidden"
                        required={!edit.isEdit}
                      />
                    </label>
                  </div>
                )}
              </div>
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                  <Speedometer size={18} />
                  Mileage (km/l)
                </label>
                <input
                  type="number"
                  name="mileage"
                  value={formData.mileage}
                  onChange={handleChange}
                  step="0.1"
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all"
                  placeholder="Enter mileage"
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                  Rate per Day ($)
                </label>
                <input
                  type="number"
                  value={formData.rate}
                  name="rate"
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all"
                  placeholder="Enter rate per day"
                />
              </div>
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                  <Gauge size={18} />
                  Transmission
                </label>
                <select
                  value={formData.transmission}
                  name="transmission"
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all"
                >
                  <option value="">Select transmission</option>
                  <option value="Manual">Manual</option>
                  <option value="Automatic">Automatic</option>
                </select>
              </div>
              
              <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              rows={4}
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
              placeholder="Enter car description"
            />
          </div>
              
            </div>
          
           
         
             

          
          </div>

          {/* DESCRIPTION AND RENTAL STATUS (UNCHANGED) */}
          

          {/* SUBMIT BUTTONS (UNCHANGED) */}
          <div className="flex justify-end gap-4 mt-2">
            <button
              type="button"
              onClick={handleClose}
              className="px-6 py-2.5 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-6 py-2.5 text-white bg-green-500 rounded-lg hover:bg-green-600 transition-colors flex items-center gap-2 disabled:bg-gray-400"
            >
              {isLoading ? (
                "Processing..."
              ) : (
                <>
                  <Car size={18} />
                  {edit.isEdit ? "Update Car" : "Add Car"}
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddCarForm;