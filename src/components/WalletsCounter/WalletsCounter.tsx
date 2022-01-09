import {useLandingInfo} from "../../state/landing-info/hooks";
import "./WalletsCounter.scss";
import {BsCurrencyExchange} from "react-icons/all";

export const WalletsCounter = (): JSX.Element => {
    const landingInfo = useLandingInfo();
    return <div className={'counter'}>
        <h2>Wallets opened</h2> <br/>
        <div className={'flex-row center'}>
            <BsCurrencyExchange className={'mt-10px'} />
            <h1 className={'ml-10px'}>{landingInfo?.totalTransactions ?? 0}</h1>
        </div>
    </div>
}
