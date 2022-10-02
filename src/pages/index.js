// Import React
import React, { useState } from 'react'
import Link from 'next/link'
import {useUser } from '@auth0/nextjs-auth0'
import auth0 from './auth0'
import fetcher from '../helpers/fetcher'

export default function Home({accessToken}) {
    const {user, error, isLoading} = useUser()
    const token = accessToken

    const [state, setState] = useState({
        showResult: false,
        endpointMessage: '',
        error: null
    })

    const privateEnd = async () => {
        await fetcher(token, 'api/sample/private', {
            method: 'GET',
        })
        .then( (res) => {
            const data = res.json()
            setState({
                ...state,
                showResult: true,
                endpointMessage: data,
            })
        })
        .catch((err) => {
            setState({
                ...state,
                error: err.error
            })
        })
    }

    if(isLoading) {
        return (
            <div>
                is loading...
            </div>
        )
    }

    if(error){
        return (
            <div>
                error.message
            </div>
        )
    }

    if(user) {
        return(
            <div>
                <h1>
                    {user.name} has logged in 
                </h1> 

                <Link href="/api/auth/logout">
                    <div>
                        Logout
                    </div>
                </Link>
            
                <h2>
                    profile page(page visiable only if logged in)
                </h2>

                <Link href="/locked/profile">
                    <div> 
                        {user.name}
                    </div>
                </Link>

                <h2>
                    access external api press button below (api accessable only if user logged in)
                </h2>
                <Link href="/api/membersAPI">
                    <div>
                        button
                    </div>
                </Link>

                <h2> </h2>

                <button type="button" onClick={privateEnd}>
                    private
                </button>

                <h2> </h2>

                <h2>
                    {state.endpointMessage.message}
                </h2>
            </div>
            
        )  
        }

    return (
            <div>
                <Link href="/api/auth/login">
                    <div>
                        Login
                    </div>
                </Link>

                <h2>
                    profile page(page visiable only if logged in)
                </h2>
                <Link href="/locked/profile">
                    <div> 
                        profile 
                    </div>
                </Link> 

                <h2>
                    access external api press button below (api accessable only if user logged in)
                </h2>

                <Link href="/api/membersAPI">
                    <div>
                        button 
                    </div>
                </Link> 

                <h2> </h2>

                <button type="button" onClick={privateEnd}>
                    private
                </button>

                <h2> </h2>

                <h2>
                    {state.endpointMessage.message}
                </h2>
            </div>
    )
}

export async function getServerSideProps(context) {
    // Fetch data from external API
    let accessToken = auth0.getSession(context.req, context.res) || null
    if (accessToken != null)  {
        accessToken = accessToken.accessToken
    }

    // Pass data to the page via props
    return { props: {accessToken} }
}

