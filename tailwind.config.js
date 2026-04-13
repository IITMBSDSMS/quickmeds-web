/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Brand — matches logo exactly
        brand: {
          navy: '#1a2340',    // "Quick" dark navy
          green: '#22c55e',   // "Meds" green
          greenDark: '#16a34a',
          greenLight: '#dcfce7',
        },
        // UI Surface
        surface: '#f8fafc',
        surfaceAlt: '#f1f5f9',
        border: '#e2e8f0',
        // Text
        textPrimary: '#111827',
        textSecondary: '#4b5563',
        textMuted: '#9ca3af',
        // Emergency
        emergency: '#dc2626',
        emergencyLight: '#fee2e2',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        'card': '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
        'card-hover': '0 10px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.05)',
        'green-glow': '0 0 20px rgba(34, 197, 94, 0.25)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      }
    },
  },
  plugins: [],
};