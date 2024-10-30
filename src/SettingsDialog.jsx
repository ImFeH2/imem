import React from 'react';

const Button = ({
                    children,
                    onClick,
                    className = '',
                    variant = 'default',
                    disabled = false,
                    ...props
                }) => {
    const baseStyles = `
    rounded-lg
    transition-all duration-200
    focus:outline-none focus:ring-2 focus:ring-blue-500/50
    disabled:opacity-50 disabled:cursor-not-allowed
  `;

    const variants = {
        default: `
      bg-blue-500 hover:bg-blue-600 
      text-white
      border border-blue-500 hover:border-blue-600
    `,
        outline: `
      bg-transparent
      text-gray-700 dark:text-slate-300
      border border-gray-200 dark:border-slate-700
      hover:bg-gray-50 dark:hover:bg-slate-800
    `
    };

    return (
        <button
            onClick={disabled ? undefined : onClick}
            disabled={disabled}
            className={`${baseStyles} ${variants[variant]} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;
