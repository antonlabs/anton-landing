import Particles, {Container, Main} from "react-tsparticles";
import {particlesConfig} from "../../config/particles-config";
import "./SpaceCover.scss";
import {BezierShape} from "../BezierShape/BezierShape";
import React, {useState} from "react";
import {SubscriptionCard} from "../SubscriptionCard/SubscriptionCard";
import { SubscribeButton } from "../SubscribeButton/SubscribeButton";
import {useDevice} from "../../state/device/hooks";

const particlesInit = (main: Main) => {
    main.init();
}

const particlesLoaded = (container: Container) => {
    console.log(container);
}

export const SpaceCover = (): JSX.Element => {
    const [state, setState] = useState({creating: false});
    const device = useDevice();
    return (
        <div className={'cover'}>
            {/*<Particles
                id="tsparticles"
                init={particlesInit}
                style={{'position': 'absolute'}}
                loaded={particlesLoaded}
                options={particlesConfig as any}
            >
            </Particles>*/}
            {/*<img className={'curve-cover'} src={'/assets/curve-cover.png'} />*/}
            <div className={'curve-cover'}>
                <BezierShape height={device.isMobile ? 200 : 400} />
            </div>
            <div className={'hover'}>
                <div className={'subscribe ' + (state.creating ? 'creating' : '')}>
                    <SubscriptionCard cancel={() => setState(() => ({
                        creating: false
                    }))}/>
                </div>
                <div className={'wallets ' + (state.creating ? 'creating' : '')}>
                    <div className={'title'}>
                        <h1 className={'primary'}>You need a copilot if you want to reach the moon</h1>
                        <h2 className={'subtitle'}>Choose an investment strategy and start <b>earning!</b></h2>
                    </div>
                    <SubscribeButton setState={setState}/>
                    {/*<div className={'stack'}>
                            <WalletStack />
                    </div>*/}
                </div>
                <div className={'moon'}>
                    <div className={'flex-row center'}>
                        <img alt='' src={'/assets/astronaut.png'} />
                    </div>
                </div>
            </div>
        </div>
    );
}




