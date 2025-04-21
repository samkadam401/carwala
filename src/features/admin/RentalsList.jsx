import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getRentals } from "../car/carSlice"
import { toast } from "react-toastify"
import Loader from "../../components/Loader"

function RentalsList() {
  const { cars, isLoading, isError, isSuccess, message } = useSelector((state) => state.car)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getRentals())
  }, [dispatch])

  useEffect(() => {
    if (isError && message) {
      toast.error(message, { position: "top-center" })
    }
  }, [isError, message])

  if (isLoading) return <Loader />

  return (
    <div className="bg-black min-h-screen p-6 rounded-lg">
      <h2 className="text-3xl font-bold text-white tracking-wide mb-8 border-b border-gray-700 pb-2">
        📋 All Rentals
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cars?.map((user) =>
          user.rentals?.map((rental) => {
            const formattedPickup = rental.pickupDate
              ? new Date(rental.pickupDate).toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })
              : "N/A"

            const formattedDrop = rental.dropDate
              ? new Date(rental.dropDate).toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })
              : "N/A"

            const today = new Date()
            const formattedToday = today
              .toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })
              .replace(/,/g, "")

            const status =
              formattedToday > formattedDrop
                ? { label: "Completed", color: "bg-green-600" }
                : { label: "Booked", color: "bg-yellow-500" }

            return (
              <div
                key={rental._id}
                className="bg-gradient-to-r from-black via-[#2A2A2A] to-[#050505] rounded-2xl p-5 shadow-md hover:shadow-xl hover:border-indigo-400 transition duration-200"
              >
                <h3 className="text-2xl font-semibold text-white mb-2">
                  {rental.car?.name || "Car Name"}
                </h3>
                <p className="text-sm text-gray-200 mb-1">
                  User: <span className="text-white">{user.name || "N/A"}</span>
                </p>
                <p className="text-sm text-gray-200 mb-1">
                  Rental ID:{" "}
                  <span className="text-white">
                    {rental._id?.substring(0, 8)}...
                  </span>
                </p>
                <p className="text-sm text-gray-200 mb-1">
                  Start: <span className="text-white">{formattedPickup}</span>
                </p>
                <p className="text-sm text-gray-200 mb-1">
                  End: <span className="text-white">{formattedDrop}</span>
                </p>

                <span
                  className={`inline-block mt-4 px-3 py-1 rounded text-xs font-medium text-white ${status.color}`}
                >
                  {status.label}
                </span>
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}

export default RentalsList
