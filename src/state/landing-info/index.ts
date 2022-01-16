import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {LandingInfo} from "../types";
import {getTotalTransactions} from "./helpers";


export const fetchTotalTransactions = createAsyncThunk<number>(
    'landingInfo/totalTransactions',
    async () => {
        return getTotalTransactions();
    }
)

export const languages = ['en', 'it'];


export const landingInfoSlice = createSlice({
    name: 'landingInfo',
    initialState: {
        totalTransactions: 0
    } as LandingInfo,
    reducers: {
        setLanguage: (state: LandingInfo, action: PayloadAction<string>) => {
            state.language = (languages.indexOf(action.payload) > -1 ? action.payload : 'en') as 'en' | 'it';
        }
    }
});
