import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { findCar } from "../features/car/carSlice";
import { toast } from "react-toastify";
import Loader from "../components/Loader";
import { Car, CarFront, Fuel } from "lucide-react";

const SearchCard = () => {
  const dispatch = useDispatch();
  const { query } = useParams();
  const { isLoading, isError, message, cars } = useSelector(
    (state) => state.car
  );
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(findCar(query));
    window.scrollTo(0, 0);
  }, [query, dispatch]);

  useEffect(() => {
    if (isError && message) {
      toast.error(message, { position: "top-center" });
    }
  }, [isError, message]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="w-full min-h-screen flex items-center  flex-col">
      <div className=" mb-10">
        <h1 className="text-5xl text-gray-700 mt-10">Search result</h1>
      </div>
      <div className="w-full flex items-center justify-evenly flex-wrap">
        {cars && cars.length > 0 ? (
          cars?.map((car) => {
            return (
              <div
                key={car._id}
                className="bg-white border mb-5 border-gray-400 p-8 min-h-70 relative group shadow-lg shadow-pink-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-pink-600/60 hover:scale-105 rounded-lg"
              >
                <div className="relative h-48 ">
                  <img
                    src={car.image}
                    alt={car.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="md:p-6 py-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold text-gray-900 uppercase">
                      {car.name}
                    </h3>
                    <div className="text-red-500 font-bold">
                      ${car.rate}
                      <span className="text-sm text-gray-500 uppercase">
                        /Day
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-[10px] md:text-[12px] text-gray-500 mb-6">
                    <div className="flex items-center">
                      <CarFront className="w-4 h-4 mr-1" />
                      <span className=" uppercase">
                        category : {car.category}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <Car className="w-4 h-4 mr-1" />
                      <span className=" uppercase">
                        company : {car.company}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <Fuel className="w-4 h-4 mr-1" />
                      <span className=" uppercase">{car.fuelType}</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => (!user ? navigate("/login") : "")}
                      className="bg-red-500 text-white py-2 text-center rounded hover:bg-red-600 transition"
                    >
                      {" "}
                      <Link to={`/car/${car._id}`}>BOOK</Link>
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-gray-500">No cars found</p>
        )}
      </div>
    </div>
  );
};

export default SearchCard;
