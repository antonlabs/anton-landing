import {Order, SearchOrder, SearchOrderListId, sides} from "../types";

export const findOrderById = (search: SearchOrder, orders: Order[]): Order | undefined => {
    for(const order of orders) {
        if(order.orderId === search.orderId) {
            return order;
        }
        if(order.parentOrder) {
            const nestedOrder = findOrderById(search, [order.parentOrder]);
            if(nestedOrder) {
                return nestedOrder;
            }
        }
    }
}

export const findOrderByOrderListId = (search: SearchOrderListId, orders: Order[]): Order | undefined => {
    for(const order of orders) {
        if(order.orderListId === search.orderListId) {
            return order;
        }
        if(order.parentOrder) {
            const nestedOrder = findOrderByOrderListId(search, [order.parentOrder]);
            if(nestedOrder) {
                return nestedOrder;
            }
        }
    }
}

export const groupByOrderListId = (walletName: string, side: sides, orders: Order[]): Order[] => {
    const result = [];
    const garbage = [];
    for(const order of orders) {
        if(garbage.indexOf(order.orderId) > -1) continue;
        if(order.orderListId !== -1) {
            order.attachedOrder = JSON.parse(JSON.stringify(findOrderByOrderListId({orderListId: order.orderListId, side, walletName}, orders)));
            garbage.push(order.attachedOrder?.orderId);
        }
        result.push(order);
    }
    return result;
}
