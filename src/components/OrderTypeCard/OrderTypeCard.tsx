import {Order} from "../../state/types";
import './OrderTypeCard.scss';

const codeToLabel: {[key: string]: string} = {
    STOP_LOSS_LIMIT: 'Stop',
    LIMIT_MAKER: 'Limit',
    MARKET: 'Market'
};


export const OrderTypeCard = (props: {order: Order}) => {
    return (
        <div className={'order-type'}>
            <div className={'content ' + props.order.side.toLowerCase()}>
                {codeToLabel[props.order.type] ?? props.order.type}
            </div>
        </div>
    );
}
