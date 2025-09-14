import { ReactNode } from "react";

type CardProps = {
    children: ReactNode;
    className?: string;
};

export default function Card({ children, className }: CardProps ) {
    return (
        <div className={`space-y-7 mx-3.5 mt-5 p-6 bg-white rounded-xl shadow-md ${className}`}>
            {children}
        </div>
    );
}
