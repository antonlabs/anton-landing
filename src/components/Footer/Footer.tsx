import "./Footer.scss";
import {BsGithub, BsInstagram, BsTwitter} from "react-icons/all";

export const Footer = (): JSX.Element => {
    return <div className={'footer'}>
        <div className={'w-100 flex-row between'}>
            <div className={'flex-column'}>
                <h3>About Anton</h3>
                <a target={'_blank'} rel="noopener" href={'https://twitter.com/Anton96113792'}>Community</a>
                <a rel="noopener" href={'mailto:contact@anton.finance'}>Contact</a>
            </div>
            <div className={'flex-column'}>
                <h3>Help me!</h3>
                <a rel="noopener" href={'mailto:support@anton.finance'}>Customer support</a>
            </div>
            <div className={'flex-column'}>
                <h3>Social</h3>
                <div className={'flex-row socials'}>
                    <a rel="noopener" target={'_blank'} href={'https://github.com/antonlabs'}><BsGithub /></a>
                    <a rel="noopener" target={'_blank'} href={'https://twitter.com/Anton96113792'}><BsTwitter /></a>
                    <a rel="noopener" target={'_blank'} href={'https://www.instagram.com/anton_copilot/'}><BsInstagram/></a>
                </div>
            </div>
        </div>
        <div className={'credits'}>
            <span>Copyright © Anton Labs</span>
            <a rel="noopener" href="https://www.freepik.com/vectors/logo">Logo vector created by catalyststuff - www.freepik.com</a>
        </div>
    </div>
}
