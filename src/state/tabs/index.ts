import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {FetchTabCandlesRequest, TabI, TabManagerState} from "../types";
import {environment} from "../../environments/environment";
import {BinanceClient} from "../../clients/binance/binance-client";
import {KlineModel} from "../../clients/binance/models/kline.model";


export const fetchCandles = createAsyncThunk<KlineModel[], FetchTabCandlesRequest>(
    'tabs/fetchCandles',
    async (request) => {
        const binance = new BinanceClient(environment, environment.binanceUrl!, '', '');
        if(request.startTime && request.endTime) {
            if(request.endTime - request.startTime < 180000) {
                return [];
            }
        }
        return binance.getCompleteHistoricalData(
            request.symbol,
            request.startTime,
            request.endTime,
            request.interval,
            request.limit
        );
    }
)


export const tabsSlice = createSlice({
    name: 'tabs',
    initialState: {
        selectedTab: 0,
        tabs: []
    } as TabManagerState,
    reducers: {
        addTab: (state, action: PayloadAction<TabI>) => {
            const currentIndex = state.tabs.findIndex(item => item.symbol === action.payload.symbol);
            if(currentIndex === -1) {
                state.tabs.push(action.payload);
                state.selectedTab = state.tabs.length - 1;
            }else {
                const orderIndex = state.tabs[currentIndex].orders.findIndex(item => item.orderId === action.payload.orders[0].orderId);
                if(orderIndex === -1) {
                    state.tabs[currentIndex].orders.push(action.payload.orders[0]);
                }
                state.selectedTab = currentIndex;
            }
        },
        removeTab: (state, action: PayloadAction<TabI>) => {
            const currentIndex = state.tabs.findIndex(item => item.symbol === action.payload.symbol);
            if(currentIndex > -1) {
                state.tabs = state.tabs.filter(tab => tab.symbol !== action.payload.symbol);
            }
            if(state.selectedTab >= state.tabs.length) {
                state.selectedTab = state.tabs.length - 1;
                console.log(state.selectedTab);
            }
        },
        changeFocus: (state, action: PayloadAction<TabI>) => {
            const index = state.tabs.findIndex(item => item.symbol === action.payload.symbol);
            if(index > -1) {
                state.selectedTab = index;
            }
        }
    },
    extraReducers: builder => {
        builder.addCase(fetchCandles.fulfilled, (state, action) => {
            const index = state.tabs.findIndex(item => item.symbol === action.meta.arg.symbol);
            if(index > -1) {
                if(action.meta.arg.append) {
                    state.tabs[index].candles.push(...action.payload);
                }else {
                    state.tabs[index].candles = action.payload;
                }
            }
        })
        builder.addCase(fetchCandles.rejected, (state, action) => {
            console.log('error', action.error);
        })
    }
});

export const {addTab, changeFocus, removeTab} = tabsSlice.actions;

export const tabsReducer = tabsSlice.reducer;
