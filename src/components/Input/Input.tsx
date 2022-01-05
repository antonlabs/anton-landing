import './Input.scss';
import {UseFormRegisterReturn} from "react-hook-form";


export const Input = (props: {register: UseFormRegisterReturn, placeholder?: string}) => (
    <input className={'anton-input'} placeholder={props.placeholder ?? ''} {...props.register} />
)
