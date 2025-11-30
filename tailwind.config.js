/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'gold': '#FFD700',
        'pink-case': '#FFB6C1',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'bounce-slow': 'bounce 1s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      boxShadow: {
        'purple': '0 10px 25px rgba(168, 85, 247, 0.3)',
      },
    },
  },
  plugins: [],
}