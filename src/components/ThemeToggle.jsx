import React, {useEffect} from 'react';
import {Moon, Sun} from 'lucide-react';

const ThemeToggle = () => {
    // 获取当前主题
    const getTheme = () => {
        if (typeof localStorage !== 'undefined') {
            const savedTheme = localStorage.getItem('theme');
            if (savedTheme) {
                return savedTheme;
            }
        }
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    };

    // 设置主题
    const setTheme = (theme) => {
        const root = window.document.documentElement;
        root.classList.remove('light', 'dark');
        root.classList.add(theme);
        localStorage.setItem('theme', theme);
    };

    // 初始化主题
    useEffect(() => {
        setTheme(getTheme());
    }, []);

    // 切换主题
    const toggleTheme = () => {
        const currentTheme = getTheme();
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
    };

    return (
        <button
            onClick={toggleTheme}
            className="fixed top-4 right-4 z-50 p-3 rounded-lg transition-all duration-200
        bg-blue-100 dark:bg-slate-800
        hover:bg-blue-200 dark:hover:bg-slate-700
        text-gray-900 dark:text-slate-50
        border border-blue-200 dark:border-slate-700"
            aria-label="Toggle theme"
        >
            {getTheme() === 'dark' ? (
                <Sun className="w-5 h-5"/>
            ) : (
                <Moon className="w-5 h-5"/>
            )}
        </button>
    );
};

export default ThemeToggle;
