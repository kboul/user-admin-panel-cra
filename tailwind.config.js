/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      sm: { min: "350px", max: "767px" },
      // => @media (min-width: 640px and max-width: 767px) { ... }
      md: { min: "768px", max: "1023px" }
      // => @media (min-width: 768px and max-width: 1023px) { ... }
    },
    extend: {
      colors: {
        "input-border-color": "var(--input-border-color)",
        "user-hover-bg": "var(--user-hover-bg)",
        "label-color": "var(--label-color)",
        "cancel-btn-bg-hover": "var(--cancel-btn-bg-hover)",
        "cancel-btn-bg": "var(--cancel-btn-bg)",
        "user-selected-bg": "var(--user-selected-bg)",
        grey: "var(--grey)",
        "save-btn-bg": "var(--save-btn-bg)",
        "save-btn-disabled-bg": "var(--save-btn-disabled-bg)",
        "save-btn-bg-hover": "var(--save-btn-bg-hover)"
      }
    }
  },
  plugins: [require("tailwind-scrollbar-hide")]
};
