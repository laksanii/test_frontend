"use client";

import { useAppDispatch } from "@/app/hooks";
import { openAdd } from "@/stores/modalSlice";

export default function Navbar() {
    const dispatch = useAppDispatch();

    return (
        <nav className="flex justify-between shadow-sm px-6 py-4 items-center">
            <div className="">Brand</div>
            <button
                onClick={() => {
                    dispatch(openAdd());
                }}
                className="bg-blue-500 text-white p-2 rounded-md text-xs font-medium"
            >
                Add Product
            </button>
        </nav>
    );
}
