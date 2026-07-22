/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        surface: {
          DEFAULT: '#0a0a0f',
          50: '#0e0e15',
          100: '#12121c',
          200: '#1a1a28',
          300: '#232334',
          400: '#2d2d42',
        },
        tech: {
          DEFAULT: '#3B82F6',
          light: '#22D3EE',
          glow: 'rgba(59, 130, 246, 0.15)',
          'glow-strong': 'rgba(59, 130, 246, 0.3)',
        },
        edit: {
          DEFAULT: '#F97316',
          light: '#EC4899',
          glow: 'rgba(249, 115, 22, 0.15)',
          'glow-strong': 'rgba(249, 115, 22, 0.3)',
        },
        glass: {
          white: 'rgba(255, 255, 255, 0.06)',
          'white-hover': 'rgba(255, 255, 255, 0.1)',
          border: 'rgba(255, 255, 255, 0.08)',
          'border-hover': 'rgba(255, 255, 255, 0.15)',
        },
        text: {
          primary: '#f0f0f5',
          secondary: '#94949e',
          muted: '#5a5a6e',
        },
      },
      fontFamily: {
        display: ['Space Grotesk', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      fontSize: {
        'hero': ['clamp(3rem, 8vw, 6rem)', { lineHeight: '1.05', letterSpacing: '-0.03em', fontWeight: '700' }],
        'hero-sub': ['clamp(1.1rem, 2.5vw, 1.5rem)', { lineHeight: '1.5', letterSpacing: '-0.01em' }],
        'section': ['clamp(2rem, 5vw, 3.5rem)', { lineHeight: '1.1', letterSpacing: '-0.025em', fontWeight: '700' }],
        'section-sub': ['clamp(0.95rem, 1.5vw, 1.15rem)', { lineHeight: '1.6' }],
      },
      borderRadius: {
        'pill': '9999px',
        'glass': '16px',
        'card': '20px',
      },
      backdropBlur: {
        'glass': '20px',
        'glass-heavy': '40px',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'slide-up': 'slide-up 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
        'fade-in': 'fade-in 0.5s ease-out',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '1' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'slide-up': {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      boxShadow: {
        'glass': '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
        'glass-hover': '0 12px 48px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.08)',
        'tech-glow': '0 0 40px rgba(59, 130, 246, 0.2), 0 0 80px rgba(34, 211, 238, 0.1)',
        'edit-glow': '0 0 40px rgba(249, 115, 22, 0.2), 0 0 80px rgba(236, 72, 153, 0.1)',
        'card': '0 4px 24px rgba(0, 0, 0, 0.25)',
        'card-hover': '0 8px 40px rgba(0, 0, 0, 0.35)',
      },
    },
  },
  plugins: [],
}
