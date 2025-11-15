import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CurrencyResponse, CurrencyState } from "../../../common/types";

const initialState: CurrencyState = {
    data: {
        currency: "USD",
    },
};

const currencySlice = createSlice({
    name: "currency",
    initialState,
    reducers: {
        setCurrency: (state, action: PayloadAction<CurrencyResponse>) => {
            return {
                ...state,
                data: {
                    currency: action.payload.currency,
                },
            };
        },
    },
});

export const { setCurrency } = currencySlice.actions;
export const selectCartData = (state: CurrencyState) => state;
export default currencySlice.reducer;
