/** @type {import('tailwindcss').Config} */
import typography from '@tailwindcss/typography';

module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      typography: ({theme}) =>( {
        DEFAULT: {
          css: {
            '--tw-prose-bullets': theme('colors.pink[500]'),
            li: {
              p: {
                margin: 0,
              },
            },
          },
        },
      }),
      backgroundImage: {
        'bnr_cover' : "url('/images/bnr.jpg')",
      },
    },
  },
  variants: {
    extend: {
      textColor: ["group-hover", "hover"]
    },
  },

  plugins: [typography],
}
