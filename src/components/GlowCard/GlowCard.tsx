import "./GlowCard.scss"
import {useState} from "react";

export interface Offset {
    x: number;
    y: number;
}

export const GlowCard = (props: {children: any}) => {
    const [offset, setState] = useState({x: 0, y: 0});

    const mouseMove = (e: any) => {
        const rect = e.target.getBoundingClientRect();
        const x = e.clientX - rect.left; //x position within the element.
        const y = e.clientY - rect.top;  //y position within the element.
        setState({x, y});
    }

    return <div className={'glow-card'} onMouseMoveCapture={mouseMove} >
        <div className={'glow'} style={{'top': offset.y, 'left': offset.x}} />
        <div className={'content'}>
            {props.children}
        </div>
    </div>
}
