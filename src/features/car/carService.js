import axios from "axios";


// fetch cars user
const fetchCars = async (page = 1, limit = 100) => {
  const response = await axios.get(`/api/car?page=${page}&limit=${limit}`);
  return response.data;
};


// create car (admin)
const createCar = async (formData, token) => {
  const options = {
    headers: {
      authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post("/api/admin/car", formData, options);
  return response.data.car;
};

// remove car (admin)
const deleteCar = async (id, token) => {
  const options = {
    headers: {
      authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.delete("/api/admin/car/" + id , options); 
  return response.data.car;
};

// update car (admin)
const update = async (id, formData, token) => {
  try {
    const options = {
      headers: {
        authorization: `Bearer ${token}`,
      },
    };
    

    const response = await axios.put(`/api/admin/car/${id}`, formData, options)
    return response.data.car;
  } catch (error) {
    console.error("Update error:", error.response?.data || error.message);
    throw error;
  }
};

// fetch rentals (admin)

const fetchRentals = async (token) => {
 
    const options = {
      headers: {
        authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.get(`/api/admin/rentals`,options)
    const rental = response.data.users.filter((user)=> user.rentals.length > 0 )
    
    return rental;
 
};




const fetchReviews = async (token) => {
  try {
    const options = {
      headers: {
        authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.get(`/api/admin/reviews`,options)
  return response.data.userWithReviews
  } catch (error) {
    console.error("Update error:", error.response?.data || error.message);
    throw error;
  }
};

// fetch car

const fetchCar = async (id) => {
  const response = await axios.get(`/api/car/${id}`);
  return response.data;
};

// fetch comment

const fetchComment = async (id,token) => {
  let options = {
    headers : {
      authorization : `Bearer ${token}`
    }
  }
  const response = await axios.get(`/api/car/${id}/reviews`,options);  
  return response.data;
};

// find car user
const searchCar = async (query) => {
  const response = await axios.get(`/api/car/search?query=${query}`);
  return response.data;
};

// create car (admin)
const createComment = async (formData, token) => {
  const options = {
    headers: {
      authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(`/api/car/${formData.id}/reviews/add`,formData,options);
  return response.data;
};



const carService = { fetchCars, fetchCar, searchCar, createCar,deleteCar,update,fetchRentals,fetchReviews,fetchComment,createComment };
export default carService;
