import './Home.scss';
import React from "react";
import {SpaceCover} from "../../components/SpaceCover/SpaceCover";
import {translate} from "../../state/language/hooks";
import {BezierShape} from "../../components/BezierShape/BezierShape";
import {GlowCard} from "../../components/GlowCard/GlowCard";
import {Footer} from "../../components/Footer/Footer";


export const Home = (): JSX.Element => (
    <div className={'home'}>
        <SpaceCover />
        <div className={'gradient'}>
            <div className={'card-plain slogan mt-3em'}>
                <h1>{translate('Who`s Anton')}</h1>
            </div>
            <div className={'flex-row home-row'}>
                <div className={'card-plain'}>
                    <h2>{translate('Begin easily')}</h2>
                    <h5>{translate('The easiest platform to start your crypto journey.')}<br/>
                        {translate('It helps you trade and manage your crypto in a secure, reliable and profitable way!')}
                    </h5>
                </div>
                <div className={'image'} style={{backgroundImage: 'url("/assets/getting-started.webp")'}} />
            </div>

            <div className={'flex-row home-row reverse'}>
                <div className={'card-plain'}>
                    <h2>{translate('Secure')}</h2>
                    <h5>{translate('We never share your personal information and can`t access directly your funds, YOU are in control!')}</h5>
                </div>

                <div className={'image'} style={{backgroundImage: 'url("/assets/hero.webp")'}} />
            </div>

            <div className={'flex-row home-row'}>
                <div className={'card-plain'}>
                    <h2>{translate('Reliable')}</h2>
                    <h5><b>Anton</b> {translate('doesn`t sleep, it`s 24/7 scouting to never miss an opportunity.')}</h5>
                </div>
                <div className={'image'} style={{backgroundImage: 'url("/assets/coffee.webp")'}} />
            </div>

            <div className={'flex-row home-row reverse'}>
                <div className={'card-plain'}>
                    <h2>{translate('Fully customizable')}</h2>
                    <h5>{translate('Are you an expert trader? Create your own strategy and use all the tools Anton gives you!')}</h5>
                </div>
                <div className={'image'} style={{backgroundImage: 'url("/assets/contribute.webp")'}} />
            </div>
        </div>
        <BezierShape color={'rgba(198, 158, 56, 1)'} style={{transform: 'scale(1, -1)'}} height={300} />
        <div className={'units-explain'}>
            <GlowCard>
                <h2>{translate('How much it costs reach the moon?')}</h2>
                <p>{translate('Payment plans will be available for all kind of configuration and tailored for user needs.')}
                    {translate('For less than a coffee per day you can have Anton by your side in your crypto journey.')}</p>
            </GlowCard>
        </div>

        <div className={'prices-section'}></div>
        <Footer />
    </div>
);


export default Home;
