import "./CreateWalletCard.scss";
import {GenericCard} from "../GenericCard/GenericCard";
import {Input} from "../Input/Input";
import {Button} from "../Button/Button";
import React from "react";
import {useForm} from "react-hook-form";

export const CreateWalletCard = () => {
    const header = <h2 style={{'color':'black'}}>ANTON</h2>
    // const form = useForm();
    return <GenericCard header={header}>
        {/*<form>*/}
        {/*    <div className={'flex-row between'}>*/}
        {/*        <div className={'flex-column center'}>*/}
        {/*            <h4>Wallet Name</h4>*/}
        {/*            <div className={'price-bar'}>*/}
        {/*                <Input register={form.register('units', {required: true})} />*/}
        {/*            </div>*/}
        {/*            <h4 className={'mt-1em'}>Email</h4>*/}
        {/*            <div className={'price-bar'}>*/}
        {/*                <Input register={form.register('euroPerUnits', {required: true})} />*/}
        {/*            </div>*/}
        {/*        </div>*/}
        {/*    </div>*/}
        {/*    <br />*/}
        {/*    <div className={'flex-row between'}>*/}
        {/*        <Button>*/}
        {/*            <h4>Create</h4>*/}
        {/*        </Button>*/}
        {/*        <Button extraClasses={['telegram-button']}>*/}
        {/*            <h4>Use Telegram</h4>*/}
        {/*        </Button>*/}
        {/*    </div>*/}
        {/*</form>*/}
        <div className={'flex-row'}>
            <div className={'flex-column center'}>
                <h3>Let him help you manage your crypto portfolio and trade in a quick, secure and <b>profitable</b> way!</h3>
                <br/>
                <h4>
                    Create now your first wallet!
                </h4>
            </div>
        </div>
        <div className={'flex-row end'}>
            <Button extraClasses={['telegram-button']}>
                <h4>Get started for free</h4>
            </Button>
        </div>
    </GenericCard>
}
