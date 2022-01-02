import {Order, TabI} from "../../state/types";
import React from "react";
import {ReflexContainer, ReflexElement, ReflexSplitter} from "react-reflex";
import {useDevice} from "../../state/device/hooks";
import {KlineModel} from "../../clients/binance/models/kline.model";
import {CandleStickChart} from "../CandleStickChart/CandleStickChart";
import {OrderTypeCard} from "../OrderTypeCard/OrderTypeCard";
import "./SymbolChart.scss";


export const SymbolChart = (props: {tab: TabI, candles: KlineModel[]}): any => {
    const device = useDevice();
    let orientation: 'horizontal' | 'vertical' = device.isMobile ? 'horizontal' : 'vertical';

    const orderList = props.tab.orders.map((order) => <div key={order.orderId+'-mini'} className={'order-row flex-row'}>{order.price} <OrderTypeCard order={order} /></div> )

    return (
        <ReflexContainer className={'view'} orientation={orientation}>
            <ReflexElement flex={0.6}>
                <CandleStickChart candles={props.candles} />
            </ReflexElement>
            <ReflexSplitter />
            <ReflexElement flex={0.4}>
                <h5 className={'mt-1em'}>
                   Orders
                </h5>
                {orderList}
            </ReflexElement>
        </ReflexContainer>
    );
};
