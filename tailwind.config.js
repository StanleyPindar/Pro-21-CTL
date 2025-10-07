/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  future: {
    hoverOnlyWhenSupported: true,
  },
  theme: {
    extend: {
      colors: {
        primary: { 500: '#1A9F52', 600: '#168F46', 700: '#12773A', 800: '#0E5F2E' },
        midBlue: '#0D1A46',
        darkBlue: '#071230',
        neutral: { 100: '#F7F8FA', 300: '#E6E8F0' },
        warning: { 50: '#FFF8E1' },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui']
      },
      borderRadius: {
        card: '16px',
        pill: '8px'
      },
      spacing: {
        '2': '8px',
        '4': '16px',
        '6': '24px',
        '8': '32px',
        '12': '48px',
        '16': '64px',
        '20': '80px',
      },
      container: {
        center: true,
        padding: '1rem',
      },
      boxShadow: {
        'card': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'card-hover': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [
    function({ addUtilities, addComponents }) {
      const newUtilities = {
        '.text-gradient': {
          'background-clip': 'text',
          '-webkit-background-clip': 'text',
          'color': 'transparent',
        },
        '.line-clamp-1': {
          overflow: 'hidden',
          display: '-webkit-box',
          '-webkit-box-orient': 'vertical',
          '-webkit-line-clamp': '1',
        },
        '.line-clamp-2': {
          overflow: 'hidden',
          display: '-webkit-box',
          '-webkit-box-orient': 'vertical',
          '-webkit-line-clamp': '2',
        },
        '.line-clamp-3': {
          overflow: 'hidden',
          display: '-webkit-box',
          '-webkit-box-orient': 'vertical',
          '-webkit-line-clamp': '3',
        },
      }
      addUtilities(newUtilities)

      addComponents({
        '.prose': {
          maxWidth: '65ch',
          fontSize: '1rem',
          lineHeight: '1.75',
          color: '#374151',
          'h1, h2, h3, h4, h5, h6': {
            fontWeight: '700',
            marginTop: '2em',
            marginBottom: '1em',
            lineHeight: '1.25',
          },
          h1: { fontSize: '2.25em' },
          h2: { fontSize: '1.875em' },
          h3: { fontSize: '1.5em' },
          h4: { fontSize: '1.25em' },
          p: { marginBottom: '1.25em' },
          'ul, ol': { paddingLeft: '1.625em', marginBottom: '1.25em' },
          li: { marginBottom: '0.5em' },
          a: { color: '#1A9F52', textDecoration: 'underline', '&:hover': { color: '#168F46' } },
          strong: { fontWeight: '600' },
          'code, pre': { fontFamily: 'monospace', fontSize: '0.875em' },
          blockquote: { borderLeft: '4px solid #E5E7EB', paddingLeft: '1em', fontStyle: 'italic', color: '#6B7280' }
        }
      })
    }
  ],
  corePlugins: {
    preflight: true,
  },
}
