import { ReactNode } from "react";

type CardProps = {
    children: ReactNode;
    className?: string;
    variant?: "default" | "background";
};

export default function Card({ children, className, variant = "default" }: CardProps ) {
    let variantClass: string;


    switch (variant) {
        case "background":
            variantClass = "shadow-md bg-white";
            break;
        default:
            variantClass = "";
            break;
    }

    return (
        <div className={`space-y-7 mx-0 mt-5 p-6 rounded-xl ${variantClass} ${className}`}>
            {children}
        </div>
    );
}
