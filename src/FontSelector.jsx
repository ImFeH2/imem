import React from 'react';
import {Check} from 'lucide-react';

const fonts = [
    {id: 'default', name: '默认字体', value: 'system-ui'},
    {id: 'digital', name: '数字显示', value: "'Digital-7', monospace"},
    {id: 'lcd', name: 'LCD风格', value: "'LCD', monospace"},
    {id: 'retro', name: '复古像素', value: "'Press Start 2P', cursive"},
    {id: 'handwritten', name: '手写体', value: "'Permanent Marker', cursive"},
    {id: 'neon', name: '霓虹灯', value: "'Yellowtail', cursive"}
];

const FontSelector = ({value = 'system-ui', onChange}) => {
    return (
        <div className="grid grid-cols-2 gap-2 w-full">
            {fonts.map((font) => (
                <button
                    key={font.id}
                    onClick={() => onChange(font.value)}
                    className={`
            relative flex items-center justify-between
            px-3 py-2 rounded-lg text-left
            border-2 transition-all duration-200
            ${value === font.value
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                        : 'border-gray-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-700'
                    }
          `}
                    style={{fontFamily: font.value}}
                >
                    <span className="text-xl">123</span>
                    <span className="text-sm ml-2 font-sans opacity-60">{font.name}</span>
                    {value === font.value && (
                        <Check className="w-4 h-4 text-blue-500 absolute right-2"/>
                    )}
                </button>
            ))}
        </div>
    );
};

export default FontSelector;