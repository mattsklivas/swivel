// Import React
import React from 'react'

// Antd-specific imports
require('../styles/variables.less')

function App({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default App