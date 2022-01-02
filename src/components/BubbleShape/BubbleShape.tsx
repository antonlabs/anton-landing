import "./BubbleShape.scss";

let ctx: CanvasRenderingContext2D | undefined | null;

let currentMode = 0;
const speed = 1;
const animationFloor = 50;
const animationMax = 200;


const drawLine = (ctx: CanvasRenderingContext2D, color: string, points: {x: number, y: number}[], cx: number, cy: number, r: number) => {
    ctx.fillStyle = color;
    ctx.translate(cx, cy);
    ctx.beginPath();
    ctx.moveTo(0, -r);
    for(let i = 0; i < points.length - 1; i+=3) {
        ctx.bezierCurveTo(points[i].x, points[i].y, points[i+1].x, points[i+1].y, points[i+2].x, points[i+2].y);
        ctx.moveTo(points[i+2].x, points[i+2].y);
    }
    ctx.closePath();
    ctx.fill();

    ctx.rotate(45 * Math.PI / 180);
    ctx.fillRect(-r + 10, -r + 10, cx, cy);
    /*setTimeout(() => {
        clear(ctx);
        drawLine(ctx, color, points);
    }, 100)*/
}

const clear = (ctx: CanvasRenderingContext2D) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
}

const generatePoints = (cx: number, cy: number, r: number) => {
    const c=0.5522847498307933984022516322796;
    return [
        {x: c*r, y:-r},
        {x:r,y:-c*r},
        {x:r, y:0},
        {x: r,y:c*r},
        {x: c*r, y:r},
        {x: 0, y:r},
        {x:-c*r, y:r},
        {x: -r, y: c*r},
        {x:-r, y:0},
        {x:-r, y:-c*r},
        {x:-c*r, y:-r},
        {x:0, y: -r}
    ]
}

const run = (ctx: CanvasRenderingContext2D, color: string = 'black', height = 100, width = 100) => {
    let points = generatePoints(width / 2, height / 2, width / 3);
    drawLine(ctx, color, points, width / 2, height / 2, width / 3);
}

export const BubbleShape = (props: {color?: string, height?: number, width?: number}) => {
    const currentHeight = props.height ?? 100;
    const currentWidth = props.width ?? 100;
    return <canvas width={window.innerWidth} height={(currentHeight) + 'px'} ref={(c) => {
        ctx = c?.getContext('2d');
        if(ctx) {
            run(ctx, props.color, currentHeight, currentWidth);
        }
    }} id='canvas' />
}
