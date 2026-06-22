/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#6A0DAD',
          50: '#F5F0FA',
          100: '#EBE0F5',
          200: '#D7C1EB',
          300: '#B9A0DB',
          400: '#9B76C8',
          500: '#6A0DAD',
          600: '#5A0A92',
          700: '#4A0877',
          800: '#3A065C',
          900: '#2A0441',
        },
        accent: {
          DEFAULT: '#FF2D8D',
          50: '#FFF0F7',
          100: '#FFE0EF',
          200: '#FFC2DF',
          300: '#FFA0C8',
          400: '#FF70AD',
          500: '#FF2D8D',
          600: '#E6267F',
          700: '#CC2070',
          800: '#B31A62',
          900: '#991453',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
        'bounce-in': 'bounceIn 0.6s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        bounceIn: {
          '0%': { opacity: '0', transform: 'scale(0.3)' },
          '50%': { transform: 'scale(1.05)' },
          '70%': { transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
    },
  },
  plugins: [],
};
