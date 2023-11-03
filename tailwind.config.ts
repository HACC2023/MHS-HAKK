import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["raleway", "sans"],
      },
    },
  },
  plugins: [
    require("daisyui"),
  ]
} satisfies Config;
