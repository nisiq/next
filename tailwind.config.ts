/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");

export default withMT({
  darkMode: "class",
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
    'node_modules/flowbite-react/lib/esm/**/*.{js, jsx, tsx}',
    "node_modules/@material-tailwind/react/components/**/*.{js,ts,jsx,tsx}",
    "node_modules/@material-tailwind/react/theme/components/**/*.{js,ts,jsx,tsx}"
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        "dark": "#141C24",
        "light": "#FFFFFF",
        "palette-pink": "#9E2896",
        "palette-blue": "#007BC0",
        "palette-sea-green": "#18837E",
        "palette-green": "#00884A",
        "palette-read": "#ED0007",
        "palette-gray": "#3E3E3E",
        "palette-menu": "#191919",
        "palette-dark-menu": "#1B2124",
        "palette-card": "#EEF4F3",
        "palette-font": "#5F5E61",
        "palette-line": "#CFD3D3"
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  variants: {
    opacity: ({ after }) => after(['disabled'])
  },
  plugins: [require("tailwindcss-animate"), require('flowbite/plugin')],
})