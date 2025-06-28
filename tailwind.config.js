/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        "ibm-sans": ["IBM Plex Sans", "system-ui", "sans-serif"],
        "ibm-mono": ["IBM Plex Mono", "Courier New", "monospace"],
        sans: ["IBM Plex Sans", "system-ui", "sans-serif"],
        mono: ["IBM Plex Mono", "Courier New", "monospace"],
      },
    },
  },
  plugins: [],
};
