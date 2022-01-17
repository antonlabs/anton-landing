import {SubscriptionCard} from "../SubscriptionCard/SubscriptionCard";
import {SubscribeButton} from "../SubscribeButton/SubscribeButton";
import React from "react";
import './NewsletterForm.scss';
import {useNewsletter} from "../../state/newsletter/hooks";
import {toggleCreate} from "../../state/newsletter";
import {useAppDispatch} from "../../state";
import {translate} from "../../state/language/hooks";

export const NewsletterForm = () => {
    const newsletter = useNewsletter();
    const dispatch = useAppDispatch();
    return <div className={'newsletter-form'}>
        <div className={'subscribe ' + (newsletter.creating ? 'creating' : '')}>
            <SubscriptionCard cancel={() => dispatch(toggleCreate())}/>
        </div>
        <div className={'wallets ' + (newsletter.creating ? 'creating' : '')}>
            <div className={'title'}>
                <h1 className={'primary'}>{translate('You need a copilot if you want to reach the moon')}</h1>
                <h2 className={'subtitle'}>{translate('Choose an investment strategy and start earning!')}</h2>
            </div>
            <SubscribeButton />
        </div>
    </div>
}
