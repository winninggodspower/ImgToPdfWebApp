/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/templates/**/*.html",
    "./src/static/js/**/*.js",
    "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    extend: {
      colors: {
        'alert-success': '#d1e7dd',
        'alert-success-text': '#0f5132',
        'alert-info': '#cff4fc',
        'alert-info-text': '#055160',
        'alert-warning': '#fff3cd',
        'alert-warning-text': '#664d03',
        'alert-error': '#f8d7da',
        'alert-error-text': '#842029',
      },
    },
  },
  plugins: [
    require("flowbite/plugin")
  ],
}

