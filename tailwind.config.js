/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],

  theme: {

    fontFamily: {
      sans: ["Montserrat", "sans-serif"]      
    },
    
    extend: {
      keyframes: {
        slideInRight: {
          "0%": {
            transform: "translateX(100%)"
          },
          "100%": {
            transform: "translateX(0)"
          }
        },
        slideInUp: {
          "0%": {
            transform: "translateY(50%)"
          },
          "100%": {
            transform: "translateY(0)"
          }
        }
      },
      animation: {
        slideInRight: "slideInRight 2s ease-in-out",
        slideInUp: "slideInUp 1s ease-in-out"
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
        lima: "#a3e635"
      },
      backgroundColor: {
        lima: "#a3e635",
        lima900: "#365314"
      },
      fill: {
        lima: "#a3e635",
        lima900: "#365314"
      }
    },
  },
  plugins: [],
}