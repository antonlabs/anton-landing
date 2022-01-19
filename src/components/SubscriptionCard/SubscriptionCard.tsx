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
import {useGoogleReCaptcha, GoogleReCaptcha} from "react-google-recaptcha-v3";
import {translate} from "../../state/language/hooks";


export const SubscriptionCard = ({cancel, style = {}}: any) => {
    const dispatch = useAppDispatch();
    const form = useForm();
    const newsletter = useNewsletter();
    const { executeRecaptcha } = useGoogleReCaptcha();

    const handleSubmit = async () => {
        if (!executeRecaptcha) {
            console.log('Execute recaptcha not yet available');
            return;
        }

        const token = await executeRecaptcha('newsletter_subscription');

        dispatch(createNewsletter({
            email: form.getValues().email,
            captchaCode: token
        }));
    }

    style['transform'] = `scale(${newsletter.pending ? '0' : '1'})`
    form.setValue('email', '');
    const header = <div className={'flex-row'}>
        {cancel ?
            <Button style={'icon'} onClick={cancel}>
                <IoIosArrowBack style={{paddingRight: '10px'}} size={30} />
            </Button> :
            <></>
        }
        <h2>{translate('Keep up with news')}</h2>
    </div>
    // const form = useForm();
    return <GenericCard header={header} style={style}>
        <form onSubmit={form.handleSubmit(() => handleSubmit())}>
            {newsletter.error ? <div className={'alert'}>{newsletter.error}</div> : <></>}
            <p>{translate('Subscribe to our newsletter to keep updated about our roadmap status and give us feedback about what you would like')}</p>
            <div className={'flex-row mt-2em between'}>
                <GoogleReCaptcha onVerify={t => console.log({ t })} />
                <Input placeholder={translate('Your email')}
                       register={form.register('email', {required: true})} />
                <Button extraClasses={['button email']}>
                    <MdMarkEmailRead />
                    <h6>{translate('Subscribe')}</h6>
                </Button>
            </div>
        </form>
    </GenericCard>
}
