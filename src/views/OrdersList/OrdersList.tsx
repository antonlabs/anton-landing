import './OrdersList.scss';
import {useCurrentProfile} from "../../state/profiles/hooks";
import {useFetchOrdersBySide, useOrdersBySide} from "../../state/orders/hooks";
import {sides} from "../../state/types";
import {OrderCard} from "../../components/OrderCard/OrderCard";
import {Navigate} from "react-router-dom";
import {NoDataFound} from "../../components/NoDataFound/NoDataFound";


export const OrdersList = (props: {side: sides}) => {
    const profile = useCurrentProfile();
    const side = props.side;
    const orders = useOrdersBySide(profile.wallet.name, side as sides);
    const orderCardList = orders.map(order => <OrderCard key={order.orderId+'-master'} order={order} walletName={profile.wallet.name} side={side} />);

    useFetchOrdersBySide(side);

    if(!profile) {
        return <Navigate to={'/'}/>
    }

    return (
        <div className={'container'}>
            <div className={'title-page'}>
                <h4>{side} orders</h4>
            </div>
            <div className={'order-list'}>
                <div className={'header'}>
                    <h5>Symbol</h5>
                    <h5>Price</h5>
                    <h5>Stop price</h5>
                    <h5>Type</h5>
                    <h5 className={'parent-order'}>Parent order</h5>
                    <h5>Tools</h5>
                </div>
                {orderCardList.length > 0 ? orderCardList : <NoDataFound message={'No data found'}/>}
            </div>
        </div>
    );
}

