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
        grayBg: 'url("https://jthemes.com/themes/wp/jobbox/wp-content/themes/jobbox/assets/imgs/page/blog/bg-black-trans.png")',
        bgBlog1: 'url("https://i.pinimg.com/originals/4a/9d/0e/4a9d0e50c2d9e43135e92d47f57b3c24.jpg")',
        bgBlog2: 'url("https://i.pinimg.com/564x/cd/5b/29/cd5b2982e5bc61f0b73e8e1e09830388.jpg")',
        bgBlog3: 'url("https://i.pinimg.com/originals/00/24/8d/00248d10b5184a57ce3c522533c6397f.jpg")',
        bgNewsletter: 'url("https://jthemes.com/themes/wp/jobbox/wp-content/themes/jobbox/assets/imgs/template/bg-newsletter.svg")'
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
        "custom-purple": "#3C65F5",
        "custom-focus": "#383A8F",
      },
    },
  },
  plugins: [],
};
export default config;
