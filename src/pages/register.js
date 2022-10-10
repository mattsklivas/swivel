// Import React
import { React } from 'react'
import { useUser } from '@auth0/nextjs-auth0'
import { useRouter } from 'next/router'
import Link from 'next/link'
import auth0 from '../../auth/auth0'
// import LoadingComponent from '../components/LoadingComponent'

function Register({accessToken}) {
    const router = useRouter()
    const {user, error, isLoading} = useUser()
    const token = accessToken
    const value = JSON.stringify(router)
    const one = value.split('{')
    const two = one[2].split(',') 
    const emailName = two[0].split('/')
    const name = emailName[1].substring(5).replace('"','')
    const useremail = emailName[0].split(':')[1].replace('"','')
    const statevalue = two[1].split(':')[1].replace('"','').substring(0,)
    const state = statevalue.replace('"}','')

    //  redirected to this url after registration process
    const url = `https://dev-gl5357kx.us.auth0.com/continue?state=${state}`
    // Function to handle registration
    const handleRegister = async () => {
        await fetch('api/user/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: name,
                email: useremail,
            }),
        })
        .then( (res) => {
        })
        .catch((err) => {
        })
    }
    return (
     // <LoadingComponent message="Registering User..." />
     <Link href={url}>
        <div>
                <button type="button" onClick={handleRegister} >
                    User registered click here to proceed
                </button> 
        </div>
    </Link>
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