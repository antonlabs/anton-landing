import {useAppSelector} from "../index";
import {getProfileByWalletName} from "../profiles/helpers";

export const useTabs = () => {
    return useAppSelector((state) => state.tabManager.tabs);
}

export const useSelectTabIndex = () => {
    return useAppSelector((state) => {
        return state.tabManager.selectedTab;
    })
}

export const useSelectedTab = () => {
    return useAppSelector((state) => {
        if(state.tabManager.tabs.length > 0) {
            return state.tabManager.tabs[state.tabManager.selectedTab];
        }
        return undefined;
    })
}
