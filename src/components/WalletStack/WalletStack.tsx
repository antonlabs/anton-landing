import {WalletCard} from "../WalletCard/WalletCard";
import {useInit, useProfiles} from "../../state/profiles/hooks";
import "./WalletStack.scss";
import {CreateWalletCard} from "../CreateWalletCard/CreateWalletCard";

export const WalletStack = () => {
    const profiles = useProfiles();
    const init = useInit();
    const wallets = profiles.profiles.map((profile, i) => <WalletCard key={profile.wallet.name} wallet={profile.wallet} selected={i === 0}/>);
    wallets.push(<CreateWalletCard/>);
    const open = profiles.openWallets;
    return (
        <div className={'wallets-stack ' + (open ? 'open' : '')}>
            {wallets.map((item, index) => {
                const style =  {
                    zIndex: (9999 - index).toString(),
                    transform: `translate(${open ? 0 : (-(index * 5))}px, ${open ? 'calc(' +(index)+ '00% + 5px)' : ((index * 3) + 'px')}) scale(${(item.props.wallet ?? {loading: false}).loading || !init ? '0.01' : '1'})`
                };
                return <div className={'wallet'} key={item.key+index.toString()} style={style}>{item}</div>
            })}
        </div>
    );
};
