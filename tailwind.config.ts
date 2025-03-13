/* eslint import/no-default-export: 0 */
/**
 * Made with ❤️ and adobo by Kurocado Studio
 * Copyright (c) 2024. All Rights Reserved.
 *
 * Learn more about Kurocado Studio: {@link https://www.kurocado.studio}
 *
 * Explore our open-source projects: {@link https://github.com/kurocado-studio}
 */
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
