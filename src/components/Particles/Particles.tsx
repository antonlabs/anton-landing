import {useEffect} from "react";

export const Particles = () => {
    return <div className='particles'>
        {
            [...new Array(100)].map(() => {
                <div className='star' />
            })
        }
    </div>
}
