/*Landing state*/
export interface LandingInfo {
    totalTransactions: number;
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
    newsletter: NewsletterState;
    landingInfo: LandingInfo;
    device: DeviceState,
}


