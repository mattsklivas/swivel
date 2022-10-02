// Import React
import React, { useState } from 'react'
import Link from 'next/link'
import {useUser } from '@auth0/nextjs-auth0'
import auth0 from './auth0'
// import fetcher from '../helpers/fetcher'

const apiO = 'http://localhost:3001' 

export default function Home({at}) {
    const {user, error, isLoading} = useUser()
    const token = at

    const [state, setState] = useState({
        showResult: false,
        endpointMessage: '',
        error: null
    })

    const privateEnd = async() => {
        try{
            const response= await fetch(`${apiO}/api/sample/private`,{
                method: 'GET',
                headers:{
                    Authorization: `Bearer ${token}`
                }
            })
            const data = await response.json()
            setState({
                ...state,
                showResult:true,
                endpointMessage:data,

            })
        }catch(er){
            setState({
                ...state,
                error:er.error
            })
        }
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
    const accessT = await auth0.getSession(context.req, context.res)
    let at = null
    if(accessT!=null)  {
        at = accessT.accessToken
    }

    // Pass data to the page via props
    return { props: {at} }
  }

