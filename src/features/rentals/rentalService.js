
import axios from "axios";

// fetch user rentals
const fetchUserRentals = async (token) => {
 
    const options = {
      headers: {
        authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.get(`/api/rentals`,options)
    return response.data
 
};

// fetch single rental

const fetchUserRental = async (rid,token) => {
 
    const options = {
      headers: {
        authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.get(`/api/rentals/${rid}`,options)
    return response.data
 
};

// create rental user
const createRentals = async (formData, token) => {
    const options = {
      headers: {
        authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.post(`/api/rentals/${formData.id}`, formData, options);
    console.log(response.data);
    
    return response.data;
  };

export const rentalService = {fetchUserRental,fetchUserRentals,createRentals}