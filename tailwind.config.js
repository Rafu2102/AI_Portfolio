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
        cyber: {
          bg: '#050505',
          surface: '#0a0a0f',
          card: 'rgba(10, 10, 20, 0.6)',
          cyan: '#00F0FF',
          purple: '#B026FF',
          green: '#39FF14',
          pink: '#FF2E97',
          yellow: '#FFE600',
        }
      },
      fontFamily: {
        sans: ['Inter', 'Noto Sans TC', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      animation: {
        'border-flow': 'border-flow 3s linear infinite',
        'blink-caret': 'blink-caret 0.75s step-end infinite',
      },
      keyframes: {
        'border-flow': {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
        'blink-caret': {
          'from, to': { borderColor: 'transparent' },
          '50%': { borderColor: '#00F0FF' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
      boxShadow: {
        'neon-cyan': '0 0 5px #00F0FF, 0 0 20px rgba(0, 240, 255, 0.3), 0 0 40px rgba(0, 240, 255, 0.1)',
        'neon-purple': '0 0 5px #B026FF, 0 0 20px rgba(176, 38, 255, 0.3), 0 0 40px rgba(176, 38, 255, 0.1)',
        'neon-green': '0 0 5px #39FF14, 0 0 20px rgba(57, 255, 20, 0.3), 0 0 40px rgba(57, 255, 20, 0.1)',
        'glass': '0 8px 32px rgba(0, 0, 0, 0.37)',
      }
    },
  },
  plugins: [],
}
