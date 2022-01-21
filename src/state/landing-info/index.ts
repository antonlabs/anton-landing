import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
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
        totalTransactions: 0,
        cookiesAccepted: false
    } as LandingInfo,
    reducers: {
        setCookiesAccepted: (state: LandingInfo, action: PayloadAction<boolean>) => {
            state.cookiesAccepted = action.payload;
        }
    }
});


export const landingInfoReducer = landingInfoSlice.reducer;
export const {setCookiesAccepted} = landingInfoSlice.actions;
