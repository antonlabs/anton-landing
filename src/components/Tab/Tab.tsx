import {TabI} from "../../state/types";
import './Tab.scss';
import {Button} from "../Button/Button";
import {AiOutlineClose} from "react-icons/all";
import {useAppDispatch} from "../../state";
import {changeFocus, removeTab} from "../../state/tabs";

export const Tab = (props: {tab: TabI, selected: boolean}) => {
    const dispatch = useAppDispatch();

    return (
        <div onClick={() => {
            dispatch(changeFocus(props.tab));
        }} className={"tab " + (props.selected ? 'selected' : '')}>
            {props.tab.symbol}
            <Button onClick={() => dispatch(removeTab(props.tab))} extraClasses={['icon', 'close']}>
                <AiOutlineClose/>
            </Button>
        </div>
    );
}
