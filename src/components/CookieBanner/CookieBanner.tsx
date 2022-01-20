import "./CookieBanner.scss";
import {translate} from "../../state/language/hooks";
import {LanguageButton} from "../LanguageButton/LanguageButton";
import {Button} from "../Button/Button";
import {setCookiesAccepted} from "../../state/landing-info";
import {useDispatch} from "react-redux";

export const CookieBanner = () => {

    const dispatch = useDispatch();

    return <div className="backdrop">
        <div className='cookie-banner'>
            <div className="header">
                <img alt='anton' src="/assets/logo.svg" />
                <LanguageButton />
            </div>
            <img alt="astronaut" className="astronaut" src="/assets/astronaut.webp" />
            <h2 className='mt-10px'>{translate('Before you continue to Anton')}</h2>
            <p>
                {translate('Terms descriptions')}
            </p>
            <div className='actions'>
                <a href='/assets/docs/privacy-policy.pdf' target='_blank'>{translate('Get more infos')}</a>
                <Button onClick={ ()=> dispatch(setCookiesAccepted(true))}>{translate('Accept terms')}</Button>
            </div>
        </div>
    </div>
}
