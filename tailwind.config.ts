import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "selector",
  theme: {
    extend: {
      lineHeight: {
        "leading-custom": "1.571",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        bannerBg:
          'url("https://jthemes.com/themes/wp/jobbox/wp-content/themes/jobbox/assets/imgs/banner.png")',
      },
      screens: {
        // Breakpoints predefinidos
        sm: "640px",
        md: "769px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1440px",
        "3xl": "1536px",
        // Breakpoints personalizados
        tablet: "900px", // Dispositivos con un ancho de 900px o superior
        desktop: "1200px", // Dispositivos con un ancho de 1200px o superior
        // Breakpoints para dispositivos móviles modernos
        mobile: "360px", // Dispositivos móviles pequeños
        phablet: "480px", // Dispositivos móviles medianos
        phone: "580px", // Dispositivos móviles grandes
      },
      boxShadow: {
        custom: "0px 0px 30px 0px #007bff26",
      },
      colors: {
        "custom-purple": "#4537D4",
        "custom-focus": "#383A8F",
      },
    },
  },
  plugins: [],
};
export default config;
