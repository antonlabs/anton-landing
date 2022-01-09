import {useLandingInfo} from "../../state/landing-info/hooks";
import "./TransactionsCounter.scss";
import {BsCurrencyExchange} from "react-icons/all";

export const TransactionsCounter = (): JSX.Element => {
    const landingInfo = useLandingInfo();
    return <div className={'counter'}>
        <h2>Total transactions</h2>
        <div className={'flex-row center'}>
            <BsCurrencyExchange className={'mt-10px'} />
            <h1 className={'ml-10px'}>{landingInfo?.totalTransactions ?? 0}</h1>
        </div>
    </div>
}
