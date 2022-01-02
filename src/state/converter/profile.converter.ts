import {WalletConverter} from "./wallet.converter";
import {ProfileModel} from "../types";

export class ProfileConverter {

    static empty(): ProfileModel {
        return {
            wallet: WalletConverter.empty(),
            authDetails: {},
            chatId: ''
        }
    }

    fromDynamoModel(model: any): ProfileModel {
        return {
            wallet: WalletConverter.fromDynamoModel(model),
            authDetails: {},
            chatId: model.pk
        };
    }

}
