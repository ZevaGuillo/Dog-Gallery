module.exports = {
  content: ["./src/index.html"],
  theme: {
    extend: {
      fontFamily: {
        'text-title': ['Varela Round', 'cursive'],
        'text-gen': ['Comfortaa', 'cursive']   
        }
    }
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
    require('@tailwindcss/forms'),
    require('tailwind-scrollbar-hide'),
    require('tailwind-scrollbar'),
  ],
}
