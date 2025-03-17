/* eslint import/no-default-export: 0 */
import { type Config } from 'tailwindcss';

export default {
  content: ['./app/**/*.{mdx,ts,tsx}'],
  theme: {
    extend: {
      keyframes: {
        appear: {
          '0%': {
            opacity: '0',
          },
          '100%': {
            opacity: '1',
          },
        },
      },
      animation: {
        appear: 'appear 0.8s ease-in-out',
      },
    },
  },
  plugins: [],
} satisfies Config;
