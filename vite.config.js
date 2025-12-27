import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// tailwind.config.js
import { defineConfig } from 'vite';

export default {
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        display: ['Playfair Display', 'serif'], // headings
        sans: ['Inter', 'sans-serif'],          // body text
      },
    },
  },
  plugins: [],
};

