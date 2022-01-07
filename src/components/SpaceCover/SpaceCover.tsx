import Particles, {Container, Main} from "react-tsparticles";
import {particlesConfig} from "../../config/particles-config";
import "./SpaceCover.scss";
import {BezierShape} from "../BezierShape/BezierShape";
import {Button} from "../Button/Button";
import React, {useState} from "react";
import {SubscriptionCard} from "../SubscriptionCard/SubscriptionCard";
import {useNewsletter} from "../../state/newsletter/hooks";

const particlesInit = (main: Main) => {
    main.init();
}

const particlesLoaded = (container: Container) => {
    console.log(container);
}

export const SpaceCover = () => {
    const [state, setState] = useState({creating: false});
    const newsletter = useNewsletter();
    const style = {
        transform: `scale(${state.creating ? '0' : '1'})`
    }
    const subscribeStyle = {
        marginLeft: state.creating ? '50px' : '-100%'
    }
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
                <div className={'subscribe'} style={subscribeStyle}>
                    <SubscriptionCard cancel={() => setState(() => ({
                        creating: false
                    }))}/>
                </div>
                <div className={'wallets'} style={style}>
                    <div className={'title'}>
                        <h1 className={'primary'}>You need a copilot if you want to reach the moon</h1>
                        <h2 className={'subtitle'}>Choose an investment strategy and start <b>earning!</b></h2>
                    </div>
                    {!newsletter.subscribedWith ? <Button onClick={() => setState(() => ({
                        creating: true
                    }))}>
                        <h4>Keep updated</h4>
                    </Button> : <h4>Subscribed with email: {newsletter.subscribedWith}</h4>}
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




