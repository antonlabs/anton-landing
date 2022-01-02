import Particles, {Container, Main} from "react-tsparticles";
import {particlesConfig} from "../../config/particles-config";
import "./SpaceCover.scss";
import {WalletStack} from "../WalletStack/WalletStack";
import {BezierShape} from "../BezierShape/BezierShape";
import {Button} from "../Button/Button";
import React from "react";

const particlesInit = (main: Main) => {
    main.init();
}

const particlesLoaded = (container: Container) => {
    console.log(container);
}


export const SpaceCover = () => {
    return (
        <div className={'cover'}>
            <Particles
                id="tsparticles"
                init={particlesInit}
                style={{'position': 'absolute'}}
                loaded={particlesLoaded}
                options={particlesConfig as any}
            >
            </Particles>
            {/*<img className={'curve-cover'} src={'/assets/curve-cover.png'} />*/}
            <div className={'curve-cover'}>
                <BezierShape />
            </div>
            <div className={'hover'}>
                <div className={'wallets'}>
                    <div className={'title'}>
                        <h1 className={'primary'}>You need a copilot if you want to reach the moon</h1>
                        <h2 className={'subtitle'}>Choose an investment strategy and start <b>earning!</b></h2>
                    </div>
                    <Button>
                        <h4>Book for the beta</h4>
                    </Button>
                    {/*<div className={'stack'}>
                            <WalletStack />
                    </div>*/}
                </div>
                <div className={'moon'}>
                    <div className={'flex-row center'}>
                        <img src={'/assets/astronaut.svg'} />
                    </div>
                </div>
            </div>
        </div>
    );
}




