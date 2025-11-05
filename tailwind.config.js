import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';
import typography from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './vendor/laravel/jetstream/**/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.vue',
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ['Figtree', ...defaultTheme.fontFamily.sans],
            },
            screens: {
                'hd': '1920px',
                'lp': '1366px',
            },
            colors: {
                "primary": "#134556",
                "secondary": "#1A2B2D",
                "tertiary": "#7e9294",
                "complement1": "#FF8000",
                "complement2": "#5E5EF7",
                "complement3": "#109409",
                "complement4": "#87ADDB",
                "complement5": "#34495E",
            },
            fontSize: {
                "mxs": "0.666rem",
                "xxs": "0.565rem",
                "53": "15rem",
            },
        },
    },

    plugins: [forms, typography],
};
