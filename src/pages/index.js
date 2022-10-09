// Import React
import React from 'react'
import { useUser } from '@auth0/nextjs-auth0'
import { useRouter } from 'next/router'
import auth0 from './auth0'
import LoadingComponent from '../components/LoadingComponent'
import HeaderComponent from '../components/HeaderComponent'

export default function Home({accessToken}) {
    const router = useRouter()
    const {user, error, isLoading} = useUser()
    const token = accessToken

    if (user && !isLoading) {
        return (
            <>
                <HeaderComponent user={user}/>
                <LoadingComponent
                    message="Loading..."
                />
            </>
        )
    } else if (isLoading) {
        return (
            <LoadingComponent
                message="Loading..."
            />
        )
    } else {
        router.push('/api/auth/login')
    }
}

export const getServerSideProps = async (context) => {
    // Fetch data from external API
    let accessToken = await auth0.getSession(context.req, context.res) || null
    if (accessToken != null)  {
        accessToken = accessToken.idToken
    }

    // Pass data to the page via props
    return { props: {accessToken} }
}

