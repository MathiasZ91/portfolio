import type { Config } from 'tailwindcss'

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'chinese-red': '#DE2910',
        'imperial-gold': '#FFD700',
        'jade-green': '#00A86B',
        'temple-gray': '#748B75'
      },
      fontFamily: {
        chinese: ['Noto Sans SC', 'sans-serif']
      },
      animation: {
        'lantern-float': 'float 3s ease-in-out infinite',
        'collect': 'collect 0.5s ease-out',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        collect: {
          '0%': { transform: 'scale(1)', opacity: '1' },
          '100%': { transform: 'scale(2)', opacity: '0' },
        }
      }
    },
  },
  plugins: [],
} satisfies Config 