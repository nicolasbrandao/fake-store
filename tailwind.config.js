/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    colors: {
      background: 'rgb(var(--background) / <alpha-value>)',
      foreground: 'rgb(var(--foreground) / <alpha-value>)'
    },
  },
  plugins: [],
}
