import {createSlice, createAsyncThunk} from "@reduxjs/toolkit"
import axios from "axios"

import { builderFullfilledFetchUserDetails, builderPendingFetchUserDetails, builderRejectedFetchUserDetails } from "./builderFunctions";
import {getCurrentLoggedinUserURL} from "../../BackendServerLinks"

export const fetchUserDetails = createAsyncThunk("user/fetchUserDetails", async () => {

    const data = await axios.get(getCurrentLoggedinUserURL, {withCredentials:true});
    return data.data.user;

})

const initialState = {
    isLoading : false,
    isLoggedin: false,
    data: null,
    isError: null
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers:{
        setUser: (state, action) => {
            state.data = action.payload;
            state.isLoggedin = true;
        },
        logoutUser: (state) => {
            state.data = null;
            state.isLoggedin = false;
        },
        trueUser: (state) => {
            state.isLoggedin = true;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchUserDetails.pending, builderPendingFetchUserDetails),
        builder.addCase(fetchUserDetails.fulfilled, builderFullfilledFetchUserDetails),
        builder.addCase(fetchUserDetails.rejected, builderRejectedFetchUserDetails)
    }
})

export const {setUser,logoutUser,trueUser} = userSlice.actions
export default userSlice.reducer;