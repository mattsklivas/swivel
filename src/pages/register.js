// Import React
import { React, useEffect } from 'react'
import { useUser } from '@auth0/nextjs-auth0'
import { useRouter } from 'next/router'
import auth0 from './auth0'
import LoadingComponent from '../components/LoadingComponent'
import fetcher from '../helpers/fetcher'

function Register({accessToken}) {
    const router = useRouter()
    const {user, error, isLoading} = useUser()
    const token = accessToken

    useEffect(() => {
        if (user) {
            // Function to handle registration
            const handleRegister = async () => {
                await fetcher('api/user/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        username: user.nickname,
                        email: user.name,
                    }),
                })
                .then( () => {
                    router.push('/')
                })
                .catch(() => { })
            }
        }
    })

    return (
        <LoadingComponent message="Registering User..." />
    )
}

export default Register

export const getServerSideProps = async (context) => {
    // Fetch data from external API
    let accessToken = await auth0.getSession(context.req, context.res) || null
    if (accessToken != null)  {
        accessToken = accessToken.idToken
    }

    // Pass data to the page via props
    return { props: {accessToken} }
}