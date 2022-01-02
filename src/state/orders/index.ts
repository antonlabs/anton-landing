import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {
    AddOrders,
    FetchOrder,
    FetchResponse, Order,
    OrdersPayload,
    RemoveOrders,
    SearchOrder
} from "../types";
import {useDynamo} from "../profiles/helpers";
import {ScanCommand} from "@aws-sdk/client-dynamodb";
import {environment} from "../../environments/environment";
import {pageChunksLimit} from "../../config/constants";
import {findOrderById, groupByOrderListId} from "./helpers";
const { unmarshall } = require("@aws-sdk/util-dynamodb");


export const fetchOrders = createAsyncThunk<FetchResponse, FetchOrder>(
    'orders/fetch',
    async (request) => {
        return useDynamo(request.profile, async (client) => {
            const orders = ((await client.send(new ScanCommand({
                TableName: `${environment.name}-${request.profile.wallet.name}-${request.side}-orders`,
                Limit: pageChunksLimit
            }))).Items ?? []).map(unmarshall) as any;

            return {
                side: request.side,
                walletName: request.profile.wallet.name,
                orders: groupByOrderListId(request.profile.wallet.name, request.side, orders)
            };
        });
    }
)


export const ordersSlice = createSlice({
    name: 'orders',
    initialState: {} as OrdersPayload,
    reducers: {
        addOrders: (state, action: PayloadAction<AddOrders>) => {
            state[action.payload.walletName][action.payload.side].push(...action.payload.orders);
        },
        removeOrder: (state, action: PayloadAction<RemoveOrders>) => {

        },
        toggleExpandParentOrder: (state, action: PayloadAction<SearchOrder>) => {
            const order = findOrderById(action.payload, state[action.payload.walletName][action.payload.side]);
            console.log(order, JSON.parse(JSON.stringify(state[action.payload.walletName][action.payload.side])));
            const toggle = (o: Order, open?: boolean) => {
                o.open = !(open ?? (o.open ?? false));
                if(o.parentOrder) {
                    toggle(o.parentOrder, !(open ?? (o.open ?? false)));
                }
            }
            if(order) {
                toggle(order);
            }
        }
    },
    extraReducers: builder => {
        builder.addCase(fetchOrders.pending, (state, action) => {
            const walletName = action.meta.arg.profile.wallet.name;
            if(!state[walletName]) {
                state[walletName] = {
                    buy: [],
                    sell: [],
                    history: [],
                    loading: true
                }
            }else {
                state[walletName].loading = true;
            }
        })
        builder.addCase(fetchOrders.fulfilled, (state, action: PayloadAction<FetchResponse>) => {
            state[action.payload.walletName][action.payload.side] = action.payload.orders;
        })
    }
})

export const {toggleExpandParentOrder} = ordersSlice.actions;

export const ordersReducer = ordersSlice.reducer;
