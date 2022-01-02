import {AiOutlineArrowDown, AiOutlineArrowUp} from "react-icons/all";
import './EarningsBox.scss';

export const EarningsBox = (props: {earnings: number}) => {
    return (
        <div className={'earnings-box ' + (props.earnings < 0 ? 'bg-danger' : 'bg-active')} >
            {
                props.earnings !== 0 ? props.earnings > 0 ?
                    <AiOutlineArrowUp/> :
                    <AiOutlineArrowDown/> : <></>
            }
            <h4>{Math.floor(props.earnings)}$</h4>
        </div>
    );
}
