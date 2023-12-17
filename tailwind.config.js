/** @type {import('tailwindcss').Config} */
import daisyui from 'daisyui'

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    colors: {
      'nav-color': '#001D3D',
      'cta-color': '#FFC300',
      'my-blue': '#003566',
      'my-black': '#000814',
      'my-yellow': '#FFD60A',
      'eggshell': '#EEEBD3',
      'white': '#FFFFFF',
      'my-blue-light': '#0054A3',
      'success-green': '#5cb85c',
      'not-success-red': '#ff3333',
      'my-gray': '#eaeaea',
    },
  },
  plugins: [daisyui],
}