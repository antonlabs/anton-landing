import "./SpaceHole.scss";
import {holeConfig, particlesConfig} from "../../config/particles-config";
import Particles, {Container, Main} from "react-tsparticles";
import React from "react";
import {BubbleShape} from "../BubbleShape/BubbleShape";

function makeid(length: number) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
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
        <img src={'/assets/hole-small.svg'} />
        <Particles
            id={"hole-" + id}
            init={particlesInit}
            style={{'position': 'absolute'}}
            loaded={particlesLoaded}
            options={holeConfig as any}
        >
        </Particles>
        <div className={'content'}>
            {children}
        </div>
    </div>
}
