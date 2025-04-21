import React, { useEffect, useMemo, useState } from "react";
import { Car, Fuel, Star } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addComment, getCar, getComment } from "../features/car/carSlice";
import { toast } from "react-toastify";
import Loader from "../components/Loader";
import { addRentals } from "../features/rentals/rentalSlice";

const CarDetails = () => {
  const { isLoading, isError, message, car, reviews } = useSelector(
    (state) => state.car
  );
  const { isRentalLoading, isRentalError, isRentalMessage, rental } = useSelector(
    (state) => state.rental
  );
  const {user}= useSelector(state=> state.auth)

  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [localComments, setLocalComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [rating, setRating] = useState(0);
  const [pickupDate, setPickupDate] = useState("");
  const [dropDate, setDropDate] = useState("");

  const memoizedCar = useMemo(() => car, [car]);

  useEffect(() => {
    dispatch(getCar(id));
    dispatch(getComment(id));
    window.scrollTo(0, 0);
  }, [id]);

  useEffect(() => {
    if (isError && message) {
      toast.error(message, { position: "top-center" });
    }
    if (isRentalError && isRentalMessage) {
      toast.error(isRentalMessage, { position: "top-center" });
    }
  }, [isError, message, isRentalError, isRentalMessage]);

  if (isLoading || isRentalLoading) {
    return <Loader />;
  }

  const allComments = [...reviews, ...localComments];

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if(!user){
      navigate('/login')
    }
    if (newComment.trim() !== "" && rating > 0) {
      setLocalComments([
        ...localComments,
        {
          comment: newComment,
          rating,
          userName: user.name,
          _id: Date.now().toString()
        }
      ]);
      dispatch(addComment({comment : newComment, rating, useName : user.name ,id : id}))
      setNewComment("");
      setRating(0);
      toast.success("Comment added!");
    } else {
      toast.warning("Please add both comment and rating", {
        position: "top-center"
      });
    }
  };

  const renderStars = (count) => {
    return [...Array(5)].map((_, i) => (
      <Star
        key={i}
        fill={i < count ? "#facc15" : "none"}
        stroke="#facc15"
        className="w-5 h-5"
      />
    ));
  };

  const formatDate = (dateString) => {
    const [year, month, day] = dateString.split("-");
    return `${month}/${day}/${year.slice(2)}`;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!user){
      navigate('/login')
    }

    if (!pickupDate || !dropDate) {
      toast.error("Please fill both dates", { position: "top-center" });
      return;
    }

    if (pickupDate > dropDate) {
      toast.error("Drop date must be after pickup date", {
        position: "top-center"
      });
      return;
    }
    const formattedPickup = formatDate(pickupDate);
    const formattedDrop = formatDate(dropDate);
    toast.success(`Booking from ${formattedPickup} to ${formattedDrop}`, {
      position: "top-center"
    });
    dispatch(addRentals({ id: id, pickupDate, dropDate })).then(() => {
      dispatch(getCar(id));
    });
    setPickupDate("");
    setDropDate("");
    setShowBookingForm(false);
  };

  return (
    <div className="min-h-screen bg-black p-10">
      <div className="max-w-7xl mx-auto bg-gradient-to-r from-black via-[#2A2A2A] to-[#050505]  shadow-[0_0_15px_2px_rgba(255,255,255,0.2)] hover:shadow-3xl transition duration-300 hover:scale-105 p-6 mb-10">
        <div className="grid md:grid-cols-2 gap-8 p-8">
          <div className="relative">
            <img
              src={car.image}
              alt={car.name}
              className="w-full h-full object-cover rounded-lg"
            />
          </div>

          <div>
            <h1 className="text-4xl font-bold text-white mb-4">{car.name}</h1>
            <div className="text-2xl font-bold text-green-700">
              ₹{car.rate}
              <span className="text-white text-lg">/Day</span>
            </div>
            <p className="text-white mb-8">{car?.description}</p>
            <div className="grid grid-cols-2 gap-6 mb-8">
              <div className="flex items-center gap-2">
                <Car className="w-5 h-5 text-white" />
                <span className="text-white uppercase">Category: {car.category}</span>
              </div>
              <div className="flex items-center gap-2">
                <Car className="w-5 h-5 text-white" />
                <span className="text-white uppercase">Company: {car.company}</span>
              </div>
              <div className="flex items-center gap-2">
                <Fuel className="w-5 h-5 text-white" />
                <span className="text-white uppercase">Fuel Type: {car.fuelType}</span>
              </div>
              <div className="flex items-center gap-2">
                <Car className="w-5 h-5 text-white" />
                <span className="text-white uppercase">Registration: {car.registration}</span>
              </div>
            </div>
            <button
              disabled={car.isBooked}
              onClick={() => !car.isBooked && setShowBookingForm(true)}
              className={
                car.isBooked
                  ? "w-full bg-gray-500 text-white py-3 rounded-lg text-lg font-semibold hover:bg-gray-600 transition uppercase disabled:cursor-not-allowed"
                  : "w-full uppercase bg-green-500 text-white py-3 rounded-lg text-lg font-semibold hover:bg-green-600 transition"
              }
            >
              {car.isBooked ? "unavailable" : "book now"}
            </button>
          </div>
        </div>
      </div>

      {showBookingForm && (
        <div className="bg-gradient-to-r from-black via-[#2A2A2A] to-[#050505]  shadow-[0_0_15px_2px_rgba(255,255,255,0.2)] hover:shadow-3xl transition duration-300 hover:scale-105mb-10 p-6 rounded-lg  mt-10 mx-15 border">
          <h2 className="text-2xl font-semibold mb-4 text-white">Booking Details</h2>
          <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label className="text-white mb-2">Pickup Date</label>
              <input
                type="date"
                value={pickupDate}
                onChange={(e) => setPickupDate(e.target.value)}
                min={new Date().toISOString().split("T")[0]}
                className="border p-2 rounded-lg bg-white "
              />
            </div>
            <div className="flex flex-col">
              <label className="text-white mb-2">Drop Date</label>
              <input
                type="date"
                value={dropDate}
                onChange={(e) => setDropDate(e.target.value)}
                min={new Date().toISOString().split("T")[0]}
                className="border p-2 rounded-lg bg-white"
              />
            </div>
            <div className="md:col-span-2 mt-4">
              <button
                type="submit"
                className="bg-green-600 text-white py-2 px-6 rounded-lg hover:bg-green-700 transition"
              >
                Confirm Booking
              </button>
              <button
                type="button"
                onClick={() => setShowBookingForm(false)}
                className="ml-4 text-red-500 hover:underline"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="w-full mx-auto bg-gradient-to-r from-black via-[#2A2A2A] to-[#050505]  shadow-[0_0_15px_2px_rgba(255,255,255,0.2)] hover:shadow-3xl transition duration-300 hover:scale-105mb-10 p-8 rounded-lg mt-5">
        <h2 className="text-2xl font-bold text-white mb-4">Comments & Ratings</h2>

        <form onSubmit={handleCommentSubmit} className="mb-6">
          <textarea
            className="w-full p-3 border bg-white rounded-lg mb-2"
            rows="4"
            placeholder="Write a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          ></textarea>

          <div className="flex items-center gap-2 mb-4">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                onClick={() => setRating(star)}
                fill={star <= rating ? "#facc15" : "none"}
                stroke="#facc15"
                className="w-6 h-6 cursor-pointer"
              />
            ))}
            <span className="text-sm text-white">{rating} / 5</span>
          </div>

          <button
            type="submit"
            className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition"
          >
            Submit
          </button>
        </form>

        <div>
          {allComments.length > 0 ? (
            allComments.map((review) => (
              <div key={review._id} className="p-4 border border-gray-200 mb-2">
                <div className="flex items-center gap-2 my-2">
                  {renderStars(review.rating)}
                </div>
                <p className="text-white uppercase">user: {review.userName}</p>
                <p className="text-white uppercase">review: {review.comment}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-400">No comments yet. Be the first to comment!</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CarDetails;