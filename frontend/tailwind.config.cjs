/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: { ink: '#122030', muted: '#6b7a8d', mint: '#c8f4e8', navy: '#18314a' },
      fontFamily: { sans: ['DM Sans', 'sans-serif'] },
    },
  },
  plugins: [],
};

