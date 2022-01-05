import {NewsletterState} from "../types";
import {useAppSelector} from "../index";

export const useNewsletter = (): NewsletterState => {
    return useAppSelector((state) => state.newsletter);
}
