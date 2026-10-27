import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        witch: {
          night: '#0d0615',
          gold: '#d9ad55',
          cream: '#f8e9bd',
        },
      },
    },
  },
  plugins: [],
}

export default config
