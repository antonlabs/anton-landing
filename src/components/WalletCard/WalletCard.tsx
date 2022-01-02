import React from "react";
import './WalletCard.scss';
import {EarningsBox} from "../EarningsBox/EarningsBox";
import {GenericCard} from "../GenericCard/GenericCard";
import {Input} from "../Input/Input";
import {useForm} from "react-hook-form";
import {Button} from "../Button/Button";
import {useAppDispatch} from "../../state";
import {editWalletAndFetch, toggleOpenWallet} from "../../state/profiles";
import {useProfile} from "../../state/profiles/hooks";
import {VscExpandAll} from "react-icons/all";
import {ProfileModel, WalletModel} from "../../state/types";

const submitForm = (dispatch: any, profile: ProfileModel, newValue: any) => {
    const newProfile = JSON.parse(JSON.stringify(profile));
    newValue.units = Number(newValue.units);
    newProfile.wallet = {...newProfile.wallet, ...newValue} as any;
    dispatch(editWalletAndFetch(newProfile));
}

export const WalletCard = (props: {wallet: WalletModel, selected: boolean}) => {
    const dispatch = useAppDispatch();
    const profile = useProfile(props.wallet.name);
    const header = <div className={'flex-row between'}>
        <h3>{props.wallet.name} wallet</h3>
        {props.selected ? <Button extraClasses={['icon']} onClick={() => {
            dispatch(toggleOpenWallet());
        }}><VscExpandAll /></Button> : <></>}
    </div>;
    const form = useForm();
    form.setValue('units', props.wallet.units);
    form.setValue('euroPerUnits', props.wallet.euroPerUnits);
    return (
        <GenericCard header={header}>
            <form onSubmit={form.handleSubmit((val) => submitForm(dispatch, profile, val))}>
                <div className={'flex-row between'}>
                    <div className={'flex-column center'}>
                        <h4>Units Available</h4>
                        <div className={'price-bar'}>
                            <Input register={form.register('units', {required: true})} />
                        </div>
                        <h4 className={'mt-1em'}>Unit value $</h4>
                        <div className={'price-bar '}>
                            <Input register={form.register('euroPerUnits', {required: true})} />
                        </div>
                    </div>
                    <div className={'flex-column center'}>
                        <EarningsBox earnings={props.wallet.totalEarnings} />
                    </div>
                </div>
                <br />
                <div className={'flex-row between'}>
                    <Button>
                        <h4>Edit</h4>
                    </Button>
                    <Button style={'danger'}>
                        <h4>Delete</h4>
                    </Button>
                </div>
            </form>
        </GenericCard>
    );
}

