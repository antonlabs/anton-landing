import {Order, SearchOrder, sides} from "../../state/types";
import './OrderCard.scss';
import {Button} from "../Button/Button";
import {useNavigate} from "react-router-dom";
import {AiOutlineBarChart} from "react-icons/all";
import {useAppDispatch} from "../../state";
import { toggleExpandParentOrder } from "../../state/orders";
import {addTab, fetchCandles} from "../../state/tabs";
import {OrderTypeCard} from "../OrderTypeCard/OrderTypeCard";


const getOrderGroup = (
    components: JSX.Element[],
    o: Order,
    navigate: any,
    dispatch: any,
    walletName: string,
    side: sides
): JSX.Element[] => {
    const {parentOrder} = o;
    components.push(
        <div key={o.orderId + '-sub'} className={'order ' + (components.length > 0 ? 'sub ' + (o.open ? 'hide' : '') : '')}>
            <h5>{o.symbol}</h5>
            <span>{parseFloat(o.price).toString()}</span>
            <span>{o.stopPrice ? parseFloat(o.stopPrice).toString() : 'None'}</span>
            <OrderTypeCard order={o} />
            {parentOrder ?
                <Button extraClasses={['icon', 'parent-order']} onClick={() => {
                    const q: SearchOrder = {
                        orderId: parentOrder.orderId,
                        walletName: walletName,
                        side
                    };
                    dispatch(toggleExpandParentOrder(q))
                }}>
                    Toggle
                </Button> :
                <span className={'parent-order'}>No parent order</span>
            }

            <Button extraClasses={['icon']} onClick={() => {
                dispatch(addTab({
                    symbol: o.symbol,
                    orders: [o],
                    candles: []
                }));
                dispatch(fetchCandles({
                    symbol: o.symbol,
                    limit: 100
                }));
            }}>
                <AiOutlineBarChart />
            </Button>
        </div>
    );
    if(parentOrder) {
        return getOrderGroup(components, parentOrder, navigate, dispatch, walletName, side);
    }
    return components;
};

export const OrderCard = (props: {order: Order, walletName: string, side: sides}) => {
    const o = props.order;
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const orders = getOrderGroup([], o, navigate, dispatch, props.walletName, props.side);

    return (
        <div className={'order-group'}>
            {orders}
        </div>
    );
}
