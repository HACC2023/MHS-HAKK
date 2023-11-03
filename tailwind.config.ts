import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      colors: {
        'white': '#ffffff',
        'green-gray': '#202F1D',
        'med-green': '#3B7237',
        'light-green': '#88AF37',
        'hover-green': '#9ac73e',
        'dark-blue': '#2C6191',
        'med-blue': '#50AEC6'
      },
      fontFamily: {
        sans: ['"Raleway"', 'sans-serif'],
        serif: ['"Raleway"', 'sans-serif']
      }
    }
  },
  plugins: [
    require("daisyui"),
  ]
} satisfies Config;
