/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        roboto : ["Roboto", "sans-serif"]
      },
      backgroundImage: (theme) => ({
        'custom-background': "url('./src/assets/bg-cover.jpg')"
      })
    },
  },
  plugins: [],
}