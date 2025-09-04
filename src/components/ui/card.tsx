import { ReactNode } from "react";

type CardProps = {
    children: ReactNode;
    className?: string;
};

export default function card({ children }: CardProps, className = "") {
    return (
        <div className={`space-y-7 mx-auto mt-5 p-6 flex flex-col bg-white rounded-xl shadow-md ${className}`}>
            {children}
        </div>
    );
}
