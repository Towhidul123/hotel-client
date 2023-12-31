/** @type {import('tailwindcss').Config} */


const withMT = require("@material-tailwind/react/utils/withMT");
 
module.exports = withMT({
  darkMode: 'className',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        cust: ' cursive'
        
      }
    },
  },
  plugins: [require("daisyui")],
});