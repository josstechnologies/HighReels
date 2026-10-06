/** @type {import('tailwindcss').Config} */
module.exports = {
    plugins: [require('tailwindcss-animate')],
    content: ['./src/**/*.{js,ts,tsx}'],
    presets: [require('nativewind/preset')],
    theme: {
      extend: {
        colors: {
          black: '#111111',
          chevron: '#666666',
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
            75: '#F3F3F3',
            100: '#C4C4C4',
            200: '#A7A7A7',
            300: '#7F7F7F',
            400: '#666666',
            250: '#9999A6',
            300: '#7F7F7F',
            350: '#808080',
            450: '#666673',
            500: '#404040',
            600: '#3A3A3A',
            700: '#2D2D2D',
            800: '#232323',
            900: '#1B1B1B',
            950: '#121212',
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
        borderRadius: {
          10: '0.625rem',
          20: '1.25rem',
        },
        fontSize: {
          11: '0.6875rem',
          13: '0.8125rem',
          15: '0.9375rem',
          22: '1.375rem',
        },
        width: {
          toggle: '51px',
          thumb: '21px',
        },
        height: {
          toggle: '25px',
          thumb: '21px',
        },
      },
    },
  };