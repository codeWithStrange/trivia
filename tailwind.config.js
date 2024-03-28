/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
    theme: {
      extend: {
        fontFamily: {
          telma: ['Telma', 'cursive'],
          bonny: ['Bonny', 'serif'],
          stardom: ['Stardom', 'sans-serif'],
          gambarino: ['Gambarino', 'serif'],
        },
        colors: {
          // Define your custom colors here
          customBlack: '#FFFFFA',
        }}
  },
  plugins: [
   
  ],
}