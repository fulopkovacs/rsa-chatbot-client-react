module.exports = {
  // content: ["index.html", "./src/**/*.{js,jsx,ts,tsx,vue}"],
  purge: ["index.html", "./src/**/*.{js,jsx,ts,tsx,vue}"],
  theme: {
    extend: {
      keyframes: {
        "fade-in-bottom": {
          "0%": { transform: "translateY(10px);", opacity: 0 },
          "100%": { transform: "translateY(0)", opacity: 1 },
        },
      },
      animation: {
        "fade-in-bottom": "fade-in-bottom 0.3s ease-out both",
      },
    },
  },
  plugins: [],
  variants: {
    extend: {
      backgroundColor: ["active"],
    },
  },
};
