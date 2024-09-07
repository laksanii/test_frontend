import { createSlice } from "@reduxjs/toolkit";

const initialState: {
    addModal: boolean;
    deleteModal: boolean;
    editModal: boolean;
} = {
    addModal: false,
    deleteModal: false,
    editModal: false,
};

export const modalSlice = createSlice({
    name: "modal",
    initialState,
    reducers: {
        openAdd: (state) => {
            state.addModal = true;
        },
        closeAdd: (state) => {
            state.addModal = false;
        },
        openDelete: (state) => {
            state.deleteModal = true;
        },
        closeDelete: (state) => {
            state.deleteModal = false;
        },
        openEdit: (state) => {
            state.editModal = true;
        },
        closeEdit: (state) => {
            state.editModal = false;
        },
    },
});

export const {
    openAdd,
    closeAdd,
    openDelete,
    closeDelete,
    openEdit,
    closeEdit,
} = modalSlice.actions;

export default modalSlice.reducer;
