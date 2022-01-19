import {useLanguage} from "../../state/language/hooks";
import {Button} from "../Button/Button";
import {toggleLanguage} from "../../state/language";
import {useAppDispatch} from "../../state";
import "./LanguageButton.scss";



export const LanguageButton = () => {
    const {language} = useLanguage();
    const dispatch = useAppDispatch();

    return <Button style={'icon'} onClick={() => dispatch(toggleLanguage())}>
        <img className={'flag'} alt={language} src={'/assets/flags/'+language+'.svg'} />
    </Button>

}
