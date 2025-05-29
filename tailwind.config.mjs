/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        'skill-wanderer': {
          // Dark Backgrounds
          'primary-dark': '#3a3a3a',
          'secondary-dark': '#4a4a4a',
          'darkest': '#2a2a2a',
          'card-dark': '#303030',
          
          // Light Backgrounds
          'light-gray': '#f5f5f5',
          'white': '#ffffff',
          
          // Text Colors
          'text-dark': '#ffffff',
          'text-dark-secondary': '#e0e0e0',
          'text-dark-muted': '#b0b0b0',
          'text-light': '#2a2a2a',
          'text-light-secondary': '#666666',
          
          // Accent Colors
          'primary-orange': '#ff6b35',
          'light-orange': '#ff8555',
        }
      },
      borderColor: {
        'dark': 'rgba(255, 255, 255, 0.1)',
        'light': 'rgba(0, 0, 0, 0.1)',
      },
      boxShadow: {
        'dark': '0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.3)',
        'light': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.1)',
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
