import React from 'react';

const Button = ({
                    children,
                    onClick,
                    className = '',
                    variant = 'default',
                    size = 'default',
                    ...props
                }) => {
    const baseStyles = 'rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-blue-500';

    const variants = {
        default: 'bg-blue-500 hover:bg-blue-600 text-white',
        outline: 'border-2 border-gray-200 hover:border-blue-500 bg-white hover:bg-blue-50'
    };

    const sizes = {
        default: 'px-4 py-2 text-sm',
        large: 'px-6 py-3 text-lg',
        icon: 'p-2'
    };

    return (
        <button
            onClick={onClick}
            className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;
