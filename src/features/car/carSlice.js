import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import carService from "./carService";

const carSlice = createSlice({
  name: "car",
  initialState: {
    cars: [],
    car: {},
    reviews : [],
    review : {},
    edit : {car : {}, isEdit : false},
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: "",
    currentPage: 1, 
    totalPages: 1,       // Add totalPages
    totalItems: 0,   
    
  },
  reducers: {
  editCar : (state,action)=>{
    return{
      ...state,
      edit : {car : action.payload , isEdit : true}
    }
  }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCars.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
      })
      .addCase(getCars.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.cars = action.payload.cars;  // Cars array
        state.totalPages = action.payload.pagination.pages;  // Total pages
        state.currentPage = action.payload.pagination.page;  // Current page
        state.isError = false;
      })
      .addCase(getCars.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getCar.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
      })
      .addCase(getCar.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.car = action.payload;
        state.isError = false;
      })
      .addCase(getCar.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(findCar.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
      })
      .addCase(findCar.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.cars = action.payload;
        state.isError = false;
      })
      .addCase(findCar.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(addCar.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
      })
      .addCase(addCar.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        // Newest car top pe dikh rahi hai (max 100)
        state.cars = [action.payload, ...state.cars].slice(0, 100);
      })
      .addCase(addCar.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(removeCar.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
      })
      .addCase(removeCar.fulfilled, (state, action) => {
  const id = action.payload?.id || action.payload?._id;
  if (!id) return;
  state.cars = state.cars.filter(car => car._id !== id);
})
      .addCase(removeCar.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateCar.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
      })
      .addCase(updateCar.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.cars = state.cars.map((item)=> item._id === action.payload?._id ? action.payload : item )
        state.edit = {car : {}, isEdit : false}
      })
      .addCase(updateCar.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getRentals.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
      })
      .addCase(getRentals.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.cars = action.payload;
        state.isError = false;
      })
      .addCase(getRentals.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getReviews.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
      })
      .addCase(getReviews.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.reviews = action.payload;
        state.isError = false;
      })
      .addCase(getReviews.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getComment.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
      })
      .addCase(getComment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.reviews = action.payload;
        state.isError = false;
      })
      .addCase(getComment.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
        state.reviews = []
      })
      .addCase(addComment.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
      })
      .addCase(addComment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.review = action.payload;
        state.isError = false;
      })
      .addCase(addComment.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
        state.review = {}
      })
      
  },
});
export const {editCar}= carSlice.actions

export default carSlice.reducer;




// get rentals (admin)
export const getRentals = createAsyncThunk("GET/RENTALS", async (_, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token
    return await carService.fetchRentals(token);
  } catch (error) {
    return thunkAPI.rejectWithValue(
      error.response?.data.message || "Something went wrong"
    );
  }
});


// add car (Admin)
export const addCar = createAsyncThunk(
  "ADD/CAR",
  async (formData, { getState, rejectWithValue }) => {
    const token = getState().auth.user.token;
    try {
      return await carService.createCar(formData, token);
    } catch (error) {
      return rejectWithValue(
        error.response?.data.message || "Something went wrong"
      );
    }
  }
);

// remove car (Admin)
export const removeCar = createAsyncThunk(
  "REMOVE/CAR",
  async (id, { getState, rejectWithValue }) => {
    const token = getState().auth.user.token;
    try {
      return await carService.deleteCar(id, token);
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Something went wrong"
      );
    }
  }
);

// update car (admin)
export const updateCar = createAsyncThunk(
  "UPDATE/CAR",
  async ({id,formData},{ getState, rejectWithValue }) => {
    const token = getState().auth.user.token;
    try {
      return await carService.update(id,formData, token);
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Something went wrong"
      );
    }
  }
);

// get reviews (admin)
export const getReviews = createAsyncThunk("GET/REVIEWS", async (_, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token
    return await carService.fetchReviews(token);
  } catch (error) {
    return thunkAPI.rejectWithValue(
      error.response?.data.message || "Something went wrong"
    );
  }
});

// get cars (user)
export const getCars = createAsyncThunk(
  "GET/CARS",
  async ({ page = 1, limit = 10 } = {}, thunkAPI) => { 
    try {
      const response = await carService.fetchCars(page, limit); 
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Something went wrong"
      );
    }
  }
);

// get car (user)
export const getCar = createAsyncThunk("GET/CAR", async (id, thunkAPI) => {
try {
  return await carService.fetchCar(id);
} catch (error) {
  return thunkAPI.rejectWithValue(
    error.response?.data.message || "Something went wrong"
  );
  
}
});

// find car (user)
export const findCar = createAsyncThunk("FIND/CAR", async (query, thunkAPI) => {
  try {
    return await carService.searchCar(query);
  } catch (error) {
    return thunkAPI.rejectWithValue(
      error.response?.data.message || "Something went wrong"
    );
  }
});

// get comment (user)
export const getComment = createAsyncThunk("GET/COMMENT", async (id, thunkAPI) => {
  const token = thunkAPI.getState().auth.user.token
  try {
    return await carService.fetchComment(id,token);
  } catch (error) {
    return thunkAPI.rejectWithValue(
      error.response?.data.message || "Something went wrong"
    );
  }
  });

  // add comment
  export const addComment = createAsyncThunk("ADD/COMMENT",async(formData,thunkAPI)=>{
    const token = thunkAPI.getState().auth.user.token
    console.log(token);
    
    try {
    return await carService.createComment(formData,token)
    } catch (error) {
          return thunkAPI.rejectWithValue(
      error.response?.data.message || "Something went wrong")
    }
  })


