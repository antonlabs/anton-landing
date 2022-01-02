import "./BezierShape.scss";

let ctx: CanvasRenderingContext2D | undefined | null;

let currentMode = 0;
const speed = 1;
const animationFloor = 50;
const animationMax = 200;


const drawLine = (ctx: CanvasRenderingContext2D, color: string, points: {x: number, y: number}[]) => {
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
    setTimeout(() => {
        clear(ctx);
        drawLine(ctx, color, points);
    }, 100)
}

const clear = (ctx: CanvasRenderingContext2D) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
}

const run = (ctx: CanvasRenderingContext2D, color: string = 'white', reverse: boolean = false, height = 400) => {
    if(reverse) {
        ctx.translate(0, height);
        ctx.scale(1, -1);
    }
    let points = [
        {x:0,y:0},
        {x:window.innerWidth / 3, y: height},
        {x:window.innerWidth / 2,y:200},
        {x:window.innerWidth, y:height}
    ]
    drawLine(ctx, color, points);
}

export const BezierShape = (props: {color?: string, reverse?: boolean, height?: number}) => {
    const currentHeight = props.height ?? 400;
    return <canvas width={window.innerWidth} height={(currentHeight) + 'px'} ref={(c) => {
        ctx = c?.getContext('2d');
        if(ctx) {
            run(ctx, props.color, props.reverse, currentHeight);
        }
    }} id='canvas' />
}
