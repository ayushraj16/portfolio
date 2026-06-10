/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["Outfit", "sans-serif"],
        mono: ["Space Mono", "monospace"],
      },
      colors: {
        cyberBg: "#050508",
        cyberBgCard: "#090a10",
        cyberAccent: "#00ffaa",
        cyberAccentMuted: "rgba(0, 255, 170, 0.15)",
        cyberPink: "#ff2a5f",
        cyberText: "#f0f3fa",
        cyberTextMuted: "#9fa7c5",
        cyberBorder: "rgba(255, 255, 255, 0.05)",
      },
      animation: {
        'spin-slow': 'spin 20s linear infinite',
      }
    },
  },
  plugins: [],
}
