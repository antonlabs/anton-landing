import "./SpaceHole.scss";
import {holeConfig} from "../../config/particles-config";
import Particles, {Container, Main} from "react-tsparticles";
import React from "react";

function makeid(length: number) {
    let result           = '';
    const characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() *
            charactersLength));
    }
    return result;
}

const particlesInit = (main: Main) => {
    main.init();
}

const particlesLoaded = (container: Container) => {
    console.log(container);
}


export const SpaceHole = ({children}: any) => {
    const id = makeid(10);
    return <div className={'space-hole'}>
        <img alt={''} src={'/assets/hole-small.svg'} />
        {/*<Particles
            id={"hole-" + id}
            init={particlesInit}
            style={{'position': 'absolute'}}
            loaded={particlesLoaded}
            options={holeConfig as any}
        >
        </Particles>*/}
        <div className={'content'}>
            {children}
        </div>
    </div>
}
