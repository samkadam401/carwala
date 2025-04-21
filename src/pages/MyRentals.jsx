import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Loader from '../components/Loader';
import { Link, useParams } from 'react-router-dom';
import { userRentals } from '../features/rentals/rentalSlice';
const MyRentals = () => {
    const { rentals, isRentalLoading,isRentalError,isRentalMessage } = useSelector(state => state.rental);
    const dispatch = useDispatch();
 
      

    useEffect(() => {
        dispatch(userRentals());
    }, [dispatch]);

useEffect(()=>{
if(isRentalError && isRentalMessage){
    toast.error(isRentalMessage,{
        position : "top-center"
    })
}
},[isRentalError,isRentalMessage])

const formattedDate = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
}).format(new Date());
       

    return (
        <div className="w-full min-h-screen bg-black py-10 px-4">
            <h1 className="text-3xl md:text-4xl font-bold text-center text-white mb-10">
                My Rentals
            </h1>
         

            {isRentalLoading ? (
                <Loader />
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                    {rentals?.length > 0 ? (
                        rentals.map((rental) => (
                            <div
                                key={rental._id}
                                className="bg-gradient-to-r from-black via-[#2A2A2A] to-[#050505] shadow-[0_0_15px_2px_rgba(255,255,255,0.2)] hover:shadow-3xl transition duration-300 hover:scale-105 rounded-xl overflow-hidden flex flex-col"
                            >
                                <img
                                    src={rental?.car?.image}
                                    alt={rental?.car?.name}
                                    className="w-full h-50 md:h-50 object-cover"
                                />
                                <div className="p-5 flex flex-col gap-2">
                                    <h2 className="text-xl font-semibold text-white">
                                        {rental?.car?.name}
                                    </h2>
                                    <p className="text-sm text-white">
                                        Rental: <span className="font-medium">{rental.pickupDate}</span> →{" "}
                                        <span className="font-medium text-white">{rental.dropDate}</span>
                                    </p>
                                    <p className="text-white font-semibold">
                                        ₹{rental?.car?.rate} / Day
                                    </p>
                                    <span className="inline-block bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded-full w-max">
                                        {rental.dropDate >= formattedDate ? "ACTIVE" : "COMPLETED"}
                                    </span>
                                    
                                    <Link
                                        to={`/myRentals/${rental?.car?.rental}`}
                                        className="w-full bg-amber-600 p-2 rounded-md text-center text-white font-medium hover:bg-amber-700"
                                    >
                                        View rental details
                                    </Link>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-center col-span-full text-white text-lg">
                            No rentals found.
                        </p>
                    )}
                </div>
            )}
        
            
        </div>
    );
};

export default MyRentals;
