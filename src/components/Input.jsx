import React from 'react';

const Input = ({className = '', ...props}) => {
    return (
        <input
            className={`w-full px-3 py-2 border-2 border-gray-200 rounded-lg 
        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
        transition-all ${className}`}
            {...props}
        />
    );
};

export default Input;
