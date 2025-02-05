import type { Config } from 'tailwindcss';

export default {
  content: [
    './src/**/*.{js,ts,jsx,tsx}', // Targets all components and pages inside the src folder
    './public/index.html', // Ensures Tailwind works with the main HTML file
  ],
  theme: {
    screens: {
      mobile: '320px',
      tablet: '640px',
      'tablet-large': '768px',
      desktop: '1220px',
      'desktop-fullscreen': '1756px',
    },

    colors: {
      white: '#ffffff',
      black: '#151515',
      gray: '#E6E6E6',
      'black-shadow': '#1D1D1D',
      'light-blue': '#5A698F',
    },

    fontFamily: {
      primary: ['Manrope', 'sans-serif'],
    },

    spacing: {
      0: '0',
      4: '4px',
      8: '8px',
      10: '10px',
      12: '12px',
      16: '16px',
      18: '18px',
      22: '22px',
      24: '24px',
      28: '28px',
      32: '32px',
      40: '40px',
      48: '48px',
      56: '56px',
      64: '64px',
      66: '66px',
      72: '72px',
      80: '80px',
      96: '96px',
      108: '108px',
      152: '152px',
      220: '220px',
      240: '240px',
    },

    extend: {
      borderRadius: {
        xl: '20px',
      },
      height: {
        '90%': '90vh',
      },
    },
  },
  plugins: [],
} satisfies Config;
