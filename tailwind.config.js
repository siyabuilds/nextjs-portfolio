/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        suse: ["var(--font-suse)", "system-ui", "sans-serif"],
        "suse-mono": [
          "var(--font-suse-mono)",
          "SUSE Mono",
          "Fira Code",
          "JetBrains Mono",
          "SF Mono",
          "Monaco",
          "Inconsolata",
          "Roboto Mono",
          "Courier New",
          "monospace",
        ],
        sans: ["var(--font-suse)", "system-ui", "sans-serif"],
        mono: [
          "var(--font-suse-mono)",
          "SUSE Mono",
          "Fira Code",
          "JetBrains Mono",
          "SF Mono",
          "Monaco",
          "Inconsolata",
          "Roboto Mono",
          "Courier New",
          "monospace",
        ],
      },
    },
  },
  plugins: [],
};
