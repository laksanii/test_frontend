"use client";

import { useAppDispatch } from "@/app/hooks";
import { openAdd } from "@/stores/modalSlice";
import Link from "next/link";

export default function Navbar() {
    const dispatch = useAppDispatch();

    return (
        <nav className="flex justify-between shadow-sm px-6 py-4 items-center">
            <Link href={"/"} className="font-bold text-lg">
                Brand
            </Link>
            <div className="space-x-4">
                <Link href={"/pokemon-api"} className="text-sm">
                    {" "}
                    Pokemon-API
                </Link>
                <button
                    onClick={() => {
                        dispatch(openAdd());
                    }}
                    className="bg-blue-500 text-white p-2 rounded-md text-xs font-medium"
                >
                    Add Product
                </button>
            </div>
        </nav>
    );
}
