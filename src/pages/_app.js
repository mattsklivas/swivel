// Import React
import React from 'react'
import Layout from '../components/Layout'

// Antd-specific imports
require('../styles/variables.less')

function App({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}

export default App