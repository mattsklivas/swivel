const withAntdLess = require('next-plugin-antd-less')

module.exports = {
  env: {
    API_URL: process.env.API_URL || 'http://localhost:3000/'
  },
  eslint: {
    dirs: ['src/pages', 'src/components', 'src/hooks', 'src/helpers'
    ],
  },
  serverRuntimeConfig: {
    secretKey: 'swivel12345'
  },
}

// Modify Antd default styling
module.exports = withAntdLess({
    // Less variables path
    lessVarsFilePath: './src/styles/variables.less',
})