/* eslint-disable import/no-extraneous-dependencies */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartResponse, CartState } from "../../../common/types";
import {
    getCartCountFromLocalStorage,
    getCartIdFromLocalStorage,
} from "../../../helper/helper";

const cartId = getCartIdFromLocalStorage("cartId");
const cartCount = getCartCountFromLocalStorage("cartCount");
const initialState: CartState = {
    data: {
        id: cartId || "",
        itemCount: parseInt(cartCount || "0", 10),
    },
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        setCart: (state, action: PayloadAction<CartResponse>) => {
            return {
                ...state,
                data: {
                    id: action.payload.id,
                    itemCount: action.payload.itemCount,
                },
            };
        },
        setCartCount: (state, action: PayloadAction<CartResponse>) => {
            return {
                ...state,
                data: {
                    id: action.payload.id,
                    itemCount: action.payload.itemCount,
                },
            };
        },
        removeCart: state => {
            return {
                ...state,
                data: { id: "", itemCount: 0 },
            };
        },
    },
});

export const { setCart, setCartCount } = cartSlice.actions;
export const selectCartData = (state: CartState) => state;
export default cartSlice.reducer;
