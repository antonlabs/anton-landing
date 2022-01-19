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
        totalTransactions: 0
    } as LandingInfo,
    reducers: {
        setTotalTransaction: (state: LandingInfo, action: PayloadAction<number>) => {}
    }
});
