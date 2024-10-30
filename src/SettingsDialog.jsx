import React from 'react';
import {Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle,} from "@/components/ui/dialog";

const SettingsDialog = ({settings, onSettingsChange, open, onClose}) => {
    const handleChange = (key, value) => {
        onSettingsChange({
            ...settings,
            [key]: value
        });
    };

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>游戏设置</DialogTitle>
                </DialogHeader>

                <div className="p-6 space-y-6">
                    {[
                        {id: 'length', label: '初始长度', min: 1, step: 1},
                        {id: 'interval', label: '显示间隔 (ms)', min: 200, step: 100},
                        {id: 'increaseBy', label: '正确增加长度', min: 1, step: 1},
                        {id: 'decreaseBy', label: '错误减少长度', min: 1, step: 1},
                        {id: 'fontSize', label: '字体大小', min: 12, max: 200, step: 1}
                    ].map(({id, label, min, max, step}) => (
                        <div key={id} className="space-y-2">
                            <div className="flex justify-between items-center">
                                <label
                                    htmlFor={id}
                                    className="text-sm font-medium text-gray-700 dark:text-slate-300"
                                >
                                    {label}
                                </label>
                                <span className="text-sm text-gray-500 dark:text-slate-400">
                  {settings[id]}
                </span>
                            </div>
                            <div className="relative">
                                <input
                                    type="range"
                                    id={id}
                                    min={min}
                                    max={max || min * 20}
                                    step={step}
                                    value={settings[id]}
                                    onChange={(e) => handleChange(id, Number(e.target.value))}
                                    className="w-full h-2 rounded-lg appearance-none cursor-pointer
                    bg-gray-200 dark:bg-slate-700
                    accent-blue-500 dark:accent-blue-400"
                                />
                                <input
                                    type="number"
                                    value={settings[id]}
                                    onChange={(e) => {
                                        const value = Math.max(min, Number(e.target.value) || min);
                                        handleChange(id, value);
                                    }}
                                    min={min}
                                    max={max}
                                    step={step}
                                    className="absolute right-0 top-0 w-16 h-7 px-2
                    text-right text-sm
                    bg-gray-100 dark:bg-slate-800
                    border border-gray-200 dark:border-slate-700
                    rounded-md outline-none
                    focus:ring-2 focus:ring-blue-500/30
                    transition-all"
                                />
                            </div>
                        </div>
                    ))}
                </div>

                <DialogFooter>
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-sm font-medium rounded-lg
              text-white dark:text-slate-50
              bg-blue-500 dark:bg-blue-600
              hover:bg-blue-600 dark:hover:bg-blue-700
              focus:ring-2 focus:ring-blue-500/50
              transition-colors"
                    >
                        完成
                    </button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default SettingsDialog;
