/*Landing state*/
export interface LandingInfo {
    totalTransactions: number;
    cookiesAccepted: boolean;
}

/*Language state*/
export interface LanguageState {
    language: 'en' | 'it';
}

/*Device state*/
export interface DeviceState {
    screenWidth: number;
    isMobile: boolean;
}

export interface NewsletterState {
    error?: string;
    pending: boolean;
    creating: boolean;
    subscribedWith?: string;
}

/*General state*/
export interface State {
    newsletter: NewsletterState;
    language: LanguageState;
    landingInfo: LandingInfo;
}

export interface SubscriptionPayload {
    email: string;
    captchaCode: string;
}


