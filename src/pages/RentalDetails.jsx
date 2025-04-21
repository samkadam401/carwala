import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../components/Loader";
import { Receipt } from "lucide-react";
import { userRental } from "../features/rentals/rentalSlice";

const RentalDetails = () => {
  const { rental, isRentalLoading, isRentalError, isRentalMessage } = useSelector(
    (state) => state.rental
  );
  const { rid } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(userRental(rid));
  }, [dispatch, rid]);
  useEffect(() => {
    if (isRentalError && isRentalMessage) {
      toast.error(message, {
        position: "top-center",
      });
    }
  }, [isRentalError, isRentalMessage]);
  if (isRentalLoading) {
    return <Loader />;
  }

 

  return (
    <div className="p-6 md:p-12 bg-black min-h-screen font-sans">
      <div className="max-w-6xl mx-auto bg-gradient-to-r from-black via-[#2A2A2A] to-[#050505] shadow-[0_0_15px_2px_rgba(255,255,255,0.2)] hover:shadow-3xl transition duration-300 hover:scale-105 rounded-xl overflow-hidden">
        <div className="grid md:grid-cols-2">
          <div className="p-6 flex items-center justify-center">
            <img
              src={rental?.car?.image}
              alt={rental?.car?.name}
              className="w-full max-w-md object-contain"
            />
          </div>

          <div className="p-6 md:p-10">
            <h1 className="text-4xl font-bold text-white mb-2">
              {rental?.car?.name}
            </h1>
            <p className="text-2xl font-semibold text-black">
              <span className="text-white">${rental?.car?.rate}</span>
              <span className="text-white text-base">/Day</span>
            </p>

            <p className="text-white text-sm mt-4 leading-relaxed">
              {rental?.car?.description}
            </p>

            <div className="mt-6 space-y-3 text-white text-sm">
              <div className="flex items-center gap-2">
                <span role="img" aria-label="category">
                  🚗
                </span>
                <span>
                  Category:{" "}
                  <strong className=" uppercase">{rental?.car?.category}</strong>
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span role="img" aria-label="fuel">
                  ⛽
                </span>
                <span>
                  Fuel Type:{" "}
                  <strong className=" uppercase">{rental?.car?.fuelType}</strong>
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span role="img" aria-label="company">
                  🏢
                </span>
                <span>
                  Company:{" "}
                  <strong className=" uppercase">{rental?.car?.company}</strong>
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span role="img" aria-label="registration">
                  🔢
                </span>
                <span>
                  Registration:{" "}
                  <strong className=" uppercase">
                    {rental?.car?.registration}
                  </strong>
                </span>
              </div>
              <div className="flex items-center gap-2 justify-center md:justify-start lg:justify-start">
                <span aria-label="bill">
                  <Receipt className=" w-8 h-8" />
                </span>
                <span className=" font-bold text-2xl">
                  Total bill: $
                  <strong className=" uppercase">
                    {rental?.rental?.totalBill}
                  </strong>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RentalDetails;
