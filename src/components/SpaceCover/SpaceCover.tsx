import "./SpaceCover.scss";
import {BezierShape} from "../BezierShape/BezierShape";
import React, {useState} from "react";
import {SubscriptionCard} from "../SubscriptionCard/SubscriptionCard";
import { SubscribeButton } from "../SubscribeButton/SubscribeButton";
import {useDevice} from "../../state/device/hooks";
import { Particles } from "../Particles/Particles";

export const SpaceCover = (): JSX.Element => {
    const [state, setState] = useState({creating: false});
    const device = useDevice();
    return (
        <div className={'cover'}>
            <Particles />
            <BezierShape height={device.isMobile ? 200 : 400} />
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




