import {AllOrders, Order, OrdersPayload, sides} from "../types";
import {useAppDispatch, useAppSelector} from "../index";
import {useEffect} from "react";
import {fetchOrders} from "./index";
import {useCurrentProfile} from "../profiles/hooks";

export const useOrders = (): OrdersPayload => {
    return useAppSelector((state) => state.orders);
}

export const useWalletOrders = (walletName: string): AllOrders => {
    return useAppSelector((state) => state.orders[walletName]);
}

export const useOrdersBySide = (walletName: string, side: sides): Order[] => {
    return useAppSelector((state) => {
        if(state.orders[walletName]) {
            return state.orders[walletName][side]
        }
        return [];
    });
}

export const useOrdersByOrderListId = (walletName: string, side: sides, orderListId: number): Order[] => {
    return useAppSelector((state) => {
        if(state.orders[walletName]) {
            return state.orders[walletName][side].filter(item => item.orderListId === orderListId)
        }
        return [];
    });
}

export const useFetchOrdersBySide = (side: sides) => {
    const dispatch = useAppDispatch();
    const profile = useCurrentProfile();

    useEffect(() => {
        console.log('currentProfile', profile);
        const req = {side, profile};
        if(req.profile) {
            dispatch(fetchOrders(req))
        }
    }, [side, profile, dispatch]);
}
