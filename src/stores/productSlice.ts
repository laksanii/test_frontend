import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

const initialState: ProductState = {
    products: [
        {
            id: "573b054d-601c-45f5-a87a-82c3a11a0a80",
            name: "bugatti",
            image_url:
                "https://images.unsplash.com/photo-1566023888476-6f17e362fbb7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fG1jbGFyZW58ZW58MHx8MHx8fDA%3D",
            price: 1500,
            stock: 4,
        },
        {
            id: "b2d2c4bd-9347-4326-831a-ec5e2898f62c",
            name: "McLaren",
            image_url:
                "https://images.unsplash.com/photo-1516298252535-cf2ac5147f9b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fG1jbGFyZW58ZW58MHx8MHx8fDA%3D",
            price: 2000,
            stock: 4,
        },
        {
            id: "bb4c3cc6-b790-4479-887e-356af3a91205",
            name: "lamborgini",
            image_url:
                "https://images.unsplash.com/photo-1715372028767-f89c9818634a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fG1jbGFyZW58ZW58MHx8MHx8fDA%3D",
            price: 5000,
            stock: 4,
        },
        {
            id: "33c4cba9-7895-4e1a-b11d-9db15895f6f7",
            name: "ferrari",
            image_url:
                "https://images.unsplash.com/photo-1686440706886-5e4ca13dd1d3?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            price: 3000,
            stock: 4,
        },
    ],
    selectedProduct: {
        id: "",
        name: "",
        image_url: "",
        price: 0,
        stock: 0,
    },
};

export const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        addProduct: (state, action: PayloadAction<Product>) => {
            const id = uuidv4();
            state.products.push({
                ...action.payload,
                id,
            });
        },

        selectProduct: (state, action: PayloadAction<Product>) => {
            state.selectedProduct = action.payload;
        },

        deleteProduct: (state, action: PayloadAction<string>) => {
            state.products = state.products.filter(
                (item) => item.id !== action.payload
            );
        },

        editProduct: (state, action: PayloadAction<Product>) => {
            const selectedProductIndex = state.products.findIndex(
                (item) => item.id == action.payload.id
            );

            state.products[selectedProductIndex] = action.payload;
        },
    },
});

export const { addProduct, deleteProduct, editProduct, selectProduct } =
    productSlice.actions;

export default productSlice.reducer;
