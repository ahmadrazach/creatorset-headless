/* eslint-disable import/no-extraneous-dependencies */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MenuResponse } from "../../../common/types";

interface MenuState {
    data: MenuResponse;
    itemsCount: number;
}

const initialState: MenuState = {
    data: {
        id: "",
        title: "",
        handle: "",
        items: [],
        itemsCount: 0,
    },
    itemsCount: 0,
};

const menuSlice = createSlice({
    name: "menu",
    initialState,
    reducers: {
        setMenu: (state, action: PayloadAction<MenuResponse>) => {
            return {
                ...state,
                data: action.payload,
            };
        },
    },
});

export const { setMenu } = menuSlice.actions;
export const selectMenusData = (state: MenuState) => state;
export default menuSlice.reducer;
