"use client";

import { store } from "@/stores/store";
import React from "react";
import { Provider } from "react-redux";

interface props {
    children: React.ReactNode;
}

export default function Main({ children }: props) {
    return <Provider store={store}>{children}</Provider>;
}
