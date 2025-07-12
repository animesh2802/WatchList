// tailwind.config.js
const lineClamp = require('@tailwindcss/line-clamp');

module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {},
  },
  plugins: [lineClamp],
}
