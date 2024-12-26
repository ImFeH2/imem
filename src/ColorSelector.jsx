import React from 'react';
import {Check} from 'lucide-react';

const colors = [
    {id: 'default', name: 'Default Color', value: 'currentColor'},
    {id: 'blue', name: 'Blue', value: '#3B82F6'},
    {id: 'green', name: 'Green', value: '#10B981'},
    {id: 'purple', name: 'Purple', value: '#8B5CF6'},
    {id: 'red', name: 'Red', value: '#EF4444'},
    {id: 'yellow', name: 'Gold', value: '#F59E0B'}
];

const ColorSelector = ({value = 'currentColor', onChange}) => {
    return (
        <div className="grid grid-cols-2 gap-2 w-full">
            {colors.map((color) => (
                <button
                    key={color.id}
                    onClick={() => onChange(color.value)}
                    className={`
                        relative flex items-center justify-between
                        px-3 py-2 rounded-lg text-left
                        border-2 transition-all duration-200
                        ${value === color.value
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                        : 'border-gray-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-700'
                    }
                    `}
                >
                    <span
                        className="w-6 h-6 rounded-full"
                        style={{
                            backgroundColor: color.value === 'currentColor'
                                ? 'currentColor'
                                : color.value
                        }}
                    />
                    <span className="text-sm ml-2 opacity-60">{color.name}</span>
                    {value === color.value && (
                        <Check className="w-4 h-4 text-blue-500 absolute right-2"/>
                    )}
                </button>
            ))}
        </div>
    );
};

export default ColorSelector;
