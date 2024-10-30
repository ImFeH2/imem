import React from 'react';
import {X} from 'lucide-react';

const SettingsDialog = ({settings, onSettingsChange, open, onClose}) => {
    const handleChange = (key, value, min, max) => {
        // 确保值在有效范围内
        const boundedValue = Math.max(min, Math.min(max || min * 20, value));
        onSettingsChange({
            ...settings,
            [key]: boundedValue
        });
    };

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black/30 dark:bg-black/50 backdrop-blur-sm"
                onClick={onClose}
                aria-hidden="true"
            />

            {/* Dialog Content */}
            <div
                role="dialog"
                aria-modal="true"
                className="relative w-full max-w-lg mx-4
          bg-white dark:bg-slate-900
          rounded-2xl shadow-xl
          border border-gray-200 dark:border-slate-800
          animate-fade-in"
            >
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-slate-800">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-slate-50">
                        游戏设置
                    </h2>
                    <button
                        onClick={onClose}
                        className="p-2 rounded-lg transition-colors
              hover:bg-gray-100 dark:hover:bg-slate-800
              text-gray-500 dark:text-slate-400
              focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                    >
                        <X className="w-5 h-5"/>
                    </button>
                </div>

                {/* Settings Content */}
                <div className="overflow-y-auto max-h-[calc(100vh-16rem)]">
                    <div className="p-6 pr-8 space-y-6">
                        {[
                            {id: 'length', label: '初始长度', min: 1, step: 1},
                            {id: 'interval', label: '显示间隔 (ms)', min: 100, max: 6000, step: 100},
                            {id: 'increaseBy', label: '正确增加长度', min: 1, step: 1},
                            {id: 'decreaseBy', label: '错误减少长度', min: 1, step: 1},
                            {id: 'fontSize', label: '字体大小', min: 12, max: 200, step: 1}
                        ].map(({id, label, min, max, step}) => (
                            <div key={id} className="space-y-2">
                                <div className="flex justify-between items-center gap-4 mb-2">
                                    <label
                                        htmlFor={id}
                                        className="text-sm font-medium text-gray-700 dark:text-slate-300"
                                    >
                                        {label}
                                    </label>
                                    <input
                                        type="number"
                                        id={`${id}-number`}
                                        value={settings[id]}
                                        onChange={(e) => {
                                            const value = Number(e.target.value);
                                            if (!isNaN(value)) {
                                                handleChange(id, value, min, max);
                                            }
                                        }}
                                        className="w-20 px-2 py-1 text-right text-sm
                      bg-white dark:bg-slate-900
                      border border-gray-200 dark:border-slate-700
                      rounded-md
                      focus:outline-none focus:ring-2 focus:ring-blue-500/30
                      focus:border-blue-500 dark:focus:border-blue-500
                      transition-all"
                                    />
                                </div>
                                <input
                                    type="range"
                                    id={id}
                                    min={min}
                                    max={max || min * 20}
                                    step={step}
                                    value={settings[id]}
                                    onChange={(e) => handleChange(id, Number(e.target.value), min, max)}
                                    className="w-full h-2 rounded-lg appearance-none cursor-pointer
                    bg-gray-200 dark:bg-slate-700
                    accent-blue-500 dark:accent-blue-400
                    outline-none
                    focus:ring-2 focus:ring-blue-500/30"
                                />
                                <div className="flex justify-between text-xs text-gray-500 dark:text-slate-400">
                                    <span>{min}</span>
                                    <span>{max || min * 20}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Footer */}
                <div className="flex justify-end gap-3 p-6
          border-t border-gray-200 dark:border-slate-800
          bg-gray-50 dark:bg-slate-800/50 rounded-b-2xl"
                >
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-sm font-medium rounded-lg
              bg-blue-500 hover:bg-blue-600
              dark:bg-blue-600 dark:hover:bg-blue-700
              text-white
              focus:outline-none focus:ring-2 focus:ring-blue-500/50
              transition-colors"
                    >
                        完成
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SettingsDialog;
