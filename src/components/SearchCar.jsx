import { Car } from "lucide-react";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const SearchCar = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    if (!user) {
      navigate("/login");
    } else {
      navigate(`/search/${search}`);
    }
  };

  return (
    <div className="container w-[90%] mx-auto -mt-15 relative z-20">
      <div className="bg-gradient-to-r from-black via-[#2A2A2A] to-[#050505] rounded-xl shadow-xl transition-all duration-300 hover:shadow-2xl hover:scale-105 p-8 md:p-10">
        <form
          className="w-full flex items-center gap-4 md:gap-6"
          onSubmit={handleSearch}
        >
          <div className="bg-white p-4 md:p-5 rounded-md shadow-md">
            <Car className="w-8 h-8 text-black" />
          </div>
          <input
            type="text"
            onChange={(e) => setSearch(e.target.value)}
            value={search}
            placeholder="Search by location or car model"
            className="flex-grow py-4 px-6 text-lg md:text-xl rounded-md border border-gray-300 focus:outline-none text-black placeholder-gray-500 bg-white"
          />
        </form>
      </div>
    </div>
  );
};

export default SearchCar;
