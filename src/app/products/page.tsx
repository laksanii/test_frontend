"use client";
import { useAppDispatch, useAppSelector } from "../hooks";
import Modal from "@/components/Modal";
import Product from "@/components/Products";
import { closeAdd, closeDelete, closeEdit } from "@/stores/modalSlice";
import {
    addProduct,
    deleteProduct,
    editProduct,
    selectProduct,
} from "@/stores/productSlice";
import { filterProduct, sortProduct } from "@/utils/helpers";
import { FormEvent, useState } from "react";
import { z } from "zod";

const productSchema = z.object({
    name: z.string(),
    image_url: z.string(),
    price: z.preprocess(
        (value) => parseInt(z.string().parse(value)),
        z.number().positive()
    ),
    stock: z.preprocess(
        (value) => parseInt(z.string().parse(value)),
        z.number().int().nonnegative()
    ),
});

const defaultProduct: Product = {
    id: "",
    name: "",
    image_url: "",
    price: 0,
    stock: 0,
};

export default function Home() {
    const [keyword, setKeyword] = useState<string>("");
    const [sorting, setSorting] = useState<string>("asc-price");
    const dispatch = useAppDispatch();
    const addModal = useAppSelector((state) => state.modal.addModal);
    const deleteModal = useAppSelector((state) => state.modal.deleteModal);
    const editModal = useAppSelector((state) => state.modal.editModal);
    const products = useAppSelector((state) => state.product.products);
    const selectedProduct = useAppSelector(
        (state) => state.product.selectedProduct
    );

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const validate = productSchema.safeParse({
            name: formData.get("name"),
            image_url: formData.get("image_url"),
            price: formData.get("price"),
            stock: formData.get("stock"),
        });

        if (!validate.success) {
            console.log(validate.error.errors);
        } else {
            dispatch(
                addProduct({
                    id: "",
                    ...validate.data,
                })
            );

            dispatch(closeAdd());
        }
    };

    const handleDelete = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        dispatch(deleteProduct(selectedProduct.id));
        dispatch(closeDelete());
    };

    const handleEdit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const validate = productSchema.safeParse({
            name: formData.get("name"),
            image_url: formData.get("image_url"),
            price: formData.get("price"),
            stock: formData.get("stock"),
        });

        if (!validate.success) {
            console.log(validate.error.errors);
        } else {
            dispatch(
                editProduct({
                    id: selectedProduct.id,
                    ...validate.data,
                })
            );

            dispatch(closeEdit());
        }
    };

    return (
        <>
            <Modal onClick={() => console.log("clicked")} isActive={addModal}>
                <div className="transition-transform shadow-lg max-h-modal w-11/12 md:w-3/5 lg:w-2/5 xl:w-4/12 space-y-4 p-4 bg-white rounded-md">
                    <form
                        action=""
                        className="space-y-4"
                        id="form"
                        onSubmit={handleSubmit}
                    >
                        <div className="header">
                            <h3 className="font-medium text-lg">Add Product</h3>
                        </div>
                        <div className="body">
                            <div className="grid">
                                <label htmlFor="name">Product Name</label>
                                <input
                                    className="border rounded-sm"
                                    type="text"
                                    name="name"
                                    id="name"
                                />
                            </div>
                            <div className="grid">
                                <label htmlFor="image_url">Image URL</label>
                                <input
                                    className="border rounded-sm"
                                    type="text"
                                    name="image_url"
                                    id="image_url"
                                />
                            </div>
                            <div className="grid">
                                <label htmlFor="stock">Price</label>
                                <input
                                    className="border rounded-sm"
                                    type="number"
                                    name="price"
                                    id="price"
                                />
                            </div>
                            <div className="grid">
                                <label htmlFor="stock">Stock</label>
                                <input
                                    className="border rounded-sm"
                                    type="number"
                                    name="stock"
                                    id="stock"
                                />
                            </div>
                        </div>
                        <div className="flex justify-end gap-2">
                            <button
                                type="button"
                                onClick={() => {
                                    dispatch(closeAdd());
                                }}
                                className="bg-red-500 px-2 py-1 text-white rounded-md"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="bg-blue-500 px-2 py-1 text-white rounded-md"
                            >
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </Modal>

            <Modal
                onClick={() => console.log("clicked")}
                isActive={deleteModal}
            >
                <div className="transition-transform shadow-lg max-h-modal w-11/12 md:w-3/5 lg:w-2/5 xl:w-4/12 space-y-4 p-4 bg-white rounded-md">
                    <form
                        action=""
                        className="space-y-4"
                        id="form"
                        onSubmit={handleDelete}
                    >
                        <div className="header">
                            <h3 className="font-medium text-lg">
                                Delete Product
                            </h3>
                        </div>
                        <div className="body">
                            Are you sure delete this product?
                        </div>
                        <div className="flex justify-end gap-2">
                            <button
                                type="button"
                                onClick={() => {
                                    dispatch(closeDelete());
                                    dispatch(selectProduct(defaultProduct));
                                }}
                                className="bg-red-500 px-2 py-1 text-white rounded-md"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="bg-blue-500 px-2 py-1 text-white rounded-md"
                            >
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </Modal>

            <Modal onClick={() => console.log("clicked")} isActive={editModal}>
                <div className="transition-transform shadow-lg max-h-modal w-11/12 md:w-3/5 lg:w-2/5 xl:w-4/12 space-y-4 p-4 bg-white rounded-md">
                    <form action="" className="space-y-4" onSubmit={handleEdit}>
                        <div className="header">
                            <h3 className="font-medium text-lg">
                                Edit Product
                            </h3>
                        </div>
                        <div className="body">
                            <div className="grid">
                                <label htmlFor="name">Product Name</label>
                                <input
                                    className="border rounded-sm"
                                    type="text"
                                    name="name"
                                    id="name"
                                    defaultValue={selectedProduct.name}
                                />
                            </div>
                            <div className="grid">
                                <label htmlFor="image_url">Image URL</label>
                                <input
                                    className="border rounded-sm"
                                    type="text"
                                    name="image_url"
                                    id="image_url"
                                    defaultValue={selectedProduct.image_url}
                                />
                            </div>
                            <div className="grid">
                                <label htmlFor="stock">Price</label>
                                <input
                                    className="border rounded-sm"
                                    type="number"
                                    name="price"
                                    id="price"
                                    defaultValue={selectedProduct.price}
                                />
                            </div>
                            <div className="grid">
                                <label htmlFor="stock">Stock</label>
                                <input
                                    className="border rounded-sm"
                                    type="number"
                                    name="stock"
                                    id="stock"
                                    defaultValue={selectedProduct.stock}
                                />
                            </div>
                        </div>
                        <div className="flex justify-end gap-2">
                            <button
                                type="button"
                                onClick={() => {
                                    dispatch(closeEdit());
                                    dispatch(selectProduct(defaultProduct));
                                }}
                                className="bg-red-500 px-2 py-1 text-white rounded-md"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="bg-blue-500 px-2 py-1 text-white rounded-md"
                            >
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </Modal>
            <div className="w-full min-h-screen space-y-4">
                <div className="search space-y-2">
                    <input
                        type="search"
                        name="search"
                        id="search"
                        className="border rounded-lg py-1 px-2 w-full"
                        placeholder="Search ..."
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value)}
                    />
                    <div className="space-x-2">
                        <label htmlFor="order">Sort By:</label>
                        <select
                            name="sort"
                            id="sort"
                            className="border rounded-md px-1"
                            onChange={(e) => {
                                setSorting(e.target.value);
                            }}
                        >
                            <option value="asc-price">Lowest Price</option>
                            <option value="desc-price">Highest Price</option>
                            <option value="asc-stock">Lowest Stock</option>
                            <option value="desc-stock">Highest Stock</option>
                        </select>
                    </div>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 grid-cols-2 gap-4">
                    {sortProduct(
                        sorting,
                        filterProduct(keyword, products)
                    )?.map((item, key) => (
                        <Product detail={item} key={key} />
                    ))}
                </div>
            </div>
        </>
    );
}
