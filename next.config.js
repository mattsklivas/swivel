const path = require('path')

module.exports = {
  env: {
    API_URL: process.env.API_URL || 'http://localhost:3000/'
  },
  eslint: {
    dirs: ['src/pages', 'src/components', 'src/hooks'
    ],
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')]
  }
}