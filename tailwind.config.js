/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#2C00E0',
        light: {
          100: '#FFFFFF',
          200: '#F3F4F6',
          300: '#E5E7EB',
        }
      },
      boxShadow: {
        'glow': '0 0 20px rgba(44, 0, 224, 0.15)',
      }
    },
  },
  plugins: [],
};