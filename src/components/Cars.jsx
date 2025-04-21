import { Calendar, Car, CarFront, Fuel, Gauge } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCars } from "../features/car/carSlice";
import { toast } from "react-toastify";
import Loader from "../components/Loader";
import { Link, useNavigate } from "react-router-dom";

const Cars = () => {
  const { isLoading, isError, message, cars, currentPage, totalPages } =
    useSelector((state) => state.car);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [page, setPage] = useState(currentPage);
  const size = 6;

  useEffect(() => {
    dispatch(getCars({ page, limit: size }));
  }, [dispatch, page]);

  useEffect(() => {
    if (isError && message) {
      toast.error(message, {
        position: "top-center",
      });
    }
  }, [isError, message]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="container bg-black mx-auto px-15 py-20">
      <h1 className="text-4xl text-white text-center mb-15 font-bold uppercase">
        All Cars
      </h1>
      <div className="flex flex-wrap justify-center gap-10">
        {cars?.map((car) => {
          return (
            <div
              key={car._id}
              className="bg-gradient-to-r from-black via-[#2A2A2A] to-[#050505] shadow-[0_0_15px_2px_rgba(255,255,255,0.2)] hover:shadow-3xl transition duration-300 hover:scale-105 p-4"
            >
              <div className="w-full h-40 mb-4">
                <img
                  src={car.image}
                  alt={car.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="md:p-6 py-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold text-white uppercase">
                    {car.name}
                  </h3>
                  <div className="text-green-500 font-bold">
                    ${car.rate}
                    <span className="text-sm text-white uppercase">
                      /Day
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between text-[10px] md:text-[12px] text-white mb-10">
                  <div className="flex items-center p-5">
                    <CarFront className="w-4 h-4 mr-1" />
                    <span className="uppercase">category : {car.category}</span>
                  </div>
                  <div className="flex items-center">
                    <Car className="w-4 h-4 mr-1" />
                    <span className="uppercase">company : {car.company}</span>
                  </div>
                  <div className="flex items-center">
                    <Fuel className="w-4 h-4 mr-1" />
                    <span className="uppercase">{car.fuelType}</span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => (!user ? navigate("/login") : "")}
                    className="bg-green-700 text-white py-2 text-center rounded hover:bg-green-500 transition"
                  >
                    <Link to={`/car/${car._id}`}>BOOK</Link>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center items-center gap-3 p-5">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
          className="px-4 py-2 bg-gray-700 rounded hover:bg-gray-600 disabled:opacity-50"
        >
          Prev
        </button>
        <span className="text-xs p-4 font-medium text-gray-500">
          Page {page} of {totalPages}
        </span>
        <button
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={page === totalPages}
          className="px-4 py-2 bg-gray-700 rounded hover:bg-gray-600 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Cars;
