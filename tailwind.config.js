/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        luxury: {
          yellow: '#facc15', // Premium yellow accent from prompt
          yellowDark: '#f4c400', // Alternative darker yellow accent
          gold: '#eab308',
          zinc: {
            950: '#09090b',
            900: '#18181b',
            800: '#27272a',
          }
        }
      },
      fontFamily: {
        sans: ['Manrope', 'sans-serif'],
        display: ['Space Grotesk', 'sans-serif'],
      },
      animation: {
        'marquee-slow': 'marquee 40s linear infinite',
        'marquee-reverse': 'marquee-rev 40s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' }
        },
        'marquee-rev': {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0%)' }
        }
      }
    },
  },
  plugins: [],
}
