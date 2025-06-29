/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        "ibm-sans": ["var(--font-ibm-plex-sans)", "system-ui", "sans-serif"],
        "ibm-mono": ["var(--font-ibm-plex-mono)", "Courier New", "monospace"],
        sans: ["var(--font-ibm-plex-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-ibm-plex-mono)", "Courier New", "monospace"],
      },
    },
  },
  plugins: [],
};
