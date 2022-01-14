import {configureStore} from "@reduxjs/toolkit";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {State} from "./types";
import {newsletterReducer} from "./newsletter";

const persistedState = localStorage.getItem('state');
const PERSISTED_KEYS: string[] = ['profiles', 'landingInfo']

export default configureStore({
    reducer: {
        newsletter: newsletterReducer
    },
    preloadedState: persistedState ? JSON.parse(persistedState) : undefined,
    middleware: (getDefaultMiddleware => getDefaultMiddleware({
        thunk: true,
        save: {states: PERSISTED_KEYS}
    }))
})


export const useAppDispatch = () => useDispatch();
export const useAppSelector: TypedUseSelectorHook<State> = useSelector;

