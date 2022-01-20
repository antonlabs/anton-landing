import './Checkbox.scss';
import {UseFormRegisterReturn} from "react-hook-form";


export const Checkbox = (props: {register: UseFormRegisterReturn, placeholder: string, href?: string}) => (
    <label>
        <input type='checkbox' className={'anton-input'} {...props.register} />
        <a href={props.href} target='_blank'>{props.placeholder}</a>
    </label>
)
