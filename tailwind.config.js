/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],

  theme: {

    fontFamily: {
      sans: ["Montserrat", "sans-serif"]      
    },

    colors: {
      transparent: "transparent",
      primary: "#0958a0",
      secondary: {
        a: "#fff",
        b: "$f2f2f2"
      },
      danger: "#e3342f",
      success: "#38c172",
      warning: "#f6993f",
      info: "#3490dc",
    },
    
    extend: {},
  },
  plugins: [],
}