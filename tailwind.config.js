// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{html,js,jsx}',
    './components/**/*.{html,js,jsx}',
    './sections/**/*.{html,js,jsx}',
    './styles/**/*.{js,jsx}',
  ],
  mode: 'jit',
  theme: {
    extend: {
      colors: {
        //'primary-black': '#1A232E',
        //'secondary-white': '#c7c7c7',
         primary: "#008080",      // main highlight
         secondary: "#949597",    // secondary text
         background: "#000029",   // dark background
         surface: "#3A3335",      // card backgrounds
           light: "#F5F5F5"         // text on dark background
      },
      transitionTimingFunction: {
        'out-flex': 'cubic-bezier(0.05, 0.6, 0.4, 0.9)',
      },
      fontFamily: {
        anta: ['Anta', 'sans-serif'],
        mono: ['Space Mono', 'monospace'],
      },
    },
  },
  plugins: [],
};
