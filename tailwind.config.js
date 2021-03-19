module.exports = {
  theme: {
    screens: {
      tablet: '768px',
      desktop: '992px',
    },
    maxWidth: {
      32: '8rem',
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
