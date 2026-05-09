/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "primary-fixed": "#cfe5ff",
        "outline": "#8b919a",
        "inverse-primary": "#1d6296",
        "secondary-fixed": "#ffe088",
        "secondary-fixed-dim": "#ecc232",
        "error": "#ffb4ab",
        "primary": "#98cbff",
        "on-surface": "#dae2fd",
        "tertiary-fixed": "#6ffbbe",
        "on-background": "#dae2fd",
        "surface-container-highest": "#2d3449",
        "on-primary": "#003354",
        "surface-dim": "#0b1326",
        "primary-container": "#3776ab",
        "tertiary-fixed-dim": "#4edea3",
        "secondary-container": "#c69f00",
        "surface-container-lowest": "#060e20",
        "surface-container": "#171f33",
        "surface-tint": "#98cbff",
        "tertiary": "#4edea3",
        "inverse-surface": "#dae2fd",
        "secondary": "#ecc232",
        "background": "#0b1326",
        "surface-bright": "#31394d",
        "inverse-on-surface": "#283044",
        "surface": "#0b1326",
        "on-primary-container": "#f5f8ff",
        "outline-variant": "#41474f",
        "on-surface-variant": "#c1c7d0",
        "surface-container-high": "#222a3d",
        "surface-container-low": "#131b2e"
      },
      spacing: {
        "md": "16px",
        "xl": "40px",
        "gutter": "16px",
        "sm": "8px",
        "unit": "4px",
        "lg": "24px",
        "panel-padding": "20px",
        "xs": "4px"
      },
      fontFamily: {
        "h1": ["Inter", "sans-serif"],
        "code-inline": ["JetBrains Mono", "monospace"],
        "label-caps": ["Inter", "sans-serif"],
        "body-md": ["Inter", "sans-serif"],
        "code-block": ["JetBrains Mono", "monospace"],
        "h2": ["Inter", "sans-serif"]
      }
    },
  },
  plugins: [],
}