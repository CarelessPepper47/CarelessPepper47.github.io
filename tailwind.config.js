/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.html"],
  theme: {
    extend: {
      backgroundImage: {
        'warrior': "url('/RPGimg/Warrior.png')",
        'rogue': "url('C:/Users/mtszr/OneDrive/Desktop/vite-project/Steele/RPGimg/Rogue.png')",
      }
    },
  },
  plugins: [],
}

