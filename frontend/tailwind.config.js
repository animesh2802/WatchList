// tailwind.config.js
const lineClamp = require('@tailwindcss/line-clamp');

module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      height: {
        180: '45rem',
        190: '50rem',
        '90vh': '90vh',
      }
    },
  },
  plugins: [lineClamp],
}
