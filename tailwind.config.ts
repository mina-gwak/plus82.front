import { Config } from 'tailwindcss'
import plugin from 'tailwindcss/plugin'

import { colors, fontSize, zIndex } from './src/shared/config'

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}', './app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    data: {
      selected: 'selected~=true',
      readOnly: 'readOnly~=true',
    },
    extend: {
      fontFamily: {
        'spoqa-han-sans-neo': ['var(--font-spoqa-han-sans-neo)'],
      },
      colors,
      fontSize,
      zIndex,
    },
  },
  plugins: [
    plugin(function ({ addVariant }) {
      addVariant('not-last', '&:not(:last-child)')
      addVariant('not-checked', '&:not(:checked)')
    }),
  ],
}

export default config
