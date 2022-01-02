import "./OrdersLayout.scss";
import {Navigate, NavLink, Outlet, useLocation, useNavigate} from "react-router-dom";
import React from "react";
import {useProfiles} from "../../state/profiles/hooks";
import {useAppDispatch} from "../../state";
import { selectWallet } from "../../state/profiles";
import {TabManager} from "../TabManager/TabManager";
import {ReflexContainer, ReflexElement, ReflexSplitter} from "react-reflex";
import "react-reflex/styles.css";


export const OrdersLayout = () => {
    const profiles = useProfiles();
    const dispatch = useAppDispatch();
    const currentProfile = profiles.profiles[0];
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const currentSection = (pathname.split('/').slice(-1)[0]);
    if(!currentProfile) {
        return <Navigate to={'/'} />
    }

    const options = profiles.profiles.map(profile => <option key={profile.wallet.name+'-select-option'} value={profile.wallet.name}>{profile.wallet.name}</option>);
    const menuOptions = ['Buy', 'Sell', 'History'].map(key => <option value={key.toLowerCase()} key={key}>{key}</option>)
    let orientation: 'horizontal' | 'vertical' = 'horizontal';
    return (
        <div className={'orders-layout'}>
            <div className={'mobile-bar'}>
                <select value={currentProfile.wallet.name} onChange={(e) => dispatch(selectWallet(e.target.value))}>
                    {options}
                </select>
                <select value={currentSection} onChange={(e) => navigate(e.target.value)}>
                    {menuOptions}
                </select>
            </div>
            <div className={'sidenav'}>
                <select value={currentProfile.wallet.name} onChange={(e) => dispatch(selectWallet(e.target.value))}>
                    {options}
                </select>
                <nav>
                    <NavLink to="buy">
                        Buy
                    </NavLink>
                    <NavLink to="sell">Sell</NavLink>
                    <NavLink to="history">History</NavLink>
                </nav>
            </div>
            <ReflexContainer className={'view'} orientation={orientation}>
                <ReflexElement flex={0.6} className={'content'}>
                    <Outlet />
                </ReflexElement>
                <ReflexSplitter />
                <ReflexElement flex={0.4} className={'footer'}>
                    <TabManager />
                </ReflexElement>
            </ReflexContainer>
        </div>
    );
}
