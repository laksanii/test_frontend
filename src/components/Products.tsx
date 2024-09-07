"use client";
import { useAppDispatch } from "@/app/hooks";
import { openDelete, openEdit } from "@/stores/modalSlice";
import { selectProduct } from "@/stores/productSlice";
import Image from "next/image";

interface props {
    detail: Product;
}

export default function Product({ detail }: props) {
    const dispatch = useAppDispatch();

    return (
        <div className="shadow-sm border rounded-md overflow-hidden">
            <div className="relative w-full h-32">
                <Image
                    src={detail.image_url}
                    fill
                    objectFit="cover"
                    alt="product 1"
                />
            </div>
            <div className="p-1 space-y-0.5">
                <h3 className="font-medium capitalize">{detail.name}</h3>
                <p className="text-xs">
                    {detail.price.toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD",
                    })}
                </p>
                <p className="text-sm">Stock: {detail.stock}</p>
                <div className="grid grid-cols-2 gap-1 mt-2">
                    <button
                        onClick={() => {
                            dispatch(openEdit());
                            dispatch(selectProduct(detail));
                        }}
                        className="bg-green-500 text-white px-2 rounded text-sm text-center"
                    >
                        Edit
                    </button>
                    <button
                        onClick={() => {
                            dispatch(openDelete());
                            dispatch(selectProduct(detail));
                        }}
                        className="bg-red-500 text-white px-2 rounded text-sm text-center"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
}
