import {WalletModel, WalletType} from "../types";

export class WalletConverter {

    static empty(): WalletModel {
        console.log('empty');
        return {
            euroPerUnits: 20,
            name: '',
            totalEarnings: 0,
            units: 0,
            accessKey: '',
            secretKey: '',
            type: WalletType.BINANCE
        }
    }

    static fromDynamoModel(model: any): WalletModel {
        return {
            euroPerUnits: model.euroPerUnits,
            name: model.pk,
            totalEarnings: model.totalEarnings,
            accessKey: model.accessKey,
            secretKey: model.secretKey,
            units: model.units,
            type: WalletType.BINANCE
        }
    }
}
