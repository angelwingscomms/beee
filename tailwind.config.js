/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        canvas: '#faf9f5',
        ink: '#141413',
        body: '#3d3d3a',
        primary: '#cc785c',
        'primary-active': '#a9583e',
        hairline: '#e6dfd8',
        'surface-soft': '#f5f0e8',
        'surface-card': '#efe9de',
        'surface-dark': '#181715',
        'surface-dark-elevated': '#252320',
        'surface-dark-soft': '#1f1e1b',
        'on-dark': '#faf9f5',
        muted: '#6c6a64',
        teal: '#5db8a6',
        amber: '#e8a55a',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Cormorant Garamond', 'serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'monospace'],
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
