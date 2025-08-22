import { ReactNode } from "react";

type ButtonProps = {
    children: ReactNode;
    href?: string;
    buttonType?: 'default' | 'primary' | 'danger';
    className?: string;
};

export default function Button({ children, href = "", className = "", buttonType = "default"}: ButtonProps) {
    const buttonTypeMap = {
        default: '',
        primary: 'bg-lime-700 text-white',
        danger: 'bg-red-600 text-white',
    };

    const baseClass = "px-6 border border-gray-200 shadow-md rounded-lg min-h-10 min-w-36 hover:opacity-90"
    
    if (href) return (
        <a href={href} className={`${baseClass} ${buttonTypeMap[buttonType]} ${className}`}>
            {children}
        </a>
    )
    else return (
        <button className={`${baseClass} ${buttonTypeMap[buttonType]} ${className}`}>
            {children}
        </button>
    )
    
}
