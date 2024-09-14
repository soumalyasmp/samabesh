/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      transitionProperty: {
        'opacity-transform': 'opacity, transform',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
      },
      animation: {
        marquee: 'marquee 20s linear infinite',
      },
    },
    variants: {
      extend: {
        // Enable hover variants for transform and shadow
        transform: ['hover'],
        boxShadow: ['hover'],
      },
    },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}}

