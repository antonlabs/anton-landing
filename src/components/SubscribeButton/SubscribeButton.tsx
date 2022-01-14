import "./SubscribeButton.scss";
import {Button} from "../Button/Button";
import React from "react";
import {toggleCreate} from "../../state/newsletter";
import {useAppDispatch} from "../../state";
import {useNewsletter} from "../../state/newsletter/hooks";

export const SubscribeButton = () => {
    const email = useNewsletter().subscribedWith;
    const dispatch = useAppDispatch();
    return <div className={'subscribe-button'}>{!email ? <Button onClick={() => {
        window.scrollTo(0,0);
        dispatch(toggleCreate());
    }}>
        <h4>Keep updated</h4>
    </Button> : <h4>Subscribed with email: {email}</h4>}</div>
}
