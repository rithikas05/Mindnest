import defaultTheme from 'tailwindcss/defaultTheme';
import tailwindScrollbar from 'tailwind-scrollbar';

export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sora: ['Sora', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  darkMode: 'class',
  plugins: [tailwindScrollbar],
  safelist: [
    // Light mode borders
    'border-zinc-500',
    'border-emerald-500',
    'border-sky-500',
    'border-amber-500',
    'border-rose-500',

    // Dark mode borders
    'dark:border-zinc-400',
    'dark:border-emerald-400',
    'dark:border-sky-400',
    'dark:border-amber-400',
    'dark:border-rose-400',
  ],
};
