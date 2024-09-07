import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./productSlice";
import modalReducer from "./modalSlice";

export const store = configureStore({
    reducer: {
        product: productReducer,
        modal: modalReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
