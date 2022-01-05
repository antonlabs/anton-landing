import {environment} from "../../environments/environment";

export const sendSubscription = async (email: string): Promise<string> => {
    return (await fetch(environment.apiGatewayUrl + '/subscribe', {method: 'POST', body: JSON.stringify({email})})).json();
}
