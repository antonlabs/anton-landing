import {environment} from "../../environments/environment";
import {SubscriptionPayload} from "../types";



export const sendSubscription = async (payload: SubscriptionPayload): Promise<string> => {
    return (await fetch(environment.apiGatewayUrl + '/newsletter', {method: 'POST', body: JSON.stringify(payload)})).text();
}
