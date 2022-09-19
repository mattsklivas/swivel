// Import react, react hooks & next page router
import { React, useState, useEffect } from 'react'
import { useRouter } from 'next/router'

// 
import { useSession } from 'next-auth/react'

// Antd-specific imports
require('../styles/variables.less')

// Paths accessible by the public
const pathsPublic = ['/login', '/register']

function App({ Component, pageProps }) {
    const { data: session, status } = useSession()

    const router = useRouter()
    const [isAuthorized, setIsAuthorized] = useState(false)

    // Function used to verify a user's credentials
    const userAuth = async (url) => {
        // Redirect to login page if user authorization is unsuccessful
        if (status === 'unauthenticated') {
            setIsAuthorized(false)
            router.push({
                pathname: '/account/login',
                query: { returnUrl: router.asPath }
            })
        } else if (status === 'loading') {
            setIsAuthorized(false)
        } else {
            // Show page content if authorization is successful
            setIsAuthorized(true)
        }
    }

    useEffect(() => {
        // When loading initially, perform a user authorization check
        userAuth(router.asPath)

        // Upon changing routes, hide the page content prior to user authorization
        const hide = () => setIsAuthorized(false)
        router.events.on('routeChangeStart', hide)

        // Upon completing a route change, attempt to authorize the user
        router.events.on('routeChangeComplete', userAuth)

        // Unsubscribe from events
        return () => {
            router.events.off('routeChangeStart', hide)
            router.events.off('routeChangeComplete', userAuth)
        }
    }, [])

    return (
        <div>
            { isAuthorized &&
                <Component {...pageProps} />
            }
        </div>
    )
}

export default App