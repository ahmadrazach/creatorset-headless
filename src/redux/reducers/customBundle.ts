/* eslint-disable import/no-extraneous-dependencies */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CustomCartResponse, CustomCartState } from "../../../common/types";

const initialState: CustomCartState = {
    data: {
        products: [],
    },
};

const customCartSlice = createSlice({
    name: "customcart",
    initialState,
    reducers: {
        addProductNode: (state, action: PayloadAction<CustomCartResponse>) => {
            return {
                ...state,
                data: {
                    ...state.data,
                    products: [...state.data.products, action.payload],
                },
            };
        },
        removeProductNode: (state, action: PayloadAction<string>) => {
            const nodeIdToRemove = action.payload;
            return {
                ...state,
                data: {
                    ...state.data,
                    products: state.data.products.filter(
                        product => product.node.id !== nodeIdToRemove
                    ),
                },
            };
        },
        clearCustomCart: () => initialState,
    },
});

export const { addProductNode, removeProductNode, clearCustomCart } =
    customCartSlice.actions;
export const selectCustomCartData = (state: CustomCartState) => state;
export default customCartSlice.reducer;
