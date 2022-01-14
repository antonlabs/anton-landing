import "./SpaceCover.scss";
import {BezierShape} from "../BezierShape/BezierShape";
import React from "react";
import {useDevice} from "../../state/device/hooks";
import { Particles } from "../Particles/Particles";
import {NewsletterForm} from "../NewsletterForm/NewsletterForm";

export const SpaceCover = (): JSX.Element => {
    const device = useDevice();
    return (
        <div className={'cover'}>
            <Particles />
            <BezierShape height={device.isMobile ? 200 : 400} />
            <div className={'hover'}>
                <NewsletterForm />
                <div className={'moon'}>
                    <div className={'flex-row center'}>
                        <img alt='' src={'/assets/astronaut.png'} />
                    </div>
                </div>
            </div>
        </div>
    );
}




