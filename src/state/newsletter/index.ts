import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {NewsletterState, ProfileModel} from "../types";
import {sendSubscription} from "./helpers";
import {profilesSlice} from "../profiles";

export const createNewsletter = createAsyncThunk<void, string>(
    'profiles/newsletter',
    async (email) => {
        await sendSubscription(email);
    }
)

export const newsletterSlice = createSlice({
    name: 'newsletter',
    initialState: {
        active: false,
        pending: false
    } as NewsletterState,
    reducers: {
        createNewsletter: (state, action: PayloadAction<string>) => {

        },
    },
    extraReducers: (builder) => {
        builder.addCase(createNewsletter.pending, (state: NewsletterState, action) => {
            state.active = true;
            state.pending = true;
        })
        builder.addCase(createNewsletter.rejected, (state: NewsletterState, action: any) => {
            console.log(action.payload);
            state.error = 'Error during connection, retry later';
            state.pending = false;
        })
        builder.addCase(createNewsletter.fulfilled, (state: NewsletterState, action) => {
            state.active = true;
            state.pending = false;
        })
    }
})


export const newsletterReducer = newsletterSlice.reducer;
