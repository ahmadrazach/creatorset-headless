/* eslint-disable import/no-extraneous-dependencies */
import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

// Import reducers
import menuReducer from "../reducers/menu";
import cartReducer from "../reducers/cart";
import currencyReducer from "../reducers/currency";
import customCartReducer from "../reducers/customBundle";

const store = configureStore({
    reducer: {
        menu: menuReducer,
        cart: cartReducer,
        currency: currencyReducer,
        customCart: customCartReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDisatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
