import { nextui } from "@nextui-org/theme";
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
      "3xl": "1900px",
    },
    extend: {
      fontFamily: {
        monoLisa: ["MonoLisa"],
        louize: ["Louize"],
      },
      container: {
        center: true,
        screens: {
          sm: "100%",
          md: "100%",
          lg: "80%",
          "2xl": "1800px",
        },
      },
    },
  },
  plugins: [nextui()],
  darkMode: "class",
};
export default config;
