const path = require('path')
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin')

module.exports = {
  webpack: (config, { dev }) => {
    const oldEntry = config.entry

    config.entry = () =>
      oldEntry().then(entry => {
        entry['main.js'].push(path.resolve('./utils/offline'))
        // entry = Object.assign(entry, {'main.js': path.resolve('./utils/offline')})
        // entry = Object.assign(entry, {'sw.js': path.resolve('./utils/sw')})
        return entry
      })

    /* Enable only in Production */
    if (!dev) {
      // Service Worker
      config.plugins.push(
        new SWPrecacheWebpackPlugin({
          filename: 'sw.js',
          minify: false,
          staticFileGlobsIgnorePatterns: [/\.next\//],
          importScripts: ['/static/js/push-notifications.js'],
          staticFileGlobs: [
            'static/**/*' // Precache all static files by default
          ],
          forceDelete: true,
          runtimeCaching: [
            // Example with different handlers
            {
              handler: 'fastest',
              urlPattern: /[.](png|jpg|css)/
            },
            {
              handler: 'networkFirst',
              urlPattern: /^http.*/ // cache all files
            }
          ]
        })
      )
    }
    return config
  }
}
