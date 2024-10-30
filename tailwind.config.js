/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: 'class',
    theme: {
        extend: {
            keyframes: {
                'fade-in': {
                    '0%': {
                        opacity: '0',
                        transform: 'scale(0.9)'
                    },
                    '100%': {
                        opacity: '1',
                        transform: 'scale(1)'
                    }
                },
                'shake': {
                    '0%, 100%': {transform: 'translateX(0)'},
                    '25%': {transform: 'translateX(-8px)'},
                    '75%': {transform: 'translateX(8px)'}
                }
            },
            animation: {
                'fade-in': 'fade-in 0.3s ease-out',
                'shake': 'shake 0.5s cubic-bezier(.36,.07,.19,.97) both'
            }
        },
    },
    plugins: [],
}
