import {
    AuthenticationDetails,
    CognitoUser,
    CognitoUserPool,
    CognitoUserSession
} from 'amazon-cognito-identity-js';
import {environment} from "../../environments/environment";
import {fromCognitoIdentityPool} from "@aws-sdk/credential-providers";
import {DynamoDBClient} from "@aws-sdk/client-dynamodb";
import {ProfileModel, WalletModel} from "../types";
import {DynamoDBDocumentClient} from "@aws-sdk/lib-dynamodb";
import {CognitoIdentityProvider, InitiateAuthCommandOutput} from "@aws-sdk/client-cognito-identity-provider";

const cognitoUserPool = new CognitoUserPool({
    UserPoolId: environment.userPoolId!,
    ClientId: environment.clientId!
});

const cognitoIdentityProvider = new CognitoIdentityProvider({
    region: environment.region
});


export const getWallet = async (idToken: string): Promise<WalletModel> => {
    return (await fetch(environment.apiGatewayUrl + '/wallet', {headers: {'x-id-token': idToken}})).json();
}

export const editWallet = async (idToken: string, wallet: WalletModel): Promise<WalletModel> => {
    return (await fetch(environment.apiGatewayUrl + '/wallet', {method: 'PUT', body: JSON.stringify(wallet), headers: {'x-id-token': idToken}})).json();
}


export const useDynamo = async (profile: ProfileModel, transaction: (dynamoClient: DynamoDBDocumentClient) => Promise<any>): Promise<any> => {

    const logins = {[`cognito-idp.${environment.region}.amazonaws.com/${environment.userPoolId}`]: profile.authDetails.IdToken!};
    const dbClient = new DynamoDBClient({
        region: environment.region,
        credentials: fromCognitoIdentityPool({
            clientConfig: {
                region: environment.region
            },
            identityPoolId: environment.identityPoolId!,
            logins
        })
    });

    const client = DynamoDBDocumentClient.from(dbClient);
    const result = await transaction(client);
    client.destroy();
    return result;
}

export const getProfileByWalletName = (walletName: string, profiles: ProfileModel[]) =>
    profiles.filter(item => item.wallet.name === walletName)[0];

export const login = async (username: string, pass: string): Promise<CognitoUserSession> => {
    const user = new CognitoUser({
        Username: username,
        Pool: cognitoUserPool
    });
    return new Promise((resolve, reject) => {
        user.authenticateUser(new AuthenticationDetails({
            Username: username,
            Password: pass
        }), {
            onSuccess: resolve,
            onFailure: reject
        });
    });
}

export const refreshIdToken = async (profile: ProfileModel): Promise<InitiateAuthCommandOutput> => {
    return cognitoIdentityProvider.initiateAuth({
        AuthFlow: 'REFRESH_TOKEN_AUTH',
        ClientId: cognitoUserPool.getClientId(),
        AuthParameters: {
            REFRESH_TOKEN: profile.authDetails.RefreshToken!
        }
    });
}

