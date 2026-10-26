import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/**
 * YouCast modern design tokens:
 * Primary palette: Dark violet (#170936, #240E4A), Midnight Blue (#090D16, #0F172A),
 * Off-white (#FAF9FE, #FFFFFF), and Soft Slate Gray (#F1F5F9, #E2E8F0).
 * Accents: Electric Indigo & Violet (#7C3AED, #6366F1, #3B82F6).
 */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
    ],

    theme: {
        extend: {
            colors: {
                page: '#F8F9FE',

                // Violet & Midnight brand spectrum
                brand: {
                    50: '#FAF5FF',
                    100: '#F3E8FF',
                    200: '#E9D5FF',
                    300: '#D8B4FE',
                    400: '#C084FC',
                    500: '#9333EA',
                    600: '#7C3AED', // Primary vibrant violet
                    700: '#6D28D9',
                    800: '#4C1D95', // Deep purple
                    900: '#2E1065', // Dark violet night
                    950: '#170936', // Ultra dark midnight violet
                },

                // Midnight blue
                night: {
                    50: '#F8FAFC',
                    100: '#F1F5F9',
                    200: '#E2E8F0',
                    300: '#CBD5E1',
                    400: '#94A3B8',
                    500: '#64748B',
                    600: '#475569',
                    700: '#334155',
                    800: '#1E293B',
                    900: '#0F172A',
                    950: '#090D16',
                },

                // High-contrast modern slates
                slate: {
                    50: '#FAF9FE',
                    100: '#F1F3F9',
                    200: '#E2E6F2',
                    300: '#CBD1E4',
                    400: '#949EB8',
                    500: '#647192',
                    600: '#475273',
                    700: '#313B56',
                    800: '#1E253A',
                    900: '#0F1424',
                    950: '#080B15',
                },

                electric: {
                    50: '#EFF6FF',
                    100: '#DBEAFE',
                    200: '#BFDBFE',
                    400: '#60A5FA',
                    500: '#3B82F6',
                    600: '#2563EB',
                    700: '#1D4ED8',
                },

                success: {
                    50: '#ECFDF3',
                    100: '#D1FADF',
                    200: '#A6F4C5',
                    500: '#12B76A',
                    600: '#039855',
                    700: '#027A48',
                    800: '#05603A',
                },
                warning: {
                    50: '#FFFAEB',
                    100: '#FEF0C7',
                    200: '#FEDF89',
                    500: '#F79009',
                    600: '#DC6803',
                    700: '#B54708',
                    800: '#93370D',
                },
                danger: {
                    50: '#FEF3F2',
                    100: '#FEE4E2',
                    200: '#FECDCA',
                    500: '#F04438',
                    600: '#D92D20',
                    700: '#B42318',
                    800: '#912018',
                },
            },

            fontFamily: {
                sans: ['Plus Jakarta Sans', 'Figtree', ...defaultTheme.fontFamily.sans],
                display: ['Space Grotesk', 'Plus Jakarta Sans', ...defaultTheme.fontFamily.sans],
            },

            borderRadius: {
                xs: '0.25rem',
                sm: '0.375rem',
                md: '0.5rem',
                lg: '0.75rem',
                xl: '1rem',
                '2xl': '1.25rem',
                '3xl': '1.5rem',
            },

            boxShadow: {
                xs: '0 1px 2px 0 rgba(15, 23, 42, 0.04)',
                soft: '0 2px 10px -2px rgba(15, 23, 42, 0.06), 0 1px 3px rgba(15, 23, 42, 0.04)',
                card: '0 4px 20px -4px rgba(24, 14, 54, 0.07), 0 2px 6px -2px rgba(24, 14, 54, 0.03)',
                cardHover: '0 12px 32px -8px rgba(124, 58, 237, 0.14), 0 4px 12px -2px rgba(15, 23, 42, 0.06)',
                raised: '0 16px 36px -12px rgba(24, 14, 54, 0.18), 0 4px 12px -4px rgba(24, 14, 54, 0.08)',
                modal: '0 25px 60px -15px rgba(15, 23, 42, 0.35)',
                glow: '0 0 25px -4px rgba(124, 58, 237, 0.35)',
            },

            maxWidth: {
                content: '78rem',
                prose: '68ch',
            },

            transitionDuration: {
                DEFAULT: '200ms',
            },
        },
    },
    plugins: [forms],
};
