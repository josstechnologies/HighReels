/** @type {import('tailwindcss').Config} */
module.exports = {
  plugins: [],
  content: ['./src/**/*.{js,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        primary: '#6F41EC',
      },
    },
  },
};
