// Import React
import { React, useEffect } from 'react'
import { useRouter } from 'next/router'
import auth0 from '../../auth/auth0'
import LoadingComponent from '../components/LoadingComponent'
import fetcher from '../helpers/fetcher'

function Register({accessToken}) {
    const router = useRouter()
    const token = accessToken
    const value = JSON.stringify(router)
    const one = value.split('{')
    const two = one[2].split(',') 
    const emailName = two[0].split('/')
    const name = emailName[1].substring(5).replace('"','')
    const useremail = emailName[0].split(':')[1].replace('"','')
    const statevalue = two[1].split(':')[1].replace('"','').substring(0,)
    const state = statevalue.replace('"}','')

    // Redirected to this url after registration process
    const redirect = `https://dev-gl5357kx.us.auth0.com/continue?state=${state}`

    useEffect(() => {
        // Register user in the 
        fetcher(token, 'api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: name,
                email: useremail,
            }),
        })
        .then(() => {
            router.push(redirect)
        })
    })

    return (
        <LoadingComponent message="Registering User..." />
    )
}

export default Register

export const getServerSideProps = async (context) => {
    // Fetch data from external API
    let accessToken = await auth0.getSession(context.req, context.res) || null
    if (accessToken != null) {
        accessToken = accessToken.idToken
    }

    // Pass data to the page via props
    return { props: {accessToken} }
}