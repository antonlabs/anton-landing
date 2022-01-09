import "./BezierShape.scss";
import {useEffect} from "react";
import { useDevice } from "../../state/device/hooks";

let ctx: CanvasRenderingContext2D | undefined | null;

const speed = 1;
const animationFloor = 50;
const animationMax = 200;

const timeouts: {[key: string]: any} = {}

const makeid = (length: number) => {
    let result           = '';
    const characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() *
            charactersLength));
    }
    return result;
}

const drawLine = (id: string, ctx: CanvasRenderingContext2D, color: string, points: {x: number, y: number}[],  animation: boolean = true, currentMode = 0) => {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);
    if(currentMode) {
        points[1].y -= speed;
        points[2].y += speed;
    }else {
        points[1].y += speed;
        points[2].y -= speed;
    }
    if(!currentMode && points[2].y === animationFloor) {
        currentMode = 1;
    }else if((currentMode && points[2].y === animationMax) ? 1 : 0) {
        currentMode = 0;
    }
    ctx.bezierCurveTo(points[1].x, points[1].y, points[2].x, points[2].y, points[3].x, points[3].y);
    ctx.lineTo(0, points[1].y);
    ctx.lineTo(points[0].x, points[0].y);
    ctx.fill();
    if(animation) {
        timeouts[id] = setTimeout(() => {
            clear(ctx);
            drawLine(id, ctx, color, points, animation, currentMode);
        }, 100);
    }

}

const clear = (ctx: CanvasRenderingContext2D) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
}

const run = (
    id: string,
    ctx: CanvasRenderingContext2D,
    color: string = 'white',
    reverse: boolean = false,
    height = 400,
    animation: boolean = true
    ) => {
    if(reverse) {
        ctx.translate(0, height);
        ctx.scale(1, -1);
    }
    const points = [
        {x:0,y:0},
        {x:window.innerWidth / 3, y: height},
        {x:window.innerWidth / 2,y:200},
        {x:window.innerWidth, y:height}
    ]
    drawLine(id, ctx, color, points, animation);
}

export const BezierShape = (props: {color?: string, reverse?: boolean, height?: number}) => {
    const currentHeight = props.height ?? 400;
    const id = 'canvas' + makeid(10);
    const device = useDevice();

    useEffect(() => {
        return () => {
            clearTimeout(timeouts[id])
            delete timeouts[id]
        }
    })
    return <canvas width={window.innerWidth} height={(currentHeight) + 'px'} ref={(c) => {
        ctx = c?.getContext('2d');
        if(ctx) {
            run(id, ctx, props.color, props.reverse, currentHeight, !device.isMobile);
        }
    }} id={id} className={'canvas'} />
}
