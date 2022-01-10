import './Home.scss';
import React from "react";
import {TransactionsCounter} from "../../components/TransactionsCounter/TransactionsCounter";
import {GlowCard} from "../../components/GlowCard/GlowCard";
import {VolumeCounter} from "../../components/VolumeCounter/VolumeCounter";
import {WalletsCounter} from "../../components/WalletsCounter/WalletsCounter";
import {BezierShape} from "../../components/BezierShape/BezierShape";
import {PriceTab} from "../../components/PriceTab/PriceTab";
import {BiPackage, GiJetpack, SiWebpack} from "react-icons/all";
import {Footer} from "../../components/Footer/Footer";
import {SpaceCover} from "../../components/SpaceCover/SpaceCover";

export const Home = (): JSX.Element => (
    <div className={'home'}>
        <SpaceCover />
        <div className={'gradient'}>
            <div className={'counters'}>
                <GlowCard>
                    <TransactionsCounter />
                </GlowCard>
                <GlowCard>
                    <VolumeCounter />
                </GlowCard>
                <GlowCard>
                    <WalletsCounter />
                </GlowCard>
            </div>
            <div className={'card-plain slogan mt-3em'}>
                <h1>Anton's skills</h1>
            </div>
            <div className={'flex-row home-row'}>
                <div className={'card-plain'}>
                    <h2>Begin easily</h2>
                    <h5>The easiest platform to start your crypto journey.<br/>
                        It helps you trade and manage your crypto in a secure, reliable and profitable way!
                    </h5>
                </div>
                <div className={'image'} style={{backgroundImage: 'url("/assets/getting-started.png")'}} />
            </div>

            <div className={'flex-row home-row reverse'}>
                <div className={'card-plain'}>
                    <h2>Secure</h2>
                    <h5>We never share your personal information and can't access directly your funds, YOU are in control!</h5>
                </div>

                <div className={'image'} style={{backgroundImage: 'url("/assets/hero.png")'}} />
            </div>

            <div className={'flex-row home-row'}>
                <div className={'card-plain'}>
                    <h2>Reliable</h2>
                    <h5><b>Anton</b> doesn't sleep, it's 24/7 scouting to never miss an opportunity.</h5>
                </div>
                <div className={'image'} style={{backgroundImage: 'url("/assets/coffee.png")'}} />
            </div>

            <div className={'flex-row home-row reverse'}>
                <div className={'card-plain'}>
                    <h2>Fully customizable</h2>
                    <h5>Are you an expert trader? Create your own strategy and use all the tools Anton gives you!</h5>
                </div>
                <div className={'image'} style={{backgroundImage: 'url("/assets/contribute.png")'}} />
            </div>
        </div>
        <BezierShape color={'rgba(198, 158, 56, 0.5)'} reverse={true} style={{transform: 'scale(1, -1)'}} height={300} />
        <div className={'units-explain'}>
            <GlowCard>
                <h2>Anton is powered by units</h2>
                <p>Units set how many transaction can be created in parallel, so when anton buy an order consume 1 unit that gets back when sell the same order</p>
            </GlowCard>
        </div>

        <div className={'prices-section'}>
            <h1 className={'prices-title'}>How much costs reach the moon?</h1>

            <div className={'prices'}>
                <PriceTab unitsNumber={10} price={5} icon={<BiPackage size={'50px'}/>} />
                <PriceTab unitsNumber={50} price={15} icon={<SiWebpack size={'50px'}/>}/>
                <PriceTab unitsNumber={150} price={25} icon={<GiJetpack size={'50px'}/>} />
            </div>
        </div>
        <Footer />
    </div>
);


export default Home;
