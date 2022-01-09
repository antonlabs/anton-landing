import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {editWallet, getProfileByWalletName, getWallet, login, refreshIdToken} from "./helpers";
import {ProfileModel, ProfilesState, WalletModel} from "../types";
import {InitiateAuthCommandOutput} from "@aws-sdk/client-cognito-identity-provider";


export const fetchProfile = createAsyncThunk<ProfileModel, string>(
    'profiles/fetchProfile',
    async (key) => {
        const session = await login(key.split(':')[0], key.split(':')[1]);
        const wallet = await getWallet(
            session.getIdToken().getJwtToken()
        );
        return {
            wallet: wallet,
            authDetails: {
                IdToken: session.getIdToken().getJwtToken(),
                RefreshToken: session.getRefreshToken().getToken(),
                AccessToken: session.getAccessToken().getJwtToken(),
            },
            pending: false,
            chatId: session.getIdToken().decodePayload().nickname
        }
    }
)

export const fetchWallets = createAsyncThunk<ProfileModel[], ProfileModel[]>(
    'profiles/fetchWallet',
    async (profiles) => {
        const result: ProfileModel[] = [];
        await Promise.all(profiles.map(async (item) => {
            const profile = JSON.parse(JSON.stringify(item));
            const authDetails = {
                ...{RefreshToken: profile.authDetails.RefreshToken},
                ...(await refreshIdToken(profile)).AuthenticationResult!
            };
            console.log('auth details', authDetails);
            if(authDetails) {
                profile.wallet = await getWallet(
                    authDetails.IdToken!
                );
                profile.authDetails = authDetails;
            }
            result.push(profile);
        }));
        return result;
    }
)

export const editWalletAndFetch = createAsyncThunk<WalletModel, ProfileModel>(
    'profiles/editWallet',
    (profile) => {
        return editWallet(profile.authDetails.IdToken!, profile.wallet);
    }
)

export const fetchIdToken = createAsyncThunk<InitiateAuthCommandOutput, ProfileModel>(
    'profiles/refreshIdToken',
    (profile) => {
        return refreshIdToken(profile);
    }
)

export const profilesSlice = createSlice({
    name: 'profiles',
    initialState: {
        profiles: [],
        openWallets: false,
        init: false
    } as ProfilesState,
    reducers: {
        addProfile: (state, action: PayloadAction<ProfileModel>) => {
            if(action.payload && state.profiles.findIndex(item => item.wallet.name === action.payload.wallet.name) === -1) {
                state.profiles.push(action.payload);
            }
        },
        setWallet: (state, action: PayloadAction<WalletModel>) => {
            const profile = getProfileByWalletName(action.payload.name, state.profiles);
            profile.wallet = action.payload;
        },
        toggleOpenWallet: (state) => {
            state.openWallets = !state.openWallets;
        },
        selectWallet: (state, action: PayloadAction<string>) => {
            state.profiles = state.profiles.sort((a) => a.wallet.name === action.payload ? -1 : 1)
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchProfile.pending, () => {
            console.log('fetching profiles...');
        })
        builder.addCase(fetchProfile.fulfilled, (state, action) => {
            console.log(action.payload);
            if(action.payload && state.profiles.findIndex(item => item.wallet.name === action.payload.wallet.name) === -1) {
                state.profiles.push(action.payload);
            }
        })
        builder.addCase(fetchWallets.fulfilled, (state, action) => {
           state.profiles = action.payload;
           state.init = true;
        })
        builder.addCase(fetchWallets.rejected, (state, action) => {
            console.log(action.error);
        })
        builder.addCase(editWalletAndFetch.pending, (state, action) => {
            const profile = getProfileByWalletName(action.meta.arg.wallet.name, state.profiles);
            console.log('pending');
            profile.wallet.loading = true;
        })
        builder.addCase(editWalletAndFetch.fulfilled, (state, action) => {
            const profile = getProfileByWalletName(action.meta.arg.wallet.name, state.profiles);
            console.log('finish', JSON.parse(JSON.stringify(action.payload)));
            profile.wallet = action.payload;
            profile.wallet.loading = false;
        })
        builder.addCase(fetchIdToken.fulfilled, (state, action) => {
            const profile = getProfileByWalletName(action.meta.arg.wallet.name, state.profiles);
            console.log('fetch id token', JSON.parse(JSON.stringify(profile)));
            if(action.payload.AuthenticationResult) {
                profile.authDetails = action.payload.AuthenticationResult;
                console.log(profile.authDetails);
            }
        })
    }
});

export const {addProfile, toggleOpenWallet, setWallet, selectWallet} = profilesSlice.actions;

export const profilesReducer = profilesSlice.reducer;
