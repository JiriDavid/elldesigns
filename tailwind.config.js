const colors = {
  brandCrimson: "#DC143C",
  brandPink: "#F75270",
  brandSoftPink: "#F7CAC9",
  brandCream: "#FDEBD0",
};

module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./lib/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors,
      backgroundImage: {
        "ell-gradient":
          "linear-gradient(135deg, #DC143C 0%, #F75270 30%, #F7CAC9 65%, #FDEBD0 100%)",
      },
      fontFamily: {
        sans: ["Poppins", "sans-serif"],
      },
      boxShadow: {
        neon: "0 0 25px rgba(220,20,60,0.4)",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
