import {useSelectedTab, useSelectTabIndex, useTabs} from "../../state/tabs/hooks";
import {Tab} from "../Tab/Tab";
import {SymbolChart} from "../SymbolChart/SymbolChart";


import "./TabManager.scss";

export const TabManagerCover = () => (
    <div className={'tabs-manager-cover'}>

    </div>
);


export const TabManager = () => {
    const tabs = useTabs();
    const selectedTabIndex = useSelectTabIndex();
    const selectedTab = useSelectedTab();
    console.log('selected tab', selectedTabIndex);
    const tabsComponents = tabs.map((tab, i) => <Tab key={tab.symbol} tab={tab} selected={selectedTab?.symbol === tab.symbol} />);

    if(tabs.length > 0) {
        return (
            <div className={'tab-manager'}>
                <div className={'tab-bar'}>
                    {tabsComponents}
                </div>
                <div className={'content'}>
                    {selectedTab ? <SymbolChart tab={selectedTab} candles={selectedTab?.candles} /> : <TabManagerCover />}
                </div>
            </div>
        );
    }

    return <></>

}
