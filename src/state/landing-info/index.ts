import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {LandingInfo} from "../types";
import {getTotalTransactions} from "./helpers";


export const fetchTotalTransactions = createAsyncThunk<number>(
    'landingInfo/totalTransactions',
    async () => {
        return getTotalTransactions();
    }
)


export const landingInfoSlice = createSlice({
    name: 'landingInfo',
    initialState: {
        totalTransactions: 0
    } as LandingInfo,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(fetchTotalTransactions.fulfilled, (state, action) => {
            console.log(action.payload);
            state.totalTransactions = action.payload;
        })

    }
});
