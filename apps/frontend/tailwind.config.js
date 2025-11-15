/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'sci-fi': {
          'dark': '#0a0e27',
          'blue': '#00d4ff',
          'purple': '#7c3aed',
          'cyan': '#06b6d4',
        }
      }
    },
  },
  plugins: [],
}

