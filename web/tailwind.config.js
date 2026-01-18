/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#0a0a0a',
        surface: '#171717',
        surfaceLight: '#262626',
        text: '#e5e5e5',
        textMuted: '#a3a3a3',
        border: '#404040',
        green: '#4ade80',
        amber: '#fbbf24',
        red: '#f87171',
        purple: '#c084fc',
        cyan: '#22d3ee',
      },
      fontFamily: {
        mono: ['SF Mono', 'Geist Mono', 'Consolas', 'monospace'],
      },
      animation: {
        breathe: 'breathe 2s ease-in-out infinite',
        pulse: 'pulse 1s ease-in-out infinite',
        flow: 'flow 1s linear infinite',
        fadeIn: 'fadeIn 0.3s ease-out forwards',
        slideIn: 'slideIn 0.3s ease-out forwards',
      },
      keyframes: {
        breathe: {
          '0%, 100%': { opacity: '0.6' },
          '50%': { opacity: '1' },
        },
        pulse: {
          '0%, 100%': { opacity: '0.8', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.02)' },
        },
        flow: {
          '0%': { strokeDashoffset: '20' },
          '100%': { strokeDashoffset: '0' },
        },
        fadeIn: {
          from: { opacity: '0', transform: 'translateY(10px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        slideIn: {
          from: { opacity: '0', transform: 'translateX(-20px)' },
          to: { opacity: '1', transform: 'translateX(0)' },
        },
      },
    },
  },
  plugins: [],
}
