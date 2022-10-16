// Import React
import React from 'react'
import { useRouter } from 'next/router'
import { UserProvider } from '@auth0/nextjs-auth0'

// Antd-specific imports
require('../styles/variables.less')

// Global style imports
require('../styles/main.less')

function App({ Component, pageProps }) {
	const router = useRouter()
	if (typeof window !== 'undefined') {
		document.body.style = 'background: #ededed'
	}

	return (
		<UserProvider>
			<Component key={router.asPath} {...pageProps} />
		</UserProvider>
	)
}

export default App