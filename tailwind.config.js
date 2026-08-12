/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: '#08080c',
          950: '#050508',
          900: '#0b0b11',
          800: '#111119',
          700: '#181822',
          600: '#20202c',
          500: '#2a2a38',
        },
        mist: {
          DEFAULT: '#9a9ab0',
          light: '#c7c7d6',
          dim: '#6d6d82',
        },
        signal: {
          violet: '#7c5cfc',
          violetSoft: '#a78bfa',
          cyan: '#22d3ee',
          amber: '#f5a524',
        },
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        body: ['"Inter"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      backgroundImage: {
        'grid-pattern':
          'linear-gradient(to right, rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.035) 1px, transparent 1px)',
        'radial-fade':
          'radial-gradient(60% 50% at 50% 0%, rgba(124,92,252,0.16) 0%, rgba(8,8,12,0) 70%)',
      },
      backgroundSize: {
        grid: '44px 44px',
      },
      boxShadow: {
        glow: '0 0 0 1px rgba(124,92,252,0.15), 0 0 40px -8px rgba(124,92,252,0.35)',
        card: '0 1px 0 0 rgba(255,255,255,0.04) inset, 0 20px 60px -30px rgba(0,0,0,0.7)',
      },
      keyframes: {
        drift: {
          '0%, 100%': { transform: 'translate(0, 0) rotate(0deg)' },
          '50%': { transform: 'translate(0, -14px) rotate(1.5deg)' },
        },
        driftSlow: {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '50%': { transform: 'translate(10px, -10px)' },
        },
        blink: {
          '0%, 49%': { opacity: 1 },
          '50%, 100%': { opacity: 0 },
        },
      },
      animation: {
        drift: 'drift 7s ease-in-out infinite',
        driftSlow: 'driftSlow 9s ease-in-out infinite',
        blink: 'blink 1s step-start infinite',
      },
    },
  },
  plugins: [],
}
