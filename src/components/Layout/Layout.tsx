import {Outlet} from "react-router-dom";
import React, {CSSProperties, useState} from "react";
import './Layout.scss';
import { useDevice } from "../../state/device/hooks";
import {Button} from "../Button/Button";
import {AiOutlineMenu} from "react-icons/all";
import {SubscribeButton} from "../SubscribeButton/SubscribeButton";
import {LanguageButton} from "../LanguageButton/LanguageButton";

export const menuBarClass = 'menu-bar';


export const Layout = (): JSX.Element => {
    const [mobileMenuOpen,  setState] = useState(false);
    const device = useDevice();
    const style: CSSProperties = {
            position: 'fixed',
            background: 'rgba(32, 32, 32, .6)',
            borderRadius: device.isMobile ? '0' : '10px',
            marginTop: device.isMobile ? '0' : '10px',
            width: device.isMobile ? '100%' : '95%',
            zIndex: '999'
    };
    const menu = <div className={'menu-items' }>
        <SubscribeButton />
        <LanguageButton />
    </div>
    return (
        <>
            <div className={'menu-bar-container'}>
                <div className={menuBarClass} style={style}>
                    <div className={'logobar'}>
                        <img alt={'logo'} className={'logo'} src={'/assets/logo.svg'} />
                        <h3 className={'desktop-only'}>Anton</h3>
                    </div>
                    <nav className={'d-flex align-items-center menu ' + (mobileMenuOpen ? 'open' : '')}>
                        <Button onClick={() => setState((s) => !s)} extraClasses={['toggle-menu']}>
                            <AiOutlineMenu />
                        </Button>
                        {menu}
                    </nav>
                </div>
            </div>
            <div className="content">
                <Outlet />
            </div>
        </>
    );
}
