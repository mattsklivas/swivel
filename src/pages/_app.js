// React-specific imports 
import { useEffect } from 'react'

// Next.js-specific imports
import Head from 'next/head'
import Script from 'next/script'

// Antd-specific imports
import 'antd/dist/antd.css'

function App({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default App