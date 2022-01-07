import {NavLink, Outlet, useLocation} from "react-router-dom";
import React, {CSSProperties, useState} from "react";
import {useFetchProfile, useFetchWallets, useProfiles, useUpdateWalletsKeys} from "../../state/profiles/hooks";
import './Layout.scss';
import { useDevice } from "../../state/device/hooks";
import {Button} from "../Button/Button";
import {AiOutlineMenu} from "react-icons/all";

export const menuBarClass = 'menu-bar';


export const Layout = () => {
    const { search, pathname } = useLocation();
    const query = React.useMemo(() => new URLSearchParams(search), [search]);
    const key = query.get('key');
    const [mobileMenuOpen,  setState] = useState(false);
    useFetchProfile(key!);
    console.log('use fetch wallets');
    useFetchWallets();
    const device = useDevice();
    const profiles = useProfiles();
    let style: CSSProperties = {};

    if(pathname === '/') {
        style = {
            position: 'fixed',
            background: 'rgba(32,32,32,.6)',
            transform: device.isMobile ? 'translate(0, 0)' : 'translateX(2.5%)',
            borderRadius: device.isMobile ? '0' : '10px',
            marginTop: device.isMobile ? '0' : '10px',
            width: device.isMobile ? '100%' : '95%',
            zIndex: '999'
        }
    }
    const menu = profiles.profiles.length > 0 ? <div className={'menu-items'}>
                <NavLink to="">Home</NavLink>
                <NavLink to="orders">Orders</NavLink>
                <NavLink to="errors">Errors</NavLink>
                <NavLink to="settings">Settings</NavLink>
            </div> :
            <div className={'menu-items' }>
                <Button>Keep updated</Button>
            </div>
    return (
        <>
            <div className={menuBarClass} style={style}>
                <div className={'logobar'}>
                    <img className={'logo'} src={'/assets/logo.svg'} />
                    <h3 className={'desktop-only'}>Anton</h3>
                </div>
                <nav className={'d-flex align-items-center menu ' + (mobileMenuOpen ? 'open' : '')}>
                    <Button onClick={() => setState((s) => !s)} extraClasses={['toggle-menu']}>
                        <AiOutlineMenu />
                    </Button>
                    {menu}
                </nav>
            </div>
            <div className="content">
                <Outlet />
            </div>
        </>
    );
}
