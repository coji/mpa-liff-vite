module.exports = {
  content: ["./src/**/index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {}
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["light", "dark"]
  }
}
