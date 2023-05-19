/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        fluid: 'repeat(auto-fit,minmax(15rem,1fr))',
      },
      colors: {
        highlight: '#7DF9FF',
        base: '#343131',
        accent: {
          100: '#544D4D',
          200: '#716F6F',
          300: '#7D7A7A',
        },
        text: '#FFFFFF',
      },
    },
  },
  plugins: [],
};
