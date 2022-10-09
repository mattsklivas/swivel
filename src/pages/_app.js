// Import React
import React from 'react'
import { UserProvider } from '@auth0/nextjs-auth0'

// Antd-specific imports
require('../styles/variables.less')

// Global style imports
require('../styles/main.less')

function App({ Component, pageProps }) {
  if (typeof window !== 'undefined') {
    document.body.style = 'background: #ededed'
  }

  return (
    <UserProvider>
        <Component {...pageProps} />
    </UserProvider>
  )
}

export default App