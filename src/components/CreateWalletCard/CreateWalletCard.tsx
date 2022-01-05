import "./CreateWalletCard.scss";
import {GenericCard} from "../GenericCard/GenericCard";
import {Button} from "../Button/Button";
import React from "react";
import {FaTelegramPlane, IoIosArrowBack, MdEmail} from "react-icons/all";
import {useForm, UseFormReturn} from "react-hook-form";
import {Input} from "../Input/Input";

const getName = (form: UseFormReturn) => form.getValues()['walletName']

const telegram = (walletName: string) => {

}

const email = (walletName: string) => {
    console.log(walletName);
}

export const CreateWalletCard = ({cancel, style = {}}: any) => {
    const form = useForm();
    form.setValue('walletName', '');
    const header = <div className={'flex-row'}>
        {cancel ?
            <Button style={'icon'} onClick={cancel}>
                <IoIosArrowBack style={{paddingRight: '10px'}} size={30} />
            </Button> :
            <></>
        }

        <h2>Create wallet</h2>
    </div>
    // const form = useForm();
    return <GenericCard header={header} style={style}>
        <Input placeholder={'Your wallet name'} register={form.register('walletName', {required: true})} />
        <div className={'flex-row between mt-2em'}>
            <Button onClick={() => telegram(getName(form))} extraClasses={['button telegram']}>
                <FaTelegramPlane />
                <h6>Use Telegram</h6>
            </Button>
            <Button extraClasses={['button email']}>
                <MdEmail />
                <h6>Use Email</h6>
            </Button>
        </div>
    </GenericCard>
}
