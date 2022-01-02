import "./PriceTab.scss"
import {SpaceHole} from "../SpaceHole/SpaceHole";
import {AiFillDollarCircle} from "react-icons/all";


export const PriceTab = (props: {unitsNumber: number, price: number, icon: any}) => {
    return <SpaceHole>
        <div className={'price-tab'}>
            {props.icon}
            <h2>{props.unitsNumber} units</h2>
            <div className={'flex-row'}>
                <AiFillDollarCircle />
                <h2>{props.price} / month</h2>
            </div>
        </div>
    </SpaceHole>
}
