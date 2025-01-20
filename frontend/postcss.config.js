module.exports = {
  plugins: {
    // Enable Tailwind CSS processing
    tailwindcss: {},
    // Add vendor prefixes automatically
    autoprefixer: {},
    // Minify CSS in production
    ...(process.env.NODE_ENV === 'production'
      ? {
          'cssnano': {
            preset: ['default', { discardComments: { removeAll: true } }],
          },
        }
      : {}),
  },
};