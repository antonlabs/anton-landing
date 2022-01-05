import {configureStore} from "@reduxjs/toolkit";
import {profilesReducer} from "./profiles";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {State} from "./types";
import {ordersReducer} from "./orders";
import {tabsReducer} from "./tabs";
import {deviceReducer} from "./device";
import {newsletterReducer} from "./newsletter";

const persistedState = localStorage.getItem('state');
const PERSISTED_KEYS: string[] = ['profiles', 'landingInfo']

export default configureStore({
    reducer: {
        profiles: profilesReducer,
        orders: ordersReducer,
        newsletter: newsletterReducer,
        tabManager: tabsReducer,
        device: deviceReducer
    },
    preloadedState: persistedState ? JSON.parse(persistedState) : undefined,
    middleware: (getDefaultMiddleware => getDefaultMiddleware({
        thunk: true,
        save: {states: PERSISTED_KEYS}
    }))
})


export const useAppDispatch = () => useDispatch();
export const useAppSelector: TypedUseSelectorHook<State> = useSelector;

