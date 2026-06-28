/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        canvas: {
          DEFAULT: '#0C0A08',
          subtle: '#131110',
          card: '#1C1814',
        },
        ink: {
          DEFAULT: '#EDE8DF',
          muted: '#7B7267',
          ghost: '#2E2820',
        },
        amber: {
          DEFAULT: '#C8963F',
          light: '#D4A850',
        },
        flame: '#C26640',
        fern: '#6A8C72',
        edge: {
          DEFAULT: '#1E1B16',
          strong: '#2D2820',
        },
      },
      fontFamily: {
        display: ['Syne', 'system-ui', 'sans-serif'],
        body: ['"DM Sans"', 'system-ui', 'sans-serif'],
        mono: ['"Space Mono"', 'monospace'],
      },
    },
  },
  plugins: [],
}
