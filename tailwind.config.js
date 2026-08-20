/** @type {import('tailwindcss').Config} */
module.exports = {
  plugins: [],
  content: ['./src/**/*.{js,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        black: '#111111',
        primary: {
          DEFAULT: '#6F41EC',
          disabled: '#F0ECFB',
        },
        secondary: {
          DEFAULT: '#F3F3F3',
          pressed: '#E5E5E5',
          disabled: '#DFDFDF',
        },
        grey: {
          50: '#ECECEC',
          75: '#E4E4E4',
          100: '#C4C4C4',
          200: '#A7A7A7',
          300: '#7F7F7F',
          400: '#666666',
          500: '#404040',
          600: '#3A3A3A',
          700: '#2D2D2D',
          800: '#232323',
          900: '#1B1B1B',
        },
        danger: {700: '#EC2727'},
        warning: {700: '#E7AD0D'},
        success: {700: '#4FA531'},
        info: {700: '#3A70E2'},
      },
      fontFamily: {
        sans: ['PlusJakartaSans_400Regular'],
        medium: ['PlusJakartaSans_500Medium'],
        semibold: ['PlusJakartaSans_600SemiBold'],
        bold: ['PlusJakartaSans_700Bold'],
        extrabold: ['PlusJakartaSans_800ExtraBold'],
      },
    },
  },
};
