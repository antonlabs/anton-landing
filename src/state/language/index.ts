import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {LanguageState} from "../types";

export const languages = ['en', 'it'];

export const languageSlice = createSlice({
    name: 'language',
    initialState: {
        language: navigator.language
    } as LanguageState,
    reducers: {
        setLanguage: (state: LanguageState, action: PayloadAction<string>) => {
            state.language = (languages.indexOf(action.payload) > -1 ? action.payload : 'en') as 'en' | 'it';
        },
        toggleLanguage: (state: LanguageState, action: PayloadAction<any>) => {
            console.log(state.language);
            if(state.language === 'en') {
                state.language = 'it';
            }else {
                state.language = 'en';
            }
        }
    }
});

export const languageReducer = languageSlice.reducer;

export const {setLanguage, toggleLanguage} = languageSlice.actions;
