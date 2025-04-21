import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authService from "./authService";

const userExist = JSON.parse(localStorage.getItem('user'))
const authSlice = createSlice({
    name : "auth",
    initialState :{
        user : userExist || null,
        isLoading : false,
        isSuccess : false,
        isError : false,
        message : ""
    },
    reducers :(state,action)=>{

    },
    extraReducers :(builder)=>{
        builder
        .addCase(userRegister.pending,(state,action)=>{
            state.isLoading = true
            state.isSuccess =false
            state.isError = false
        })
        .addCase(userRegister.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isSuccess =true
            state.user = action.payload
            state.isError = false
        })
        .addCase(userRegister.rejected,(state,action)=>{
            state.isLoading = false
            state.isSuccess =false
            state.isError = true
            state.message = action.payload
        })
        .addCase(userLogout.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isSuccess =true
            state.user = null
            state.isError = false
        })
        .addCase(userLogin.pending,(state,action)=>{
            state.isLoading = true
            state.isSuccess =false
            state.isError = false
        })
        .addCase(userLogin.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isSuccess =true
            state.user = action.payload
            state.isError = false
        })
        .addCase(userLogin.rejected,(state,action)=>{
            state.isLoading = false
            state.isSuccess =false
            state.isError = true
            state.message = action.payload
        })
    }
})
export default authSlice.reducer

//USER REGISTER

export const userRegister= createAsyncThunk("USER/REG",async(formData,{rejectWithValue})=>{
    try {
    return await authService.register(formData)
    } catch (error) {
        return rejectWithValue(error.response?.data.message || "somthing else")
        
    }
})

//USER LOGOUT

export const userLogout = createAsyncThunk("USER/LOGOUT",async()=>{
   localStorage.removeItem('user')
})

//USER LOGIN

export const userLogin= createAsyncThunk("USER/LOGIN",async(formData,{rejectWithValue})=>{
    try {
    return await authService.login(formData)
    } catch (error) {
        return rejectWithValue(error.response?.data.message || "somthing else")
        
    }
})