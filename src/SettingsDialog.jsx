import React from 'react';
import {X} from 'lucide-react';

const SettingsDialog = ({settings, onSettingsChange, open, onClose}) => {
    if (!open) return null;

    const handleChange = (key, value) => {
        onSettingsChange({
            ...settings,
            [key]: value
        });
    };

    return (
        <>
            {/* 遮罩层 */}
            <div
                className="fixed inset-0 bg-black/20 dark:bg-black/50 backdrop-blur-sm z-50"
                onClick={onClose}
            />

            {/* 对话框 */}
            <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
        w-full max-w-md mx-4 z-50
        bg-white dark:bg-slate-900
        rounded-lg shadow-xl border border-gray-200 dark:border-slate-700">

                {/* 标题栏 */}
                <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-slate-700">
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-slate-50">游戏设置</h2>
                    <button
                        onClick={onClose}
                        className="p-1 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
                        aria-label="Close"
                    >
                        <X className="w-5 h-5"/>
                    </button>
                </div>

                {/* 设置项 */}
                <div className="p-4 space-y-4">
                    {/* 长度设置 */}
                    <div className="setting-item">
                        <label className="setting-label" htmlFor="length">
                            初始长度
                        </label>
                        <div className="setting-input-wrapper">
                            <input
                                type="number"
                                id="length"
                                value={settings.length}
                                onChange={(e) => handleChange('length', Math.max(1, parseInt(e.target.value) || 0))}
                                min="1"
                                className="setting-input"
                            />
                        </div>
                    </div>

                    {/* 显示间隔设置 */}
                    <div className="setting-item">
                        <label className="setting-label" htmlFor="interval">
                            显示间隔 (ms)
                        </label>
                        <div className="setting-input-wrapper">
                            <input
                                type="number"
                                id="interval"
                                value={settings.interval}
                                onChange={(e) => handleChange('interval', Math.max(200, parseInt(e.target.value) || 0))}
                                min="200"
                                step="100"
                                className="setting-input"
                            />
                        </div>
                    </div>

                    {/* 正确增加长度设置 */}
                    <div className="setting-item">
                        <label className="setting-label" htmlFor="increaseBy">
                            正确增加长度
                        </label>
                        <div className="setting-input-wrapper">
                            <input
                                type="number"
                                id="increaseBy"
                                value={settings.increaseBy}
                                onChange={(e) => handleChange('increaseBy', Math.max(1, parseInt(e.target.value) || 0))}
                                min="1"
                                className="setting-input"
                            />
                        </div>
                    </div>

                    {/* 错误减少长度设置 */}
                    <div className="setting-item">
                        <label className="setting-label" htmlFor="decreaseBy">
                            错误减少长度
                        </label>
                        <div className="setting-input-wrapper">
                            <input
                                type="number"
                                id="decreaseBy"
                                value={settings.decreaseBy}
                                onChange={(e) => handleChange('decreaseBy', Math.max(1, parseInt(e.target.value) || 0))}
                                min="1"
                                className="setting-input"
                            />
                        </div>
                    </div>

                    {/* 字体大小设置 */}
                    <div className="setting-item">
                        <label className="setting-label" htmlFor="fontSize">
                            字体大小
                        </label>
                        <div className="setting-input-wrapper">
                            <input
                                type="number"
                                id="fontSize"
                                value={settings.fontSize}
                                onChange={(e) => handleChange('fontSize', Math.max(12, parseInt(e.target.value) || 0))}
                                min="12"
                                max="200"
                                className="setting-input"
                            />
                        </div>
                    </div>
                </div>

                {/* 页脚 */}
                <div className="flex justify-end gap-3 p-4 bg-gray-50 dark:bg-slate-800/50 rounded-b-lg">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-sm font-medium
              text-gray-700 dark:text-slate-300
              hover:bg-gray-100 dark:hover:bg-slate-800
              rounded-lg transition-colors"
                    >
                        关闭
                    </button>
                </div>
            </div>

            <style jsx>{`
                .setting-item {
                    @apply flex flex-col gap-1;
                }

                .setting-label {
                    @apply text-sm font-medium text-gray-700 dark:text-slate-300;
                }

                .setting-input-wrapper {
                    @apply relative;
                }

                .setting-input {
                    @apply w-full px-3 py-2
                    bg-gray-100 dark:bg-slate-800
                    border border-gray-200 dark:border-slate-700
                    rounded-lg outline-none
                    text-gray-900 dark:text-slate-50
                    transition-all duration-200
                    focus:ring-2 focus:ring-blue-500/30
                    focus:border-blue-500;
                }
            `}</style>
        </>
    );
};

export default SettingsDialog;
