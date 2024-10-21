/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        "custom-yellow": "#fff1c5",
        "custom-pink": "#fbe4e1",
        "custom-blue": "#e4f3f8",
        "custom-purple": "#e9e2fc",
      },
    },
  },
  plugins: [],
};
