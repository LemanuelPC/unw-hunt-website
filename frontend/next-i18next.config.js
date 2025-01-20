// This configuration file handles the i18next library settings
module.exports = {
  // Define supported languages and defaults
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'pt', 'es'],
    // Explicitly set to false as required by Next.js 15
    localeDetection: false
  }
};