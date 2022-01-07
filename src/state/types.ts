import {AuthenticationResultType} from "@aws-sdk/client-cognito-identity-provider";
import {KlineModel} from "../clients/binance/models/kline.model";
import {Model} from "../clients/binance/models/model";
import {OrderFills} from "../clients/binance/models/order-response";


/*Profiles state*/
export interface ProfilesState {
    profiles: ProfileModel[];
    init: boolean;
    openWallets: boolean;
}


export enum WalletType {
    HUOBI,
    BINANCE
}

export interface WalletModel {
    name: string;
    accessKey: string;
    secretKey: string;
    totalEarnings: number;
    units: number;
    loading?: boolean;
    euroPerUnits: number;
    type: WalletType;
}


export interface ProfileModel {
    chatId: string;
    authDetails: AuthenticationResultType;
    wallet: WalletModel;
    error?: string;
}


/*Landing state*/
export interface LandingInfo {
    totalTransactions: number;
}

/*Order states*/
export interface OrderResponse extends Model {
    symbol: string,
    orderId: number,
    orderListId: number, // Unless OCO, value will be -1
    clientOrderId: string,
    updateTime?: number,
    stopPrice?: string,
    transactTime: number,
    price: string,
    origQty: string,
    executedQty: string,
    fills: OrderFills[],
    cummulativeQuoteQty: string,
    status: 'CANCELED' | 'EXPIRED' | 'REJECTED' | 'FILLED' | 'NEW' | 'PARTIALLY_FILLED',
    timeInForce: string,
    type: string,
    side: string
}

export interface Order extends OrderResponse {
    parentOrder?: Order;
    attachedOrder?: Order;
    open?: boolean;
}

export interface AddOrders {
    walletName: string;
    orders: Order[];
    side: sides;
}

export type sides = 'buy' | 'sell' | 'history';

export interface FetchOrder {
    profile: ProfileModel;
    side: sides;
}

export interface FetchResponse {
    orders: Order[];
    walletName: string;
    side: sides;
}

export type AllOrders = {
    [key in sides]: Order[];
} & {loading: boolean}

export type SearchOrder = {
    walletName: string,
    orderId: number,
    side: sides
}

export type SearchOrderListId = {
    walletName: string,
    orderListId: number,
    side: sides
}

export interface OrdersPayload {
    [key: string]: AllOrders
}

export type RemoveOrders = AddOrders;


/* Tab manager status */

export interface TabManagerState {
    tabs: TabI[];
    selectedTab: number;
}

export interface TabI {
    symbol: string;
    orders: Order[];
    candles: KlineModel[]
}

export interface FetchTabCandlesRequest {
    symbol: string;
    append?: boolean;
    startTime?: number;
    endTime?: number;
    limit?: number;
    interval?: '5m' | '1h'
}

/*Device state*/
export interface DeviceState {
    screenWidth: number;
    isMobile: boolean;
}

export interface NewsletterState {
    error?: string;
    pending: boolean;
    subscribedWith?: string;
}



/*General state*/
export interface State {
    profiles: ProfilesState;
    orders: OrdersPayload;
    tabManager: TabManagerState;
    newsletter: NewsletterState;
    landingInfo: LandingInfo;
    device: DeviceState,
}


