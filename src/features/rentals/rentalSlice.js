import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { rentalService } from "./rentalService";

const rentalSlice = createSlice({
    name : "rental",
    initialState : {
        rentals : [],
        rental : {},
        
        isRentalLoading : false,
        isRentalSuccess : false,
        isRentalError : false,
        isRentalMessage : ""
    },
    reducers : {
      
    },
    extraReducers : (builder)=>{
        builder
        .addCase(userRentals.pending, (state) => {
            state.isRentalError = true;
          })
          .addCase(userRentals.fulfilled, (state, action) => {
            state.isRentalLoading = false;
            state.isRentalSuccess = true;
            state.rentals = action.payload;
            state.isRentalError = false;
          })
          .addCase(userRentals.rejected, (state, action) => {
            state.isRentalLoading = false;
            state.isRentalSuccess = false;
            state.isRentalError = true;
            state.isRentalMessage = "";
            state.rentals = []
          })
          .addCase(userRental.pending, (state) => {
            state.isRentalError = true;
          })
          .addCase(userRental.fulfilled, (state, action) => {
            state.isRentalLoading = false;
            state.isRentalSuccess = true;
            state.rental = action.payload;
            state.isRentalError = false;
          })
          .addCase(userRental.rejected, (state, action) => {
            state.isRentalLoading = false;
            state.isRentalSuccess = false;
            state.isRentalError = true;
            state.isRentalMessage = "";
            state.rental = {}
          })
          .addCase(addRentals.pending, (state) => {
            state.isRentalError = true;
          })
          .addCase(addRentals.fulfilled, (state, action) => {
            state.isRentalLoading = false;
            state.isRentalSuccess = true;
            state.rental = action.payload;
            state.isRentalError = false;
          })
          .addCase(addRentals.rejected, (state, action) => {
            state.isRentalLoading = false;
            state.isRentalSuccess = false;
            state.isRentalError = true;
            state.isRentalMessage = "";
            
          })
          

    }
})
export default rentalSlice.reducer

// get rentals (user)

export const userRentals = createAsyncThunk("USER/RENTALS", async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await rentalService.fetchUserRentals(token);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data.message || "Something went wrong"
      );
    }
  });

  // get single rental (user)

export const userRental = createAsyncThunk("USER/RENTAL", async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await rentalService.fetchUserRental(id,token);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data.message || "Something went wrong"
      );
    }
  });
  
  // create user rentals
  
  export const addRentals = createAsyncThunk("ADD/RENTAL", async (formData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await rentalService.createRentals(formData,token);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data.message || "Something went wrong"
      );
    }
  });

