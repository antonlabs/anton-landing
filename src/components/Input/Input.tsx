import './Input.scss';
import {UseFormRegisterReturn} from "react-hook-form";


export const Input = (props: {register: UseFormRegisterReturn}) => (
    <input className={'anton-input'} {...props.register} />
)
