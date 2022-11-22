const withAntdLess = require('next-plugin-antd-less')

module.exports = {
  env: {
    API_URL: 'https://swivel-ybll7eabcq-nn.a.run.app/'
  },
  eslint: {
    dirs: ['src/pages', 'src/components', 'src/hooks', 'src/helpers'
    ],
  },
}

// Modify Antd default styling
module.exports = withAntdLess({
    // Less variables path
    lessVarsFilePath: './src/styles/variables.less',
})