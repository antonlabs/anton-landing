import {DailyTickerModel} from "./binance/models/daily-ticker.model";
import {OrderResponse} from "./binance/models/order-response";
import {TitleModel} from "./binance/models/title.model";
import {TradeInfoModel} from "./binance/models/trade-info.model";
import {OrderModel} from "./binance/models/order.model";

import * as crypto from 'crypto';
import * as querystring from 'querystring';

export abstract class ExchangeClient {

    requestsChunks = 100;

    protected constructor(
        protected environment: any,
        protected url: string,
        protected apikey: string,
        protected apiSecret: string
    ) {}

    signBytes(msg: string): string {
        console.log('Signing', msg, this.apiSecret);

        return crypto.createHmac('sha256', this.apiSecret).update(msg).digest('hex');
    }

    async prepareRequest(endpoint: string, method: string, signed: boolean, params = {}): Promise<any> {
        console.log('Calling url', this.url + endpoint);
        if (signed) {
            params = {...params, ...{timestamp: Date.now()}};
            params = {...params, ...{signature: this.signBytes(querystring.encode(params))}};
        }
        console.log({
            url: this.url + endpoint,
            params,
            qsStringifyOptions: {
                arrayFormat: 'repeat'
            },
            headers: {'X-MBX-APIKEY': this.apikey},
            method
        });

        const headers = new Headers();
        if(signed) {
            headers.append('X-MBX-APIKEY', this.apikey);
        }

        const url = new URL(this.url + endpoint);
        Object.keys(params).forEach(key => {
            if((params as any)[key]) {
                url.searchParams.append(key, (params as any)[key]);
            }
        });

        return (await fetch(url.toString(), {
            headers,
            method
        })).json();
    }

    abstract getExchangeInfo(): Promise<any>;

    abstract getDailyTicker(symbol: string): Promise<DailyTickerModel>;

    abstract getFeeInfo(symbol: string): Promise<TradeInfoModel[]>;

    abstract getTicks(): Promise<{ [key: string]: string }>;

    abstract getPercentPrice(): Promise<{ [key: string]: { multiplierUp: number, multiplierDown: number } }>;

    abstract getOrder(symbol: string, orderId: number): Promise<OrderResponse>;

    abstract cancelOrder(symbol: string, orderId: number): Promise<OrderResponse>;

    abstract getMinNotional(): Promise<{ [key: string]: string }>;

    abstract getStepSizes(): Promise<{ [key: string]: string }>;

    abstract getPrices(symbolMarket: string): Promise<TitleModel>;

    abstract getPriceWithPrecision(price: number, precision: string): number;

    abstract buyTitle(symbol: string, price: number, quantity: number): Promise<OrderModel>;

    abstract stopLossMarket(symbol: string, price: number, quantity: number): Promise<OrderModel>;

    abstract stopLoss(symbol: string, price: number, quantity: number, actualPrice: number): Promise<OrderModel>;

    abstract sellTitleMarket(symbol: string, price: number, quantity: number): Promise<OrderModel>;

    abstract sellTitle(symbol: string, price: number, quantity: number, currentPrice: number): Promise<OrderModel>;

    abstract getSymbols(market: string): Promise<string[]>;

    abstract getHistoricalData(symbol: string, startTime?: number, endTime?: number): Promise<number[]>;

}


