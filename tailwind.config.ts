import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "violetBg": 'url("https://rekroot.themes.zone/wp-content/uploads/2021/07/home1_back.png")'
      },
      boxShadow: {
        'custom': '0px 0px 30px 0px rgba(98, 91, 229, 0.15)',
      }
    },
  },
  plugins: [],
};
export default config;
