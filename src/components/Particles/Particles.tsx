import "./Particles.scss";

function r(min: number, max: number) {
    return Math.random() * (max - min) + min;
}


export const Particles = (props: {nParticles?: number}) => {
    return <div className='particles'>
        {
            [...new Array(props.nParticles ?? 100)].map(() => <div key={Math.random()} style={{animation: `star-light ${r(5, 10)}s ${r(5, 10)}s infinite`, top: (Math.random() * 100)+'%', left: (Math.random() * 100)+'%'}} className='star' />)
        }
    </div>
}
