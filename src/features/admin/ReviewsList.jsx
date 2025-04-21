import { useEffect } from "react"
import { Star } from "lucide-react"
import { useDispatch, useSelector } from "react-redux"
import { getReviews } from "../../features/car/carSlice"
import { toast } from "react-toastify"
import Loader from "../../components/Loader"

function ReviewsList() {
  const { isLoading, isError, message, reviews } = useSelector((state) => state.car)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getReviews())
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
        🌟 User Reviews
      </h2>

      <div className="space-y-6">
        {reviews.length > 0 ? (
          reviews.map((user) =>
            user.reviews.map((review) => (
              <div
                key={review._id}
                className="bg-gradient-to-r from-black via-[#2A2A2A] to-[#050505] rounded-2xl p-5 shadow-md hover:shadow-xl hover:border-indigo-500 transition duration-200"
              >
                <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2">
                  <div>
                    <h3 className="text-white text-lg font-semibold uppercase">
                      User: {user.name}
                    </h3>
                    <p className="text-sm text-gray-300 uppercase pt-1">
                      Car: <span className="text-white">{review.carName}</span>
                    </p>
                  </div>

                  <div className="flex items-center mt-2 md:mt-0">
                    {[1, 2, 3, 4, 5].map((starPosition) => (
                      <Star
                        key={starPosition}
                        className={`w-5 h-5 ${
                          starPosition <= review.rating
                            ? "text-yellow-400 fill-current"
                            : "text-gray-500"
                        }`}
                      />
                    ))}
                  </div>
                </div>

                <p className="mt-4 text-white">{review.comment}</p>
              </div>
            ))
          )
        ) : (
          <p className="text-center text-gray-400">No reviews found</p>
        )}
      </div>
    </div>
  )
}

export default ReviewsList
