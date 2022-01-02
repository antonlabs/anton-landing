import {useLandingInfo} from "../../state/landing-info/hooks";
import "./VolumeCounter.scss";
import {BsCurrencyExchange} from "react-icons/all";

export const VolumeCounter = () => {
    const landingInfo = useLandingInfo();
    return <div className={'counter'}>
        <h2>Daily volume</h2>
        <div className={'flex-row center'}>
            <BsCurrencyExchange className={'mt-10px'} />
            <h1 className={'ml-10px'}>{landingInfo?.totalTransactions ?? 0}</h1>
        </div>
    </div>
}
