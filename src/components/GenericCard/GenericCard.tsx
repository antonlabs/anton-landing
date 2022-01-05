import './GenericCard.scss';
import React from "react";

export const GenericCard = ({header, children, style = {}}: any) => {
    return <div className='anton-card' style={style}>
        <div className={'header bg-primary'}>
            {header}
        </div>
        <div className={'content'}>
            {children}
        </div>
    </div>
};
