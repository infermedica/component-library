module.exports = {
  theme: {
    screens: {
      tablet: '768px',
      desktop: '992px',
    },
    minHeight: {
      135: '33.75rem',
    },
    maxWidth: {
      32: '8rem',
      35: '8.75rem',
      68: '17rem',
      80: '20rem',
      147: '36.75rem',
      195: '48.75rem',
    },
    extend: {
      flex: {
        full: '0 0 100%',
      },
      gridTemplateColumns: {
        icon: 'repeat(auto-fill, minmax(8rem, 1fr))',
      },
    },
  },
};
