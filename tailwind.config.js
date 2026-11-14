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
        theme: {
          bgLight: '#FAFAFA',
          bgDark: '#0B0F17',
          cardLight: '#FFFFFF',
          cardDark: '#161E2E',
          textPrimaryLight: '#111827',
          textPrimaryDark: '#F8FAFC',
          textSecondaryLight: '#4B5563',
          textSecondaryDark: '#94A3B8',
          actionLight: '#2563EB',
          actionDark: '#3B82F6',
          whatsappLight: '#16A34A',
          whatsappDark: '#22C55E',
          borderLight: '#E5E7EB',
          borderDark: '#1E293B',
        }
      },
      fontFamily: {
        serif: ['"Newsreader"', '"Merriweather"', 'Georgia', 'serif'],
        sans: ['"Inter"', 'system-ui', '-apple-system', 'sans-serif'],
      },
      borderRadius: {
        'clean': '12px',
      }
    },
  },
  plugins: [],
}
