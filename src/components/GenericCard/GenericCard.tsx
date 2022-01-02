import './GenericCard.scss';
import React from "react";

export const GenericCard = ({header, children}: any) => {
    return <div className='anton-card'>
        <div className={'header bg-primary'}>
            {header}
        </div>
        <div className={'content'}>
            {children}
        </div>
    </div>
};
