import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {DeviceState} from "../types";


export const deviceSlice = createSlice({
    name: 'device',
    initialState: {
        screenWidth: window.innerWidth,
        isMobile: window.innerWidth <= 768
    } as DeviceState,
    reducers: {
        setWidth: (state, action: PayloadAction<number>) => {
            state.screenWidth = action.payload;
            state.isMobile= action.payload <= 768;
        }
    }
})

export const {setWidth} = deviceSlice.actions;

export const deviceReducer = deviceSlice.reducer;
