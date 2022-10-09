// Import React
import React from 'react'
import { useUser } from '@auth0/nextjs-auth0'
import { useRouter } from 'next/router'
import auth0 from '../auth0'
import LoadingComponent from '../../components/LoadingComponent'
import HeaderComponent from '../../components/HeaderComponent'
import '../../hooks/useUser'

export default function Home({accessToken}) {
    const router = useRouter()
    const { profileID } = router.query
    
    // const [userDetails, userDetailsLoading] = useUser(profileID)
    const userDetails = {
        email: 'testing@gmail.com',
        username: 'username',
        fname: 'fname',
        lname: 'lname',
        location: 'location',
        description: 'description',
        avatar: null,
        saved_listings: [1, 2, 3]
    }

    const {user, error, isLoading} = useUser()
    const token = accessToken

    if (user && !isLoading) {
        return (
            <>
                <HeaderComponent />
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

