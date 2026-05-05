module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        crimson: {
          50: "#fdf2f2",
          100: "#fce3e3",
          200: "#facbcb",
          300: "#f6a6a6",
          400: "#ef7070",
          500: "#e44545",
          600: "#d02828",
          700: "#7f1d1d",
          800: "#6b1818",
          900: "#5a1414",
        },
        stone: {
          50: "#fafaf9",
          100: "#f5f5f4",
          200: "#e7e5e4",
          800: "#292524",
          900: "#1c1917",
        },
      },
      fontFamily: {
        sans: ["var(--font-outfit)", "sans-serif"],
        display: ["var(--font-dm-serif)", "serif"],
      },
      animation: {
        "fade-up": "fadeUp 0.6s ease forwards",
        "slide-in": "slideIn 0.5s ease forwards",
        "ken-burns": "kenBurns 8s ease-in-out infinite alternate",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideIn: {
          "0%": { opacity: "0", transform: "translateX(-20px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        kenBurns: {
          "0%": { transform: "scale(1.05) translate(-1%, -1%)" },
          "100%": { transform: "scale(1.12) translate(1%, 1%)" },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
