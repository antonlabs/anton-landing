import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {NewsletterState} from "../types";
import {sendSubscription} from "./helpers";

export const createNewsletter = createAsyncThunk<string, string>(
    'profiles/newsletter',
    async (email) => {
        await sendSubscription(email);
        return email;
    }
)

export const newsletterSlice = createSlice({
    name: 'newsletter',
    initialState: {
        active: false,
        pending: false,
        creating: false
    } as NewsletterState,
    reducers: {
        toggleCreate: (state: NewsletterState, action: PayloadAction<void>) => {
            state.creating = !state.creating;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(createNewsletter.pending, (state: NewsletterState) => {
            state.error = undefined;
            state.pending = true;
        })
        builder.addCase(createNewsletter.rejected, (state: NewsletterState, action: any) => {
            console.error(state.error, action.error);
            state.error = 'Error during connection, retry later';
            state.pending = false;
        })
        builder.addCase(createNewsletter.fulfilled, (state: NewsletterState, action) => {
            state.subscribedWith = action.payload;
            state.pending = false;
        })
    }
})


export const newsletterReducer = newsletterSlice.reducer;

export const {toggleCreate} = newsletterSlice.actions;
