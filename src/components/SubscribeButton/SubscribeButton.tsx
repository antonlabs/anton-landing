import "./SubscribeButton.scss";
import {useNewsletter} from "../../state/newsletter/hooks";
import {Button} from "../Button/Button";
import React from "react";

export const SubscribeButton = ({setState}: any) => {
    const newsletter = useNewsletter();
    return <div className={'subscribe-button'}>{!newsletter.subscribedWith ? <Button onClick={() => {
        window.scrollTo(0,0);
        setState(() => ({
            creating: true
        }))
    }}>
        <h4>Keep updated</h4>
    </Button> : <h4>Subscribed with email: {newsletter.subscribedWith}</h4>}</div>
}
