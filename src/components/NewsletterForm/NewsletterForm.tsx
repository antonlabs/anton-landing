import {SubscriptionCard} from "../SubscriptionCard/SubscriptionCard";
import {SubscribeButton} from "../SubscribeButton/SubscribeButton";
import React, {useState} from "react";
import './NewsletterForm.scss';
import {useNewsletter} from "../../state/newsletter/hooks";
import {toggleCreate} from "../../state/newsletter";
import {useAppDispatch} from "../../state";

export const NewsletterForm = () => {
    const newsletter = useNewsletter();
    const dispatch = useAppDispatch();
    return <div className={'newsletter-form'}>
        <div className={'subscribe ' + (newsletter.creating ? 'creating' : '')}>
            <SubscriptionCard cancel={() => dispatch(toggleCreate())}/>
        </div>
        <div className={'wallets ' + (newsletter.creating ? 'creating' : '')}>
            <div className={'title'}>
                <h1 className={'primary'}>You need a copilot if you want to reach the moon</h1>
                <h2 className={'subtitle'}>Choose an investment strategy and start <b>earning!</b></h2>
            </div>
            <SubscribeButton />
        </div>
    </div>
}
