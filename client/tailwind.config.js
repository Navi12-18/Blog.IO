
/** @type {import('tailwindcss').Config} */
module.exports = {
  content:  [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily : {
        Poppins : ["Poppins", "sans-serif"]
      }
    },

    screens : {
      'xs' : "300px",
      'sm' : "640px",
      'md' : "796px",
      'lg' : '1024px',
      'xl' : '1280px',
    }
  },
  plugins: []
}
