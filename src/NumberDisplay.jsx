import React from 'react';

const NumberDisplay = ({number, fontSize, fontFamily}) => {
    // 根据字体添加特殊效果的样式
    const getFontEffectStyle = () => {
        switch (fontFamily) {
            case "'Yellowtail', cursive":
                return {
                    textShadow: '0 0 10px #fff, 0 0 20px #fff, 0 0 30px #0ff'
                };
            case "'Press Start 2P', cursive":
                return {
                    textShadow: '2px 2px 0 #000'
                };
            case "'Digital-7', monospace":
                return {
                    // 数字显示屏效果
                    textShadow: '0 0 5px rgba(0,255,255,0.5)',
                    color: '#00ffff'
                };
            case "'LCD', monospace":
                return {
                    // LCD显示屏效果
                    color: '#32CD32',
                    textShadow: '0 0 2px rgba(50,205,50,0.8)'
                };
            default:
                return {};
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
