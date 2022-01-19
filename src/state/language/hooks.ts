import {useAppSelector} from "../index";
import {LanguageState} from "../types";
import {en} from './langs/en';
import {it} from './langs/it';

const languages = {
    en,
    it
}

const getLiteral = (str: string, obj: any): any => {
    return str.split('.').reduce((o, i) => (o ?? {[str]: undefined})[i], obj);
};

export const useLanguage = (): LanguageState => {
    return useAppSelector((state) => state.language);
}

export const translate = (term: string): string => {
    const lang = useLanguage().language;
    const translation = getLiteral(term, languages[lang]);
    if(translation) {
        return translation;
    }
    return term;
}
