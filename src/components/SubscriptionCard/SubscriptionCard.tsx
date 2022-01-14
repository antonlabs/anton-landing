import "./SubscriptionCard.scss";
import {GenericCard} from "../GenericCard/GenericCard";
import {Button} from "../Button/Button";
import React from "react";
import {IoIosArrowBack, MdMarkEmailRead} from "react-icons/all";
import {useForm} from "react-hook-form";
import {Input} from "../Input/Input";
import {useAppDispatch} from "../../state";
import {createNewsletter} from "../../state/newsletter";
import {useNewsletter} from "../../state/newsletter/hooks";

const submitForm = (dispatch: any, email: string) => {
    dispatch(createNewsletter(email));
}


export const SubscriptionCard = ({cancel, style = {}}: any) => {
    const dispatch = useAppDispatch();
    const form = useForm();
    const newsletter = useNewsletter();
    style['transform'] = `scale(${newsletter.pending ? '0' : '1'})`
    form.setValue('email', '');
    const header = <div className={'flex-row'}>
        {cancel ?
            <Button style={'icon'} onClick={cancel}>
                <IoIosArrowBack style={{paddingRight: '10px'}} size={30} />
            </Button> :
            <></>
        }
        <h2>Keep up with news</h2>
    </div>
    // const form = useForm();
    return <GenericCard header={header} style={style}>
        <form onSubmit={form.handleSubmit((val: any) => submitForm(dispatch, val.email))}>
            {newsletter.error ? <div className={'alert'}>{newsletter.error}</div> : <></>}
            <p>Subscribe to our newsletter to keep updated about our roadmap status and give us feedback about what you would like</p>
            <div className={'flex-row mt-2em between'}>
                <Input placeholder={'Your email'} register={form.register('email', {required: true})} />
                <Button extraClasses={['button email']}>
                    <MdMarkEmailRead />
                    <h6>Subscribe</h6>
                </Button>
            </div>
        </form>
    </GenericCard>
}
