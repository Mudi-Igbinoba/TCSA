/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      fontFamily: {
        body: ["BentonSans", "sans-serif"],
      },

      colors: {
        primary: {
          100: "#616E88",
          500: "#0032AA",
          900: "#0032A1",
        },
        neutral: {
          55: "#F6F6F6",
          150: "#F2F3F5",
          250: "#d9d9d9",
          350: "#EFEFEF",
          550: "#393939",
          650: "#1D1D1D",
          1000: "#222222",
        },
        error: {
          400: "#F24040",
          500: "#F10B0B",
        },
        success: {
          100: "#E3EAED",
          500: "#00AA8B",
        },
      },
    },
  },
  plugins: [],
};
