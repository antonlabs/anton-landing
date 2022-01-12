import "./SpaceHole.scss";
import React from "react";
import {Particles} from "../Particles/Particles";

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


export const SpaceHole = ({children}: any) => {
    const id = makeid(10);
    return <div className={'space-hole'}>
        <img alt={''} src={'/assets/hole-small.svg'} />
        <Particles />
        <div className={'content'}>
            {children}
        </div>
    </div>
}
