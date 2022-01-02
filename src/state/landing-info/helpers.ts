import {environment} from "../../environments/environment";

export const getTotalTransactions = async (): Promise<number> => {
    return (await fetch(environment.apiGatewayUrl + '/totalTransactions')).json();
};
