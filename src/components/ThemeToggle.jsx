import React, {useEffect, useState} from 'react';
import {Moon, Sun} from 'lucide-react';

const ThemeToggle = () => {
    const [theme, setTheme] = useState(() => {
        if (typeof localStorage !== 'undefined' && localStorage.getItem('theme')) {
            return localStorage.getItem('theme');
        }
        if (typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            return 'dark';
        }
        return 'light';
    });

    useEffect(() => {
        const root = window.document.documentElement;
        if (theme === 'dark') {
            root.classList.add('dark');
        } else {
            root.classList.remove('dark');
        }
        localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(theme === 'dark' ? 'light' : 'dark');
    };

    return (
        <button
            onClick={toggleTheme}
            className="fixed top-4 right-4 p-3 rounded-lg transition-colors duration-200
        dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-50
        bg-white hover:bg-gray-100 text-gray-800
        border border-gray-200 dark:border-slate-700"
            aria-label="Toggle theme"
        >
            {theme === 'dark' ? (
                <Sun className="w-5 h-5"/>
            ) : (
                <Moon className="w-5 h-5"/>
            )}
        </button>
    );
};

export default ThemeToggle;
