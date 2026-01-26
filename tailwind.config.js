/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './_layouts/**/*.html',
    './_includes/**/*.html',
    './_posts/**/*.{html,md}',
    './*.{html,md}'
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['Crimson Pro', 'serif'],
        sans: ['Source Sans 3', 'sans-serif'],
        display: ['Cormorant Garamond', 'serif'],
        mono: ['Fira Code', 'monospace'],
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: '55ch',
            fontSize: '1.05rem',
            lineHeight: '1.7',
            fontFamily: ['Crimson Pro', 'serif'].join(','),
            h1: {
              marginTop: '0',
              marginBottom: '1rem',
              fontFamily: ['Cormorant Garamond', 'serif'].join(','),
              fontWeight: '600',
            },
            h2: {
              marginTop: '2rem',
              marginBottom: '1rem',
              paddingBottom: '0.5rem',
              borderBottom: '1px solid var(--color-border)',
              fontFamily: ['Cormorant Garamond', 'serif'].join(','),
              fontWeight: '600',
            },
            h3: {
              marginTop: '1.5rem',
              marginBottom: '0.75rem',
              fontFamily: ['Cormorant Garamond', 'serif'].join(','),
              fontWeight: '500',
            },
            a: {
              fontWeight: 'normal',
            },
            blockquote: {
              borderLeftWidth: '3px',
              fontStyle: 'italic',
              paddingLeft: '1rem',
            },
            code: {
              fontSize: '0.875rem',
              fontFamily: ['Fira Code', 'monospace'].join(','),
            },
            pre: {
              padding: '1rem',
              borderRadius: '0.5rem',
              fontSize: '0.875rem',
              fontFamily: ['Fira Code', 'monospace'].join(','),
            },
            'pre code': {
              fontSize: 'inherit',
            },
          },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}

