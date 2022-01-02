import {ProfileModel, ProfilesState} from "../types";
import {useEffect} from "react";
import {fetchIdToken, fetchProfile, fetchWallets} from ".";
import {useAppDispatch, useAppSelector} from "../index";
import {getProfileByWalletName} from "./helpers";

export const useProfiles = (): ProfilesState => {
    return useAppSelector((state) => state.profiles);
}

export const useCurrentProfile = (): ProfileModel => {
    return useAppSelector((state) => state.profiles.profiles[0]);
}

export const useProfile = (walletName: string): ProfileModel => {
    return useAppSelector((state) => getProfileByWalletName(walletName, state.profiles.profiles));
}

export const useInit = () => useAppSelector((state) => state.profiles.init);

export const useFetchProfile = (key: string) => {
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(fetchProfile(key));
    }, [key, dispatch])
}

export const useFetchWallets = () => {
    const dispatch = useAppDispatch();
    const profiles = useProfiles();
    const init = useInit();
    useEffect(() => {
        if(!init) {
            dispatch(fetchWallets(profiles.profiles));
        }
    }, [profiles.profiles, dispatch, init])
}

export const useUpdateWalletsKeys = () => {
    const dispatch = useAppDispatch();
    const profiles = useProfiles();
    useEffect(() => {
        for(const profile of profiles.profiles) {
            dispatch(fetchIdToken(profile));
        }
    }, [profiles.profiles, dispatch])
}

