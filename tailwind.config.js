module.exports = {
  content: [
    './views/**/*.twig', // Twig templates
    './src/**/*.js',     // JavaScript files
    './src/**/*.scss',   // SCSS files
  ],
  safelist: [
    'min-h-screen'
  ],
  theme: {
    extend: {},
  },
  plugins: []
};