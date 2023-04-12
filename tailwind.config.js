module.exports = {
  content: [
    './docs/**/*.stories.@(js|jsx|ts|tsx|mdx)',
    './src/**/*.stories.@(js|jsx|ts|tsx|mdx)',
  ],
  theme: {
    screens: {
      tablet: '768px',
      desktop: '992px',
    },
    minHeight: {
      30: '7.5rem',
      55: '13.75rem',
      80: '20rem',
      115: '28.75rem',
      135: '33.75rem',
      140: '35rem',
    },
    minWidth: { 80: '20rem' },
    maxWidth: {
      32: '8rem',
      35: '8.75rem',
      68: '17rem',
      80: '20rem',
      89: '22.25rem',
      90: '22.5rem',
      120: '30rem',
      147: '36.75rem',
      150: '37.5rem',
      158: '39.5rem',
      171: '42.75rem',
      195: '48.75rem',
    },
    extend: {
      flex: { full: '0 0 100%' },
      gridTemplateColumns: {
        icon: 'repeat(auto-fill, minmax(9rem, 1fr))',
        illustration: 'repeat(auto-fill, minmax(15rem, 1fr))',
      },
    },
  },
  plugins: [],
};
