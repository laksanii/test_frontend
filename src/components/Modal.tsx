import React from "react";

type Props = {
    children: React.ReactNode;
    isActive: Boolean;
    onClick: (e: React.MouseEvent) => void;
};

export default function Modal({ children, isActive = false, ...props }: Props) {
    if (!isActive) {
        return null;
    }

    return (
        <div
            className={`z-50 flex items-center flex-col pt-52 overflow-hidden fixed inset-0`}
        >
            <div className="bg-gray-900 absolute inset-0 -z-20  bg-gradient-to-tr opacity-75"></div>
            {children}
        </div>
    );
}
