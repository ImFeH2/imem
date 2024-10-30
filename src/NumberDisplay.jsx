import React from 'react';

const NumberDisplay = ({number, fontSize, fontFamily, numberColor = 'currentColor'}) => {
    // 根据字体添加特殊效果的样式
    const getFontEffectStyle = () => {
        const baseStyle = {color: numberColor};

        switch (fontFamily) {
            case "'Yellowtail', cursive":
                return {
                    ...baseStyle,
                    textShadow: `0 0 10px ${numberColor}, 0 0 20px ${numberColor}, 0 0 30px ${numberColor}`
                };
            case "'Press Start 2P', cursive":
                return {
                    ...baseStyle,
                    textShadow: '2px 2px 0 #000'
                };
            case "'Digital-7', monospace":
                return {
                    ...baseStyle,
                    textShadow: `0 0 5px ${numberColor}80`
                };
            case "'LCD', monospace":
                return {
                    ...baseStyle,
                    textShadow: `0 0 2px ${numberColor}80`
                };
            default:
                return baseStyle;
        }
    };

    return (
        <div className="fixed inset-0 z-10 flex items-center justify-center
            bg-gradient-to-b from-blue-50 via-white to-blue-50
            dark:from-slate-900 dark:via-slate-950 dark:to-slate-900
            transition-colors duration-300">
            <div
                className="number-display select-none animate-fade-in"
                style={{
                    fontSize: `${fontSize}px`,
                    fontFamily: fontFamily,
                    ...getFontEffectStyle()
                }}
                aria-live="polite"
            >
                {number}
            </div>
        </div>
    );
};

export default NumberDisplay;
